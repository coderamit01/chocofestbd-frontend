"use server";

import { refresh } from "next/cache";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { UserService } from "@/services/user.service";
import type { ActionResult } from "@/types/api";
import type { ProfileInfoValues } from "@/types/profile";

export async function updateProfileAction({ name, phone }: ProfileInfoValues): Promise<ActionResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { success: false, message: "Your session has ended. Please sign in again." };
  }

  try {
    const { message } = await UserService.updateUser(currentUser.id, { name: name.trim(), phone });
    refresh();
    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
    };
  }
}
