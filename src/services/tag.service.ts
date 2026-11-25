import { CATALOG_LIST_LIMIT } from "@/config/catalog";
import { serverApiRequest } from "@/lib/server-api";
import type { Tag } from "@/types/tag";

export const TagService = {
  getTags: ({ page, search }: { page: number; search?: string }) => {
    const params = new URLSearchParams({ page: String(page), limit: String(CATALOG_LIST_LIMIT) });
    if (search) params.set("searchTerm", search);
    return serverApiRequest<Tag[]>(`/tags?${params}`);
  },

  createTag: (name: string) => serverApiRequest<Tag>("/tags", { method: "POST", body: JSON.stringify({ name }) }),

  updateTag: (tagId: string, name: string) =>
    serverApiRequest<Tag>(`/tags/${tagId}`, { method: "PUT", body: JSON.stringify({ name }) }),

  deleteTag: (tagId: string) => serverApiRequest(`/tags/${tagId}`, { method: "DELETE" }),
};
