"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { ReviewService } from "@/services/review.service";
import type { ActionResult } from "@/types/api";
import type { ReviewStatus } from "@/types/status";

async function runReviewAction(request: () => Promise<ApiResponse<unknown>>): Promise<ActionResult> {
  try {
    const { message } = await request();
    refresh();
    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
    };
  }
}

export async function setReviewStatusAction(reviewIds: string[], status: ReviewStatus) {
  return runReviewAction(() => ReviewService.setStatus(reviewIds, status));
}

export async function deleteReviewAction(reviewId: string) {
  return runReviewAction(() => ReviewService.deleteReview(reviewId));
}
