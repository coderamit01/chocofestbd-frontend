import { CATALOG_LIST_LIMIT } from "@/config/catalog";
import { serverApiRequest } from "@/lib/server-api";
import type { Collection, CollectionDetail, CollectionPayload } from "@/types/collection";

export const CollectionService = {
  getCollections: () => serverApiRequest<Collection[]>(`/collections/admin?page=1&limit=${CATALOG_LIST_LIMIT}`),

  getCollection: (collectionId: string) => serverApiRequest<CollectionDetail>(`/collections/admin/${collectionId}`),

  createCollection: (payload: CollectionPayload) =>
    serverApiRequest<Collection>("/collections", { method: "POST", body: JSON.stringify(payload) }),

  updateCollection: (collectionId: string, payload: Partial<CollectionPayload>) =>
    serverApiRequest<Collection>(`/collections/${collectionId}`, { method: "PUT", body: JSON.stringify(payload) }),

  setProducts: (collectionId: string, productIds: string[]) =>
    serverApiRequest<CollectionDetail>(`/collections/${collectionId}/products`, {
      method: "PUT",
      body: JSON.stringify({ productIds }),
    }),

  deleteCollection: (collectionId: string) => serverApiRequest(`/collections/${collectionId}`, { method: "DELETE" }),
};
