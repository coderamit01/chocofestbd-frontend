import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { NOTIFICATION_SEVERITY_BADGES, NOTIFICATION_TILE_CLASSES, NOTIFICATION_TYPES } from "@/config/notifications";
import { formatNotificationTime } from "@/lib/notification-time";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types/notification";

const BANGLA = /[ঀ-৿]/;

type NotificationItemProps = {
  notification: AppNotification;
  now: number;
  isPending: boolean;
  onToggleRead: (notification: AppNotification) => void;
  onOpen: (notification: AppNotification) => void;
};

export function NotificationItem({ notification, now, isPending, onToggleRead, onOpen }: NotificationItemProps) {
  const type = NOTIFICATION_TYPES[notification.type] ?? NOTIFICATION_TYPES["system.error"];
  const severity = NOTIFICATION_SEVERITY_BADGES[notification.severity];
  const toggleLabel = notification.isRead ? "Mark unread" : "Mark read";

  return (
    <article
      className={cn(
        "relative flex flex-wrap items-start gap-3.5 rounded-[14px] py-4 pr-4 pl-6",
        notification.isRead ? "bg-surface shadow-[inset_0_0_0_1px_var(--line)]" : "bg-brand-50"
      )}
    >
      <span className={cn("flex size-10 flex-none items-center justify-center rounded-[10px]", NOTIFICATION_TILE_CLASSES[type.tile])}>
        <Icon name={type.listIcon ?? type.icon} size={20} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className={cn("font-semibold text-ink", BANGLA.test(notification.title) && "font-bengali")}>{notification.title}</span>
          <Badge variant={severity.variant} size="sm">
            {severity.label}
          </Badge>
          <Badge variant="neutral" size="sm">
            {type.label}
          </Badge>
        </span>
        <span className={cn("text-sm text-ink-2", BANGLA.test(notification.message) && "font-bengali")}>{notification.message}</span>
        <span className="text-xs text-ink-3">{formatNotificationTime(notification.createdAt, now)}</span>
      </div>

      <div className="flex items-center gap-1.5 self-center">
        {notification.link && (
          <Link
            href={notification.link}
            onClick={() => onOpen(notification)}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {type.cta}
          </Link>
        )}
        <button
          type="button"
          aria-label={toggleLabel}
          title={toggleLabel}
          disabled={isPending}
          onClick={() => onToggleRead(notification)}
          className={buttonVariants({ variant: "square", size: "icon-md" })}
        >
          <Icon name={notification.isRead ? "notifications" : "check"} size={17} strokeWidth={1.8} />
        </button>
      </div>

      {!notification.isRead && (
        <span aria-label="Unread" className="absolute top-5 left-2 size-2 rounded-full bg-brand" />
      )}
    </article>
  );
}
