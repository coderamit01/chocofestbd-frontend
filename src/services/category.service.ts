import { CATALOG_LIST_LIMIT } from "@/config/catalog";
import { serverApiRequest } from "@/lib/server-api";
import type { Category } from "@/types/category";

const update = (categoryId: string, body: Record<string, string>) =>
  serverApiRequest<Category>(`/categories/${categoryId}`, { method: "PUT", body: JSON.stringify(body) });

export const CategoryService = {
  getAllCategories: async () => {
    const first = await serverApiRequest<Category[]>(`/categories/admin?page=1&limit=${CATALOG_LIST_LIMIT}`);
    const totalPages = first.meta?.totalPages ?? 1;
    const rest = await Promise.all(
      Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) =>
        serverApiRequest<Category[]>(`/categories/admin?page=${index + 2}&limit=${CATALOG_LIST_LIMIT}`)
      )
    );
    return [first, ...rest].flatMap((response) => response.data ?? []);
  },

  setActive: (categoryId: string, isActive: boolean) => update(categoryId, { isActive: String(isActive) }),

  setSortOrder: (categoryId: string, sortOrder: number) => update(categoryId, { sortOrder: String(sortOrder) }),

  moveToTrash: (categoryId: string) => serverApiRequest(`/categories/${categoryId}/trash`, { method: "PATCH" }),
};
