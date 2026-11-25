"use server";

import { CollectionService } from "@/services/collection.service";
import type { CollectionPayload } from "@/types/collection";
import { runCatalogAction } from "./catalog-action";

export async function saveCollectionAction(collectionId: string | null, payload: CollectionPayload) {
  return runCatalogAction(() =>
    collectionId ? CollectionService.updateCollection(collectionId, payload) : CollectionService.createCollection(payload)
  );
}

export async function setCollectionActiveAction(collectionId: string, isActive: boolean) {
  return runCatalogAction(() => CollectionService.updateCollection(collectionId, { isActive }));
}

export async function setCollectionProductsAction(collectionId: string, productIds: string[]) {
  return runCatalogAction(() => CollectionService.setProducts(collectionId, productIds));
}

export async function deleteCollectionAction(collectionId: string) {
  return runCatalogAction(() => CollectionService.deleteCollection(collectionId));
}
