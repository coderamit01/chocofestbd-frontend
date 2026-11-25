import { apiRequest } from "@/lib/api-client";
import type { AppNotification } from "@/types/notification";

export const NotificationService = {
  getLatest: (limit: number) =>
    apiRequest<AppNotification[]>(`/notifications?${new URLSearchParams({ page: "1", limit: String(limit) })}`),

  getUnreadCount: () => apiRequest<{ count: number }>("/notifications/unread-count"),

  markAsRead: (notificationId: string) => apiRequest(`/notifications/${notificationId}/read`, { method: "PATCH" }),

  markAllAsRead: () => apiRequest("/notifications/read-all", { method: "PATCH" }),
};
