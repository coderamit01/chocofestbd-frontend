"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { markAllNotificationsReadAction, setNotificationReadAction } from "@/actions/notification.actions";
import { DataPagination } from "@/components/shared/data-pagination";
import { Icon } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";
import {
  NOTIFICATIONS_CHANGED_EVENT,
  NOTIFICATION_READ_STATUSES,
  NOTIFICATION_TYPE_KEYS,
  NOTIFICATION_TYPES,
} from "@/config/notifications";
import { SETTINGS_PATH } from "@/config/topbar";
import { notificationsQueryParams } from "@/lib/notification-query";
import { getNotificationDayGroup, type NotificationDayGroup } from "@/lib/notification-time";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { AppNotification, NotificationsQuery, NotificationType } from "@/types/notification";
import { NotificationItem } from "./notification-item";
import { NotificationsEmpty } from "./notifications-empty";

const DAY_GROUPS: NotificationDayGroup[] = ["Today", "Yesterday", "Earlier"];

type OptimisticChange = { id: string; isRead: boolean } | { all: true };

type NotificationsFeedProps = {
  notifications: AppNotification[];
  unreadCount: number;
  meta?: PaginationMeta;
  query: NotificationsQuery;
  now: number;
  canManageAlerts: boolean;
};

const announceChange = () => window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));

export function NotificationsFeed({ notifications, unreadCount, meta, query, now, canManageAlerts }: NotificationsFeedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isFiltering, startFiltering] = useTransition();
  const [isSaving, startSaving] = useTransition();

  const [items, applyOptimistic] = useOptimistic(notifications, (list, change: OptimisticChange) =>
    "all" in change
      ? list.map((item) => ({ ...item, isRead: true }))
      : list.map((item) => (item.id === change.id ? { ...item, isRead: change.isRead } : item))
  );

  const unread = Math.max(
    0,
    unreadCount + notifications.filter((item) => !item.isRead).length - items.filter((item) => !item.isRead).length
  );

  const setFilter = (next: Partial<Omit<NotificationsQuery, "page">>) => {
    const params = new URLSearchParams(notificationsQueryParams({ status: query.status, type: query.type, ...next }));
    const search = params.toString();
    startFiltering(() => router.push(search ? `${pathname}?${search}` : pathname, { scroll: false }));
  };

  const toggleRead = (notification: AppNotification) =>
    startSaving(async () => {
      applyOptimistic({ id: notification.id, isRead: !notification.isRead });
      const result = await setNotificationReadAction(notification.id, !notification.isRead);
      if (!result.success) toast.error("Couldn’t update notification", { description: result.message });
      announceChange();
    });

  const openNotification = (notification: AppNotification) => {
    if (notification.isRead) return;
    setNotificationReadAction(notification.id, true).then(announceChange);
  };

  const markAll = () =>
    startSaving(async () => {
      const count = unread;
      applyOptimistic({ all: true });
      const result = await markAllNotificationsReadAction();
      if (result.success) toast.success("All caught up", { description: `${count} marked as read` });
      else toast.error("Couldn’t mark notifications as read", { description: result.message });
      announceChange();
    });

  const groups = DAY_GROUPS.map((label) => ({
    label,
    items: items.filter((item) => getNotificationDayGroup(item.createdAt, now) === label),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Read state" className="inline-flex gap-1 rounded-xl bg-surface-2 p-1">
          {NOTIFICATION_READ_STATUSES.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={query.status === option.value}
              onClick={() => setFilter({ status: option.value })}
              className={cn(
                "h-8 rounded-[9px] px-3.5 text-[13px] leading-none font-medium whitespace-nowrap",
                query.status === option.value ? "bg-surface text-ink shadow-seg" : "text-ink-2 hover:text-ink"
              )}
            >
              {option.value === "unread" ? `Unread (${unread})` : option.label}
            </button>
          ))}
        </div>

        <select
          aria-label="Type"
          value={query.type ?? ""}
          onChange={(event) => setFilter({ type: (event.target.value || undefined) as NotificationType | undefined })}
          className="select-chevron h-9 w-auto cursor-pointer rounded-[10px] border border-transparent bg-surface-2 pr-[38px] pl-3 text-[13px] text-ink outline-none transition-[border-color,box-shadow,background-color] focus:border-brand focus:bg-surface focus:shadow-focus"
        >
          <option value="">All types</option>
          {NOTIFICATION_TYPE_KEYS.map((type) => (
            <option key={type} value={type}>
              {NOTIFICATION_TYPES[type].label}
            </option>
          ))}
        </select>

        <span className="flex-1" />

        <button
          type="button"
          onClick={markAll}
          disabled={unread === 0 || isSaving}
          className={buttonVariants({ variant: "soft" })}
        >
          <Icon name="check" size={17} strokeWidth={1.8} />
          Mark all read
        </button>
        {canManageAlerts && (
          <Link href={SETTINGS_PATH} className={buttonVariants({ variant: "outline" })}>
            <Icon name="settings" size={17} strokeWidth={1.8} />
            Telegram alerts
          </Link>
        )}
      </div>

      <div className={cn("flex flex-col gap-5 transition-opacity", isFiltering && "opacity-60")}>
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="eyebrow py-1">{group.label}</span>
            {group.items.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                now={now}
                isPending={isSaving}
                onToggleRead={toggleRead}
                onOpen={openNotification}
              />
            ))}
          </div>
        ))}

        {items.length === 0 && <NotificationsEmpty />}
      </div>

      {meta && meta.totalPages > 1 && (
        <DataPagination meta={meta} pathname={pathname} query={notificationsQueryParams(query)} />
      )}
    </section>
  );
}
