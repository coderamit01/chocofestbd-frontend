"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { BannerService } from "@/services/banner.service";
import type { ActionResult } from "@/types/api";

type BannerActionResult = ActionResult & { status?: number };

async function runBannerAction(request: () => Promise<ApiResponse<unknown>>): Promise<BannerActionResult> {
  try {
    const { message } = await request();
    refresh();
    return { success: true, message };
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message, status: error.status };
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function setBannerActiveAction(bannerId: string, isActive: boolean) {
  return runBannerAction(() => BannerService.setActive(bannerId, isActive));
}

export async function reorderBannersAction(bannerIds: string[]) {
  return runBannerAction(() => BannerService.reorder(bannerIds));
}

export async function deleteBannerAction(bannerId: string) {
  return runBannerAction(() => BannerService.deleteBanner(bannerId));
}

export async function createBannerCategoryAction(name: string) {
  return runBannerAction(() => BannerService.createCategory(name));
}

export async function deleteBannerCategoryAction(categoryId: string) {
  return runBannerAction(() => BannerService.deleteCategory(categoryId));
}
