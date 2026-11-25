"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { UserService } from "@/services/user.service";
import type { ActionResult } from "@/types/api";
import type { UserRole } from "@/types/auth";

async function runUserAction(request: () => Promise<ApiResponse<unknown>>): Promise<ActionResult> {
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

export async function changeUserRoleAction(userId: string, role: UserRole) {
  return runUserAction(() => UserService.updateUser(userId, { role }));
}

export async function updateStaffAction(userId: string, payload: { name: string; phone: string; role: UserRole }) {
  return runUserAction(() => UserService.updateUser(userId, payload));
}

export async function setUserBanAction(userId: string, isBanned: boolean) {
  return runUserAction(() => UserService.updateUser(userId, { isBanned }));
}

export async function moveUserToTrashAction(userId: string) {
  return runUserAction(() => UserService.moveToTrash(userId));
}

export async function restoreUserAction(userId: string) {
  return runUserAction(() => UserService.restore(userId));
}

export async function deleteUserPermanentlyAction(userId: string) {
  return runUserAction(() => UserService.deletePermanently(userId));
}
