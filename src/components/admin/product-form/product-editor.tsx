"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { syncProductCollectionsAction } from "@/actions/product.actions";
import { Icon } from "@/components/shared/icon";
import { UnsavedChangesBar } from "@/components/shared/unsaved-changes-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productEditPath } from "@/config/products";
import { STATUS_BADGES } from "@/config/status-badges";
import { ApiError } from "@/lib/api-client";
import { generateSlug } from "@/lib/slug";
import { ProductClient } from "@/services/product.client";
import type { Category } from "@/types/category";
import type { Collection } from "@/types/collection";
import type { ProductDetail, ProductFormFiles, ProductFormValues, ProductRef } from "@/types/product";
import type { ProductStatus } from "@/types/status";
import { ProductBasicSection } from "./product-basic-section";
import { ProductInventorySection } from "./product-inventory-section";
import { MAX_GALLERY_IMAGES, ProductMediaSection } from "./product-media-section";
import { ProductPricingSection } from "./product-pricing-section";
import { ProductSeoSection } from "./product-seo-section";
import { ProductCollectionsCard, ProductOrganisationCard, ProductStatusCard } from "./product-side-cards";

type ProductEditorProps = {
  product: ProductDetail | null;
  categories: Category[];
  brands: ProductRef[];
  tags: ProductRef[];
  collections: Collection[];
  now: number;
  canSetCost: boolean;
  savedLabel: string | null;
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  sku: "SKU",
  slug: "Slug",
  price: "Price",
  discountPrice: "Discount price",
  costPrice: "Cost price",
  categoryId: "Category",
  image: "Media",
  stock: "Stock",
  lowStockThreshold: "Low-stock threshold",
  shortDescription: "Short description",
  description: "Description",
  metaTitle: "Meta title",
  metaDescription: "Meta description",
};

const EMPTY_FILES: ProductFormFiles = { image: null, gallery: [], metaImage: null };

const toValues = (product: ProductDetail | null): ProductFormValues => ({
  name: product?.name ?? "",
  slug: product?.slug ?? "",
  sku: product?.sku ?? "",
  shortDescription: product?.shortDescription ?? "",
  description: product?.description ?? "",
  price: product ? String(Number(product.price)) : "",
  discountPrice: product?.discountPrice ? String(Number(product.discountPrice)) : "",
  costPrice: product?.costPrice ? String(Number(product.costPrice)) : "",
  manageStock: product?.manageStock ?? true,
  stock: String(product?.stock ?? 0),
  lowStockThreshold: String(product?.lowStockThreshold ?? 5),
  stockStatus: product?.stockStatus ?? "IN_STOCK",
  status: product?.status ?? "DRAFT",
  isFeatured: product?.isFeatured ?? false,
  categoryId: product?.category.id ?? "",
  brandId: product?.brand?.id ?? "",
  tagIds: product?.tags.map((tag) => tag.id) ?? [],
  collectionIds: product?.collections.map((item) => item.collectionId) ?? [],
  metaTitle: product?.metaTitle ?? "",
  metaDescription: product?.metaDescription ?? "",
  galleryOrder: product?.imageGallery.map((image) => image.id) ?? [],
  galleryAlts: {},
  removedGalleryIds: [],
});

export function ProductEditor({ product, categories, brands, tags: initialTags, collections, now, canSetCost, savedLabel }: ProductEditorProps) {
  const router = useRouter();
  const isNew = !product;
  const [baseline, setBaseline] = useState(() => toValues(product));
  const [values, setValues] = useState(baseline);
  const [files, setFiles] = useState<ProductFormFiles>(EMPTY_FILES);
  const [customSlug, setCustomSlug] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tags, setTags] = useState(initialTags);
  const [isSaving, startSaving] = useTransition();

  const dirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(baseline) || !!(files.image || files.metaImage || files.gallery.length),
    [values, baseline, files]
  );

  const set = (patch: Partial<ProductFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const gallery = values.galleryOrder
    .map((id) => product?.imageGallery.find((image) => image.id === id))
    .filter(Boolean) as ProductDetail["imageGallery"];
  const hasMainImage = !!(files.image || product?.image);
  const slug = customSlug ? values.slug : isNew ? generateSlug(values.name) : (product?.slug ?? "");

  const validate = (status: ProductStatus) => {
    const next: Record<string, string> = {};
    const price = Number(values.price);
    const sale = Number(values.discountPrice);
    if (values.name.trim().length < 2) next.name = values.name.trim() ? "Name must be at least 2 characters." : "Product name is required.";
    if (!isNew && !values.sku.trim()) next.sku = "SKU is required.";
    if (customSlug && !/^[\p{L}\p{M}\p{N}]+(?:-[\p{L}\p{M}\p{N}]+)*$/u.test(values.slug)) next.slug = "Use letters, numbers and single hyphens.";
    if (!(price > 0)) next.price = "Enter a price.";
    if (values.discountPrice && sale >= price) next.discountPrice = "Must be lower than the price.";
    if (!values.categoryId) next.categoryId = "Choose a category.";
    if (status === "ACTIVE" && !hasMainImage) next.image = "Add at least one image.";
    return next;
  };

  const save = (status: ProductStatus) => {
    const problems = validate(status);
    if (Object.keys(problems).length) {
      setErrors(problems);
      toast.error(status === "ACTIVE" ? "Can’t publish yet" : "Can’t save yet", { description: "Fix the highlighted fields." });
      return;
    }

    const next = { ...values, status };
    startSaving(async () => {
      try {
        const { data } = await ProductClient.saveProduct({ productId: product?.id ?? null, values: next, files, customSlug, canSetCost });
        const productId = data?.id ?? product?.id;
        if (!productId) throw new Error("The product was saved but no id came back.");

        const added = next.collectionIds.filter((id) => !baseline.collectionIds.includes(id));
        const removed = baseline.collectionIds.filter((id) => !next.collectionIds.includes(id));
        if (added.length || removed.length) {
          const result = await syncProductCollectionsAction(productId, added, removed);
          if (!result.success) toast.error("Product saved, but collections didn’t update", { description: result.message });
        }

        toast.success(status === "ACTIVE" ? (product?.status === "ACTIVE" ? "Updated" : "Published") : "Saved", { description: next.name.trim() });

        if (isNew) {
          router.replace(productEditPath(productId));
          return;
        }

        const saved = { ...next, galleryAlts: {}, removedGalleryIds: [] };
        setBaseline(saved);
        setValues(saved);
        setFiles(EMPTY_FILES);
        setCustomSlug(false);
        setErrors({});
        router.refresh();
      } catch (error) {
        const fieldErrors = error instanceof ApiError ? error.fieldErrors : [];
        if (fieldErrors.length) {
          setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field.split(".")[0], item.message])));
        } else if (error instanceof ApiError && error.status === 409) {
          setErrors({ [/slug/i.test(error.message) ? "slug" : "sku"]: error.message });
        } else if (error instanceof ApiError && /image/i.test(error.message)) {
          setErrors({ image: error.message });
        }
        toast.error("Couldn’t save product", { description: error instanceof Error ? error.message : "Please try again." });
      }
    });
  };

  const discard = () => {
    setValues(baseline);
    setFiles(EMPTY_FILES);
    setCustomSlug(false);
    setErrors({});
  };

  const errorKeys = Object.keys(errors).filter((key) => errors[key]);
  const status = STATUS_BADGES.product[values.status];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link href="/admin/products" className="flex items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-ink">
            <Icon name="chevronLeft" size={16} strokeWidth={1.8} />
            Back to products
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-2xl leading-[1.2] font-semibold text-ink">{values.name.trim() || "New product"}</h2>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="text-[12.5px] text-ink-3">{savedLabel ?? "Not saved yet"}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" onClick={() => save(values.status)} disabled={isSaving}>
            Save draft
          </Button>
          <Button onClick={() => save("ACTIVE")} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : product?.status === "ACTIVE" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      {errorKeys.length > 0 && (
        <div role="alert" className="flex items-center gap-2.5 rounded-[14px] bg-danger-soft px-4.5 py-3.5 text-[#8f2318]">
          <Icon name="alert" size={18} strokeWidth={1.8} className="flex-none" />
          <span>
            <b className="font-semibold">
              Fix {errorKeys.length} field{errorKeys.length > 1 ? "s" : ""} before saving:
            </b>{" "}
            {errorKeys.map((key) => FIELD_LABELS[key] ?? key).join(", ")}.
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-6">
          <ProductBasicSection
            values={values}
            set={set}
            errors={errors}
            isNew={isNew}
            customSlug={customSlug}
            savedSlug={product?.slug ?? null}
            onToggleSlug={() => {
              if (!customSlug) set({ slug });
              setCustomSlug((current) => !current);
            }}
          />
          <ProductMediaSection
            mainUrl={product?.image ?? null}
            mainFile={files.image}
            gallery={gallery}
            newFiles={files.gallery}
            alts={values.galleryAlts}
            error={errors.image}
            onAddFiles={(added) => {
              setErrors((current) => ({ ...current, image: "" }));
              setFiles((current) => {
                const queue = [...added];
                const image = current.image ?? (product?.image ? null : (queue.shift() ?? null));
                const room = MAX_GALLERY_IMAGES - gallery.length - current.gallery.length;
                if (queue.length > room) toast.warning(`Only ${MAX_GALLERY_IMAGES} gallery images are allowed`, { description: `${queue.length - room} skipped.` });
                return { ...current, image, gallery: [...current.gallery, ...queue.slice(0, Math.max(0, room))] };
              });
            }}
            onReplaceMain={(file) => setFiles((current) => ({ ...current, image: file }))}
            onMove={(id, direction) => {
              const order = [...values.galleryOrder];
              const index = order.indexOf(id);
              order.splice(index, 1);
              order.splice(index + direction, 0, id);
              set({ galleryOrder: order });
            }}
            onRemoveSaved={(id) =>
              set({ galleryOrder: values.galleryOrder.filter((item) => item !== id), removedGalleryIds: [...values.removedGalleryIds, id] })
            }
            onRemoveNew={(index) => setFiles((current) => ({ ...current, gallery: current.gallery.filter((_, i) => i !== index) }))}
            onAltChange={(id, alt) => set({ galleryAlts: { ...values.galleryAlts, [id]: alt } })}
            onRejected={(message) => toast.error("Some images weren’t added", { description: message })}
          />
          <ProductPricingSection values={values} set={set} errors={errors} canSetCost={canSetCost} />
          <ProductInventorySection values={values} set={set} errors={errors} />
          <ProductSeoSection
            values={values}
            set={set}
            errors={errors}
            slug={slug}
            metaImageUrl={product?.metaImage ?? null}
            metaImageFile={files.metaImage}
            onMetaImage={(file) => setFiles((current) => ({ ...current, metaImage: file }))}
          />
        </div>

        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          <ProductStatusCard values={values} set={set} errors={errors} />
          <ProductOrganisationCard
            values={values}
            set={set}
            errors={errors}
            categories={categories}
            brands={brands}
            tags={tags}
            onTagCreated={(tag) => setTags((current) => [...current, tag])}
          />
          <ProductCollectionsCard values={values} set={set} errors={errors} collections={collections} now={now} />
        </aside>
      </div>

      {dirty && <UnsavedChangesBar isSaving={isSaving} onDiscard={discard} onSave={() => save(values.status)} />}
    </>
  );
}
