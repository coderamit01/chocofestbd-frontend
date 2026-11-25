import type { NotificationSeverity } from "@/types/status";

export type NotificationType =
  | "order.created"
  | "order.paymentPending"
  | "order.cancelledByCustomer"
  | "stock.low"
  | "stock.out"
  | "review.pending"
  | "system.error";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  severity: NotificationSeverity;
  createdAt: string;
  isRead: boolean;
  readAt: string | null;
};

export type NotificationReadStatus = "all" | "unread" | "read";

export type NotificationsQuery = {
  status: NotificationReadStatus;
  type?: NotificationType;
  page: number;
};
