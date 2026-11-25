import { serverApiRequest } from "@/lib/server-api";
import type { AppNotification, NotificationsQuery } from "@/types/notification";

export const NOTIFICATIONS_PAGE_SIZE = 20;

export const NotificationService = {
  getNotifications: ({ status, type, page }: NotificationsQuery) => {
    const params = new URLSearchParams({ page: String(page), limit: String(NOTIFICATIONS_PAGE_SIZE) });
    if (status === "unread") params.set("unreadOnly", "true");
    if (status === "read") params.set("readOnly", "true");
    if (type) params.set("type", type);

    return serverApiRequest<AppNotification[]>(`/notifications?${params}`);
  },

  getUnreadCount: () => serverApiRequest<{ count: number }>("/notifications/unread-count"),

  markAsRead: (notificationId: string) => serverApiRequest(`/notifications/${notificationId}/read`, { method: "PATCH" }),

  markAsUnread: (notificationId: string) =>
    serverApiRequest(`/notifications/${notificationId}/unread`, { method: "PATCH" }),

  markAllAsRead: () => serverApiRequest<{ updated: number }>("/notifications/read-all", { method: "PATCH" }),
};
