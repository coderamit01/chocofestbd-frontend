"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { NotificationService } from "@/services/notification.service";
import type { ActionResult } from "@/types/api";

async function runNotificationAction(request: () => Promise<ApiResponse<unknown>>): Promise<ActionResult> {
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

export async function setNotificationReadAction(notificationId: string, read: boolean) {
  return runNotificationAction(() =>
    read ? NotificationService.markAsRead(notificationId) : NotificationService.markAsUnread(notificationId)
  );
}

export async function markAllNotificationsReadAction() {
  return runNotificationAction(() => NotificationService.markAllAsRead());
}
