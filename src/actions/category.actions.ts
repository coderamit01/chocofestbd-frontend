"use server";

import { refresh } from "next/cache";
import { ApiError } from "@/lib/api-client";
import { CategoryService } from "@/services/category.service";
import type { ActionResult } from "@/types/api";
import { runCatalogAction } from "./catalog-action";

export async function setCategoryActiveAction(categoryId: string, isActive: boolean) {
  return runCatalogAction(() => CategoryService.setActive(categoryId, isActive));
}

export async function trashCategoryAction(categoryId: string) {
  return runCatalogAction(() => CategoryService.moveToTrash(categoryId));
}

export async function reorderCategoriesAction(changes: { id: string; sortOrder: number }[]): Promise<ActionResult> {
  try {
    await Promise.all(changes.map(({ id, sortOrder }) => CategoryService.setSortOrder(id, sortOrder)));
    refresh();
    return { success: true, message: "Order saved" };
  } catch (error) {
    refresh();
    return { success: false, message: error instanceof ApiError ? error.message : "Something went wrong. Please try again." };
  }
}
