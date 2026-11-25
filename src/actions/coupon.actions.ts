"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiFieldError, type ApiResponse } from "@/lib/api-client";
import { CouponService } from "@/services/coupon.service";
import type { ActionResult } from "@/types/api";
import type { CouponPayload } from "@/types/coupon";

type CouponActionResult = ActionResult & { status?: number; fieldErrors?: ApiFieldError[] };

async function runCouponAction(request: () => Promise<ApiResponse<unknown>>): Promise<CouponActionResult> {
  try {
    const { message } = await request();
    refresh();
    return { success: true, message };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message, status: error.status, fieldErrors: error.fieldErrors };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function saveCouponAction(couponId: string | null, payload: CouponPayload) {
  return runCouponAction(() => CouponService.saveCoupon(couponId, payload));
}

export async function setCouponActiveAction(couponId: string, isActive: boolean) {
  return runCouponAction(() => CouponService.setActive(couponId, isActive));
}

export async function deleteCouponAction(couponId: string) {
  return runCouponAction(() => CouponService.moveToTrash(couponId));
}
