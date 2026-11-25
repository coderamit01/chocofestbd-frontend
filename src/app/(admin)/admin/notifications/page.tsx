import type { Metadata } from "next";
import { Suspense } from "react";
import { NotificationsFeed } from "@/components/admin/notifications/notifications-feed";
import { NotificationsSkeleton } from "@/components/admin/notifications/notifications-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { Icon } from "@/components/shared/icon";
import { NOTIFICATION_PAGE_ROLES, SETTINGS_ROLES } from "@/config/topbar";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { parseNotificationsQuery } from "@/lib/notification-query";
import { NotificationService } from "@/services/notification.service";
import type { NotificationsQuery } from "@/types/notification";

export const metadata: Metadata = {
  title: "Notifications | Chocofest BD",
};

type NotificationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadNotifications(query: NotificationsQuery) {
  try {
    const [list, unread] = await Promise.all([
      NotificationService.getNotifications(query),
      NotificationService.getUnreadCount(),
    ]);
    return { notifications: list.data ?? [], meta: list.meta, unreadCount: unread.data?.count ?? 0, now: Date.now(), error: null };
  } catch (error) {
    return {
      notifications: [],
      meta: undefined,
      unreadCount: 0,
      now: Date.now(),
      error: error instanceof ApiError ? error.message : "Something went wrong while loading notifications. Please refresh the page.",
    };
  }
}

async function NotificationsSection({ searchParams }: NotificationsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !NOTIFICATION_PAGE_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Notifications are only for the order and catalog team." />;
  }

  const query = parseNotificationsQuery(params);
  const { notifications, meta, unreadCount, now, error } = await loadNotifications(query);

  if (error) {
    return (
      <section className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
          <Icon name="ban" size={22} strokeWidth={1.8} />
        </span>
        <p className="font-medium text-ink">Couldn’t load notifications</p>
        <p className="max-w-sm text-caption text-ink-3">{error}</p>
      </section>
    );
  }

  return (
    <NotificationsFeed
      notifications={notifications}
      unreadCount={unreadCount}
      meta={meta}
      query={query}
      now={now}
      canManageAlerts={SETTINGS_ROLES.includes(currentUser.role)}
    />
  );
}

export default function NotificationsPage({ searchParams }: NotificationsPageProps) {
  return (
    <Suspense fallback={<NotificationsSkeleton />}>
      <NotificationsSection searchParams={searchParams} />
    </Suspense>
  );
}
