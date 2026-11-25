"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { CollectionService } from "@/services/collection.service";
import { ProductService } from "@/services/product.service";
import type { ActionResult } from "@/types/api";
import type { BulkProductChange } from "@/types/product";

type DataResult<T> = ActionResult & { data?: T };

async function runProductAction<T>(request: () => Promise<ApiResponse<T>>): Promise<DataResult<T>> {
  try {
    const { message, data } = await request();
    refresh();
    return { success: true, message, data };
  } catch (error) {
    return {
      success: false,
      message: error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
    };
  }
}

export async function updateProductsAction(productIds: string[], change: BulkProductChange) {
  return runProductAction(() => ProductService.bulkUpdate(productIds, change));
}

export async function trashProductsAction(productIds: string[]) {
  return runProductAction(() => ProductService.bulkTrash(productIds));
}

export async function restoreProductAction(productId: string) {
  return runProductAction(() => ProductService.restore(productId));
}

export async function duplicateProductAction(productId: string) {
  return runProductAction(() => ProductService.duplicate(productId));
}

export async function syncProductCollectionsAction(productId: string, added: string[], removed: string[]): Promise<ActionResult> {
  try {
    await Promise.all(
      [...added, ...removed].map(async (collectionId) => {
        const { data } = await CollectionService.getCollection(collectionId);
        const ids = (data?.products ?? []).map((product) => product.id).filter((id) => id !== productId);
        await CollectionService.setProducts(collectionId, added.includes(collectionId) ? [...ids, productId] : ids);
      })
    );
    refresh();
    return { success: true, message: "Collections updated" };
  } catch (error) {
    return { success: false, message: error instanceof ApiError ? error.message : "Couldn’t update collections." };
  }
}
