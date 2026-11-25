import type { IconName } from "@/components/shared/icon";
import type { BadgeVariant } from "@/components/ui/badge";
import type { NotificationReadStatus, NotificationType } from "@/types/notification";
import type { NotificationSeverity } from "@/types/status";

type NotificationTile = "brand" | "amber" | "rose" | "gray" | "lav";

type NotificationTypeConfig = {
  label: string;
  cta: string;
  icon: IconName;
  listIcon?: IconName;
  tile: NotificationTile;
};

export const NOTIFICATION_TYPES: Record<NotificationType, NotificationTypeConfig> = {
  "order.created": { label: "New order", cta: "View order", icon: "orders", tile: "brand" },
  "order.paymentPending": { label: "Payment pending", cta: "Verify", icon: "payments", tile: "amber" },
  "order.cancelledByCustomer": { label: "Cancelled by customer", cta: "View order", icon: "xcircle", tile: "gray" },
  "stock.low": { label: "Low stock", cta: "View product", icon: "alert", tile: "amber" },
  "stock.out": { label: "Out of stock", cta: "Restock", icon: "alert", listIcon: "box", tile: "rose" },
  "review.pending": { label: "Review pending", cta: "Moderate", icon: "reviews", tile: "lav" },
  "system.error": { label: "System error", cta: "Check settings", icon: "alert", tile: "rose" },
};

export const NOTIFICATION_TYPE_KEYS = Object.keys(NOTIFICATION_TYPES) as NotificationType[];

export const NOTIFICATION_TILE_CLASSES: Record<NotificationTile, string> = {
  brand: "bg-brand-50 text-brand",
  amber: "bg-warning-soft text-warning",
  rose: "bg-danger-soft text-danger",
  gray: "bg-surface-3 text-ink-2",
  lav: "bg-lavender-soft text-lavender",
};

export const NOTIFICATION_SEVERITY_BADGES: Record<NotificationSeverity, { label: string; variant: BadgeVariant }> = {
  INFO: { label: "Info", variant: "info" },
  WARNING: { label: "Warning", variant: "warning" },
  CRITICAL: { label: "Critical", variant: "danger" },
};

export const NOTIFICATION_READ_STATUSES: { value: NotificationReadStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
];

export const NOTIFICATION_TIME_ZONE = "Asia/Dhaka";

export const NOTIFICATIONS_CHANGED_EVENT = "notifications:changed";

export const TOPBAR_NOTIFICATION_LIMIT = 5;
