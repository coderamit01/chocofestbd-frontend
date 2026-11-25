import { apiRequest } from "@/lib/api-client";
import type { AdminProduct, ProductDetail, ProductFormFiles, ProductFormValues } from "@/types/product";

type SaveOptions = {
  productId: string | null;
  values: ProductFormValues;
  files: ProductFormFiles;
  customSlug: boolean;
  canSetCost: boolean;
};

export const ProductClient = {
  searchProducts: (searchTerm: string, limit = 8) =>
    apiRequest<AdminProduct[]>(`/products/admin?${new URLSearchParams({ searchTerm, limit: String(limit), page: "1" })}`),

  saveProduct: ({ productId, values, files, customSlug, canSetCost }: SaveOptions) => {
    const body = new FormData();
    const add = (key: string, value: string) => body.append(key, value);

    add("name", values.name.trim());
    if (customSlug && values.slug.trim()) add("slug", values.slug.trim());
    if (values.sku.trim() || productId) add("sku", values.sku.trim());
    add("shortDescription", values.shortDescription);
    add("description", values.description);
    add("price", values.price);
    add("discountPrice", values.discountPrice);
    if (canSetCost) add("costPrice", values.costPrice);
    add("manageStock", String(values.manageStock));
    if (values.manageStock) {
      add("stock", values.stock || "0");
      add("lowStockThreshold", values.lowStockThreshold || "0");
    } else {
      add("stockStatus", values.stockStatus);
    }
    add("status", values.status);
    add("isFeatured", String(values.isFeatured));
    add("categoryId", values.categoryId);
    add("brandId", values.brandId);
    if (values.tagIds.length || productId) add("tagIds", values.tagIds.join(","));
    add("metaTitle", values.metaTitle);
    add("metaDescription", values.metaDescription);

    if (files.image) body.append("image", files.image);
    if (files.metaImage) body.append("metaImage", files.metaImage);
    files.gallery.forEach((file) => body.append("gallery", file));

    if (productId) {
      if (values.removedGalleryIds.length) add("removeGalleryImageIds", values.removedGalleryIds.join(","));
      if (values.galleryOrder.length) add("galleryOrder", values.galleryOrder.join(","));
      if (Object.keys(values.galleryAlts).length) add("galleryAlts", JSON.stringify(values.galleryAlts));
    }

    return apiRequest<ProductDetail>(productId ? `/products/${productId}` : "/products", {
      method: productId ? "PUT" : "POST",
      body,
    });
  },
};
