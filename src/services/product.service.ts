import { serverApiRequest } from "@/lib/server-api";
import type { AdminProduct, BulkProductChange, ProductDetail, ProductsQuery, ProductSummary } from "@/types/product";

const TAB_FILTERS: Record<Exclude<ProductsQuery["tab"], "trash">, Record<string, string>> = {
  all: {},
  active: { status: "ACTIVE" },
  draft: { status: "DRAFT" },
  archived: { status: "ARCHIVED" },
  low: { stock: "low" },
  out: { stock: "out" },
};

export const ProductService = {
  getProducts: (query: ProductsQuery) => {
    const params = new URLSearchParams({ page: String(query.page), limit: String(query.limit) });
    if (query.search) params.set("searchTerm", query.search);

    if (query.tab === "trash") return serverApiRequest<AdminProduct[]>(`/products/trash?${params}`);

    Object.entries(TAB_FILTERS[query.tab]).forEach(([key, value]) => params.set(key, value));
    params.set("sortBy", query.sort);
    if (query.category) params.set("category", query.category);
    if (query.brand) params.set("brand", query.brand);
    if (query.tag) params.set("tag", query.tag);
    if (query.stock && !params.has("stock")) params.set("stock", query.stock);
    if (query.maxPrice) params.set("maxPrice", String(query.maxPrice));
    if (query.featured) params.set("isFeatured", "true");

    return serverApiRequest<AdminProduct[]>(`/products/admin?${params}`);
  },

  getProduct: (productId: string) => serverApiRequest<ProductDetail>(`/products/admin/${productId}`),

  getSummary: () => serverApiRequest<ProductSummary>("/products/admin/summary"),

  bulkUpdate: (productIds: string[], change: BulkProductChange) =>
    serverApiRequest<{ updated: number; skippedWithoutImage: number }>("/products/bulk", {
      method: "PATCH",
      body: JSON.stringify({ productIds, ...change }),
    }),

  bulkTrash: (productIds: string[]) =>
    serverApiRequest<{ trashed: number }>("/products/bulk/trash", { method: "PATCH", body: JSON.stringify({ productIds }) }),

  restore: (productId: string) => serverApiRequest(`/products/${productId}/restore`, { method: "PATCH" }),

  duplicate: (productId: string) =>
    serverApiRequest<{ id: string; name: string }>(`/products/${productId}/duplicate`, { method: "POST" }),
};
