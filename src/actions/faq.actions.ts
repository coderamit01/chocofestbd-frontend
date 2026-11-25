"use server";

import { refresh } from "next/cache";
import { ApiError } from "@/lib/api-client";
import type { SortOrderChange } from "@/lib/sort-order";
import { FaqService } from "@/services/faq.service";
import type { ActionResult } from "@/types/api";
import type { FaqPayload } from "@/types/faq";
import { runCatalogAction } from "./catalog-action";

export async function saveFaqAction(faqId: string | null, payload: FaqPayload) {
  return runCatalogAction(() => FaqService.saveFaq(faqId, payload));
}

export async function setFaqActiveAction(faqId: string, isActive: boolean) {
  return runCatalogAction(() => FaqService.updateFaq(faqId, { isActive }));
}

export async function deleteFaqAction(faqId: string) {
  return runCatalogAction(() => FaqService.deleteFaq(faqId));
}

export async function reorderFaqsAction(changes: SortOrderChange[]): Promise<ActionResult> {
  try {
    await Promise.all(changes.map(({ id, sortOrder }) => FaqService.updateFaq(id, { sortOrder })));
    refresh();
    return { success: true, message: "Order saved" };
  } catch (error) {
    refresh();
    return { success: false, message: error instanceof ApiError ? error.message : "Something went wrong. Please try again." };
  }
}
