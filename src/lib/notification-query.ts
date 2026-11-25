import { NOTIFICATION_READ_STATUSES, NOTIFICATION_TYPE_KEYS } from "@/config/notifications";
import type { NotificationReadStatus, NotificationsQuery, NotificationType } from "@/types/notification";

type SearchParams = Record<string, string | string[] | undefined>;

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export function parseNotificationsQuery(searchParams: SearchParams): NotificationsQuery {
  const status = firstValue(searchParams.status);
  const type = firstValue(searchParams.type);
  const page = Number(firstValue(searchParams.page));

  return {
    status: NOTIFICATION_READ_STATUSES.some((option) => option.value === status) ? (status as NotificationReadStatus) : "all",
    ...(NOTIFICATION_TYPE_KEYS.includes(type as NotificationType) && { type: type as NotificationType }),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function notificationsQueryParams({ status, type }: Omit<NotificationsQuery, "page">) {
  return {
    ...(status !== "all" && { status }),
    ...(type && { type }),
  };
}
