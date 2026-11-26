"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { duplicateProductAction, restoreProductAction, trashProductsAction, updateProductsAction } from "@/actions/product.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { SelectMenu } from "@/components/shared/select-menu";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { buttonVariants } from "@/components/ui/button";
import {
  PRODUCT_FORM_PATH,
  PRODUCT_PAGE_SIZES,
  PRODUCT_SORTS,
  PRODUCT_STOCK_FILTERS,
  PRODUCT_TABS,
  productEditPath,
} from "@/config/products";
import { SEARCH_DEBOUNCE_MS } from "@/config/search";
import { formStyles } from "@/lib/form-styles";
import { productsQueryParams } from "@/lib/product-query";
import { cn } from "@/lib/utils";
import type { ActionResult, PaginationMeta } from "@/types/api";
import type { AdminProduct, BulkProductChange, ProductsQuery, ProductSummary } from "@/types/product";
import { ProductBulkBar } from "./product-bulk-bar";
import type { ProductMenuAction } from "./product-row-menu";
import { ProductsGrid } from "./products-grid";
import { ProductsTable } from "./products-table";


type ProductsManagerProps = {
  products: AdminProduct[];
  meta?: PaginationMeta;
  summary: ProductSummary;
  query: ProductsQuery;
  canTrash: boolean;
};

type TrashTarget = { ids: string[]; title: string } | null;

export function ProductsManager({ products, meta, summary, query, canTrash }: ProductsManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startNavigating] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const [search, setSearch] = useState(query.search ?? "");
  const [filtersOpen, setFiltersOpen] = useState(!!(query.stock || query.maxPrice || query.tag || query.featured));
  const [maxPrice, setMaxPrice] = useState(query.maxPrice ? String(query.maxPrice) : "");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [trashTarget, setTrashTarget] = useState<TrashTarget>(null);

  const navigate = (next: Partial<ProductsQuery>, resetPage = true) => {
    const params = new URLSearchParams(productsQueryParams({ ...query, ...(resetPage && { page: 1 }), ...next }));
    const target = params.toString() ? `${pathname}?${params}` : pathname;
    startNavigating(() => router.push(target, { scroll: false }));
    if (resetPage) setSelected(new Set());
  };

  useEffect(() => {
    const term = search.trim() || undefined;
    if (term === query.search) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(productsQueryParams({ ...query, page: 1, search: term }));
      router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search, query, pathname, router]);

  useEffect(() => {
    const value = Number(maxPrice) || undefined;
    if (value === query.maxPrice) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(productsQueryParams({ ...query, page: 1, maxPrice: value }));
      router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    }, SEARCH_DEBOUNCE_MS * 2);
    return () => clearTimeout(timer);
  }, [maxPrice, query, pathname, router]);

  const run = (request: () => Promise<ActionResult>, success: (message: string) => void, onDone?: () => void) =>
    startSaving(async () => {
      const result = await request();
      if (result.success) {
        success(result.message);
        onDone?.();
      } else {
        toast.error("Something went wrong", { description: result.message });
      }
    });

  const selectedIds = [...selected];

  const bulkUpdate = (change: BulkProductChange, title: string, describe: (count: number) => string) =>
    run(
      async () => {
        const result = await updateProductsAction(selectedIds, change);
        if (result.success && result.data?.skippedWithoutImage) {
          toast.warning(`${result.data.skippedWithoutImage} skipped`, { description: "Products need a main image before they can go live." });
        }
        return result;
      },
      () => toast.success(title, { description: describe(selectedIds.length) }),
      () => setSelected(new Set())
    );

  const handleFeatured = (product: AdminProduct, featured: boolean) =>
    run(
      () => updateProductsAction([product.id], { isFeatured: featured }),
      () => toast.success(featured ? "Marked as featured" : "Removed from featured", { description: product.name })
    );

  const handleAction = (action: ProductMenuAction, product: AdminProduct) => {
    if (action === "edit") return router.push(productEditPath(product.id));
    if (action === "trash") return setTrashTarget({ ids: [product.id], title: `Move “${product.name}” to trash?` });
    if (action === "duplicate") {
      return run(
        () => duplicateProductAction(product.id),
        () => toast.success("Duplicated", { description: `${product.name} (copy) saved as draft` })
      );
    }
    if (action === "restore") {
      return run(() => restoreProductAction(product.id), () => toast.success("Restored", { description: product.name }));
    }
    const status = product.status === "ARCHIVED" ? "ACTIVE" : "ARCHIVED";
    return run(
      () => updateProductsAction([product.id], { status }),
      () => toast.success(status === "ARCHIVED" ? "Archived" : "Restored", { description: product.name })
    );
  };

  const confirmTrash = () => {
    if (!trashTarget) return;
    const { ids } = trashTarget;
    run(
      () => trashProductsAction(ids),
      () => toast.success("Moved to trash", { description: `${ids.length} ${ids.length > 1 ? "products" : "product"}` }),
      () => {
        setTrashTarget(null);
        setSelected(new Set());
      }
    );
  };

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((current) => (products.every((product) => current.has(product.id)) ? new Set() : new Set(products.map((product) => product.id))));

  const inTrash = query.tab === "trash";
  const tabs = PRODUCT_TABS.filter((tab) => summary.counts[tab.countKey] !== undefined);

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput label="Search product or SKU" wrapperClassName="flex-[0_1_280px]" value={search} onChange={(event) => setSearch(event.target.value)} />
        <SelectMenu
          ariaLabel="Category"
          size="sm"
          value={query.category ?? ""}
          onChange={(category) => navigate({ category: category || undefined })}
          options={[{ value: "", label: "All categories" }, ...summary.categories.map((category) => ({ value: category.slug, label: category.name }))]}
        />
        <SelectMenu
          ariaLabel="Brand"
          size="sm"
          value={query.brand ?? ""}
          onChange={(brand) => navigate({ brand: brand || undefined })}
          options={[{ value: "", label: "All brands" }, ...summary.brands.map((brand) => ({ value: brand.slug, label: brand.name }))]}
        />
        <button
          type="button"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((open) => !open)}
          className={buttonVariants({ variant: filtersOpen ? "tint" : "soft" })}
        >
          <Icon name="filter" size={17} strokeWidth={1.8} />
          Filters
        </button>
        <span className="flex-1" />
        <span className="text-[12.5px] text-ink-3 max-[900px]:hidden">Sort by:</span>
        <SelectMenu<ProductsQuery["sort"]>
          ariaLabel="Sort by"
          size="sm"
          value={query.sort}
          onChange={(sort) => navigate({ sort })}
          options={PRODUCT_SORTS.map((sort) => ({ value: sort.value, label: sort.label }))}
        />
        <div role="group" aria-label="View" className="inline-flex gap-1 rounded-xl bg-surface-2 p-1">
          {(["table", "grid"] as const).map((view) => (
            <button
              key={view}
              type="button"
              aria-label={view === "table" ? "Table view" : "Grid view"}
              aria-pressed={query.view === view}
              onClick={() => navigate({ view }, false)}
              className={cn(
                "flex h-8 items-center rounded-[9px] px-3.5 text-ink-2 hover:text-ink",
                query.view === view && "bg-surface text-ink shadow-seg"
              )}
            >
              <Icon name={view === "table" ? "list" : "grid"} size={16} strokeWidth={1.8} />
            </button>
          ))}
        </div>
        <Link href={PRODUCT_FORM_PATH} className={buttonVariants()}>
          <Icon name="plus" size={17} strokeWidth={1.8} />
          Add product
        </Link>
      </div>

      {filtersOpen && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5 rounded-[14px] bg-surface-2 p-4">
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="fs">
              Stock
            </label>
            <SelectMenu<NonNullable<ProductsQuery["stock"]> | "">
              id="fs"
              triggerClassName="bg-surface"
              value={query.stock ?? ""}
              onChange={(stock) => navigate({ stock: stock || undefined })}
              options={[{ value: "", label: "Any" }, ...PRODUCT_STOCK_FILTERS.map((stock) => ({ value: stock.value, label: stock.label }))]}
            />
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="fp">
              Max price
            </label>
            <div className={cn(formStyles.inputGroup, "bg-surface")}>
              <span className={formStyles.groupAddon}>৳</span>
              <input
                id="fp"
                inputMode="numeric"
                placeholder="e.g. 1000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value.replace(/\D/g, ""))}
                className={formStyles.groupInput}
              />
            </div>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="ft">
              Tag
            </label>
            <SelectMenu
              id="ft"
              triggerClassName="bg-surface"
              value={query.tag ?? ""}
              onChange={(tag) => navigate({ tag: tag || undefined })}
              options={[{ value: "", label: "Any tag" }, ...summary.tags.map((tag) => ({ value: tag.slug, label: tag.name }))]}
            />
          </div>
          <div className={cn(formStyles.field, "justify-end")}>
            <ToggleSwitch
              className="h-10.5"
              checked={!!query.featured}
              onChange={(featured) => navigate({ featured: featured || undefined })}
              label={<span className="order-last">Featured only</span>}
            />
          </div>
        </div>
      )}

      <div role="tablist" aria-label="Products" className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {tabs.map((tab) => {
          const on = query.tab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => navigate({ tab: tab.value })}
              className={cn(
                "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap",
                on ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "inline-flex h-5 min-w-5.5 items-center justify-center rounded-md px-1.5 text-[11.5px]",
                  on ? "bg-brand text-white" : "bg-surface-3 text-ink-2"
                )}
              >
                {summary.counts[tab.countKey]}
              </span>
            </button>
          );
        })}
      </div>

      {selected.size > 0 && (
        <ProductBulkBar
          count={selected.size}
          disabled={isSaving}
          showActions={!inTrash}
          canTrash={canTrash}
          categories={summary.categories}
          onClear={() => setSelected(new Set())}
          onActivate={() => bulkUpdate({ status: "ACTIVE" }, "Activated", (n) => `${n} products are live`)}
          onArchive={() => bulkUpdate({ status: "ARCHIVED" }, "Archived", (n) => `${n} products hidden`)}
          onFeature={() => bulkUpdate({ isFeatured: true }, "Featured", (n) => `${n} products`)}
          onCategory={(category) => bulkUpdate({ categoryId: category.id }, "Category changed", (n) => `${n} → ${category.name}`)}
          onTrash={() => setTrashTarget({ ids: selectedIds, title: `Move ${selectedIds.length} products to trash?` })}
        />
      )}

      <div className={cn("transition-opacity", isNavigating && "opacity-60")}>
        {products.length === 0 ? (
          <EmptyState
            title={inTrash ? "Trash is empty" : "No products found"}
            description={inTrash ? "Deleted products stay here for 30 days." : "Try another tab or filter, or add a product."}
            action={
              <Link href={PRODUCT_FORM_PATH} className={buttonVariants({ size: "sm" })}>
                Add product
              </Link>
            }
          />
        ) : query.view === "grid" ? (
          <ProductsGrid products={products} selected={selected} onToggle={toggle} />
        ) : (
          <ProductsTable
            products={products}
            selected={selected}
            canTrash={canTrash}
            isPending={isSaving}
            onToggle={toggle}
            onToggleAll={toggleAll}
            onFeatured={handleFeatured}
            onAction={handleAction}
          />
        )}
      </div>

      {meta && meta.total > 0 && (
        <DataPagination
          meta={meta}
          pathname={pathname}
          query={productsQueryParams(query)}
          pageSizeControl={
            <SelectMenu
              ariaLabel="Rows per page"
              size="sm"
              className="w-19"
              value={String(query.limit)}
              onChange={(limit) => navigate({ limit: Number(limit) })}
              options={PRODUCT_PAGE_SIZES.map((size) => ({ value: String(size), label: String(size) }))}
            />
          }
        />
      )}

      <DangerDialog
        open={!!trashTarget}
        title={trashTarget?.title ?? ""}
        description="Trashed products leave the store immediately. Restore them from the Trash tab within 30 days."
        confirmLabel="Move to trash"
        pendingLabel="Moving…"
        isPending={isSaving}
        onOpenChange={(open) => !open && setTrashTarget(null)}
        onConfirm={confirmTrash}
      />
    </section>
  );
}
