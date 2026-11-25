import type { IconName } from "@/components/shared/icon";
import type { NotificationType } from "@/types/notification";

type NotificationTile = "brand" | "amber" | "rose" | "gray" | "lav";

export const NOTIFICATION_VISUALS: Record<NotificationType, { icon: IconName; tile: NotificationTile }> = {
  "order.created": { icon: "orders", tile: "brand" },
  "order.paymentPending": { icon: "payments", tile: "amber" },
  "order.cancelledByCustomer": { icon: "xcircle", tile: "gray" },
  "stock.low": { icon: "alert", tile: "amber" },
  "stock.out": { icon: "alert", tile: "rose" },
  "review.pending": { icon: "reviews", tile: "lav" },
  "system.error": { icon: "alert", tile: "rose" },
};

export const NOTIFICATION_TILE_CLASSES: Record<NotificationTile, string> = {
  brand: "bg-brand-50 text-brand",
  amber: "bg-warning-soft text-warning",
  rose: "bg-danger-soft text-danger",
  gray: "bg-surface-3 text-ink-2",
  lav: "bg-lavender-soft text-lavender",
};

export const TOPBAR_NOTIFICATION_LIMIT = 5;
