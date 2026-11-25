import { refresh } from "next/cache";
import { ApiError, type ApiFieldError, type ApiResponse } from "@/lib/api-client";
import type { ActionResult } from "@/types/api";

export type CatalogActionResult<T = unknown> = ActionResult & { data?: T; fieldErrors?: ApiFieldError[] };

export async function runCatalogAction<T>(request: () => Promise<ApiResponse<T>>): Promise<CatalogActionResult<T>> {
  try {
    const { message, data } = await request();
    refresh();
    return { success: true, message, data };
  } catch (error) {
    return {
      success: false,
      message: error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
      fieldErrors: error instanceof ApiError ? error.fieldErrors : [],
    };
  }
}
