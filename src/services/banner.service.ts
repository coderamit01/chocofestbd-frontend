import { BANNER_LIST_LIMIT } from "@/config/banners";
import { serverApiRequest } from "@/lib/server-api";
import type { Banner, BannerCategory } from "@/types/banner";

const fetchBannerPage = (page: number) =>
  serverApiRequest<Banner[]>(`/banners/admin?${new URLSearchParams({ page: String(page), limit: String(BANNER_LIST_LIMIT) })}`);

export const BannerService = {
  getBanners: async () => {
    const first = await fetchBannerPage(1);
    const totalPages = first.meta?.totalPages ?? 1;
    const rest = await Promise.all(Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => fetchBannerPage(index + 2)));
    return [first, ...rest].flatMap((response) => response.data ?? []);
  },

  getCategories: () => serverApiRequest<BannerCategory[]>("/banners/categories"),

  setActive: (bannerId: string, isActive: boolean) =>
    serverApiRequest<Banner>(`/banners/${encodeURIComponent(bannerId)}`, { method: "PUT", body: JSON.stringify({ isActive: String(isActive) }) }),

  reorder: (bannerIds: string[]) => serverApiRequest("/banners/reorder", { method: "PATCH", body: JSON.stringify({ bannerIds }) }),

  deleteBanner: (bannerId: string) => serverApiRequest(`/banners/${encodeURIComponent(bannerId)}`, { method: "DELETE" }),

  createCategory: (name: string) => serverApiRequest<BannerCategory>("/banners/categories", { method: "POST", body: JSON.stringify({ name }) }),

  deleteCategory: (categoryId: string) => serverApiRequest(`/banners/categories/${encodeURIComponent(categoryId)}`, { method: "DELETE" }),
};
