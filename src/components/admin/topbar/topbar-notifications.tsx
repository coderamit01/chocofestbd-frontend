"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import {
  NOTIFICATIONS_CHANGED_EVENT,
  NOTIFICATION_TILE_CLASSES,
  NOTIFICATION_TYPES,
  TOPBAR_NOTIFICATION_LIMIT,
} from "@/config/notifications";
import { NOTIFICATIONS_PATH, UNREAD_POLL_MS } from "@/config/topbar";
import { cn, timeAgo } from "@/lib/utils";
import { NotificationClient } from "@/services/notification.client";
import type { AppNotification } from "@/types/notification";
import { TopbarPopover, topbarIconButtonClass } from "./topbar-popover";

type TopbarNotificationsProps = {
  open: boolean;
  canViewAll: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function TopbarNotifications({ open, canViewAll, onToggle, onClose }: TopbarNotificationsProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCount = useCallback(
    () =>
      NotificationClient.getUnreadCount()
        .then(({ data }) => setUnread(data?.count ?? 0))
        .catch(() => {}),
    []
  );

  useEffect(() => {
    const first = setTimeout(refreshCount, 0);
    const timer = setInterval(refreshCount, UNREAD_POLL_MS);
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, refreshCount);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
      window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, refreshCount);
    };
  }, [refreshCount]);

  const loadLatest = () => {
    setIsLoading(true);
    NotificationClient.getLatest(TOPBAR_NOTIFICATION_LIMIT)
      .then(({ data }) => setNotifications(data ?? []))
      .catch(() => setNotifications([]))
      .finally(() => setIsLoading(false));
  };

  const handleToggle = () => {
    if (!open) loadLatest();
    onToggle();
  };

  const markRead = (id: string) => {
    setNotifications((list) => list.map((item) => (item.id === id ? { ...item, isRead: true } : item)));
    setUnread((count) => Math.max(0, count - 1));
  };

  const handleOpen = (notification: AppNotification) => {
    if (!notification.isRead) {
      markRead(notification.id);
      NotificationClient.markAsRead(notification.id).catch(refreshCount);
    }
    if (notification.link) {
      onClose();
      router.push(notification.link);
    }
  };

  const handleMarkAll = async () => {
    const previous = notifications;
    setNotifications((list) => list.map((item) => ({ ...item, isRead: true })));
    setUnread(0);
    try {
      await NotificationClient.markAllAsRead();
    } catch (error) {
      setNotifications(previous);
      refreshCount();
      toast.error("Couldn’t mark notifications as read", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <TopbarPopover
      open={open}
      onClose={onClose}
      className="top-[58px] w-[390px] p-0"
      fullWidthOnMobile
      trigger={
        <button
          type="button"
          className={topbarIconButtonClass}
          aria-label={`Notifications, ${unread} unread`}
          aria-expanded={open}
          onClick={handleToggle}
        >
          <Icon name="notifications" size={17} strokeWidth={1.8} />
          {unread > 0 && (
            <span className="absolute top-[11px] right-3 size-[9px] rounded-full border-2 border-surface bg-brand" />
          )}
        </button>
      }
    >
      <div className="flex items-center justify-between px-[18px] pt-4 pb-3">
        <span className="font-heading text-base leading-[1.3] font-semibold text-ink">Notifications</span>
        <button
          type="button"
          onClick={handleMarkAll}
          disabled={unread === 0}
          className="text-[13px] font-medium text-brand-text outline-none hover:text-choco focus-visible:shadow-focus disabled:cursor-default disabled:opacity-45"
        >
          Mark all read
        </button>
      </div>

      <div className="flex max-h-[360px] flex-col overflow-auto px-1.5 pb-1.5">
        {isLoading && notifications.length === 0 &&
          Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex gap-3 p-3">
              <span className="skel size-9 flex-none rounded-[36%]" />
              <span className="flex flex-1 flex-col gap-2 pt-1">
                <span className="skel h-3 w-3/4 rounded-[6px]" />
                <span className="skel h-3 w-1/2 rounded-[6px]" />
              </span>
            </div>
          ))}

        {notifications.map((notification) => {
          const visual = NOTIFICATION_TYPES[notification.type] ?? NOTIFICATION_TYPES["system.error"];

          return (
            <button
              key={notification.id}
              type="button"
              onClick={() => handleOpen(notification)}
              className={cn(
                "flex w-full items-start gap-3 rounded-[10px] p-3 text-left outline-none focus-visible:shadow-focus",
                notification.isRead ? "bg-transparent hover:bg-surface-2" : "bg-brand-50"
              )}
            >
              <span
                className={cn(
                  "flex size-9 flex-none items-center justify-center rounded-[36%]",
                  NOTIFICATION_TILE_CLASSES[visual.tile]
                )}
              >
                <Icon name={visual.icon} size={24} strokeWidth={1.8} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[13.5px] leading-[1.35] font-medium text-ink">{notification.title}</span>
                <span className="text-xs text-ink-3">
                  {notification.message} · {timeAgo(notification.createdAt)}
                </span>
              </span>
              {!notification.isRead && (
                <span aria-label="Unread" className="mt-1.5 size-2 flex-none rounded-full bg-brand" />
              )}
            </button>
          );
        })}

        {!isLoading && notifications.length === 0 && (
          <p className="p-4 text-center text-[12.5px] text-ink-3">You’re all caught up.</p>
        )}
      </div>

      {canViewAll && (
        <Link
          href={NOTIFICATIONS_PATH}
          onClick={onClose}
          className="block border-t border-line p-3.5 text-center text-[13.5px] font-medium text-brand-text outline-none hover:text-choco focus-visible:shadow-focus"
        >
          View all notifications
        </Link>
      )}
    </TopbarPopover>
  );
}
