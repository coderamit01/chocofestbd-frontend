import { CATALOG_LIST_LIMIT } from "@/config/catalog";
import { serverApiRequest } from "@/lib/server-api";
import type { Brand } from "@/types/brand";

export const BrandService = {
  getBrands: ({ page, search }: { page: number; search?: string }) => {
    const params = new URLSearchParams({ page: String(page), limit: String(CATALOG_LIST_LIMIT) });
    if (search) params.set("searchTerm", search);
    return serverApiRequest<Brand[]>(`/brands/admin?${params}`);
  },

  setActive: (brandId: string, isActive: boolean) =>
    serverApiRequest<Brand>(`/brands/${brandId}`, { method: "PUT", body: JSON.stringify({ isActive: String(isActive) }) }),

  moveToTrash: (brandId: string) => serverApiRequest(`/brands/${brandId}/trash`, { method: "PATCH" }),
};
