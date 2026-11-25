"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { CustomerService } from "@/services/customer.service";
import type { ActionResult } from "@/types/api";

async function runCustomerAction(request: () => Promise<ApiResponse<unknown>>): Promise<ActionResult> {
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

export async function setCustomerBanAction(customerId: string, isBanned: boolean) {
  return runCustomerAction(() => CustomerService.setBanned(customerId, isBanned));
}

export async function adjustCustomerPointsAction(customerId: string, delta: number, reason: string) {
  return runCustomerAction(() => CustomerService.adjustPoints(customerId, delta, reason));
}
