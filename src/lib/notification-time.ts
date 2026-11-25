import { NOTIFICATION_TIME_ZONE } from "@/config/notifications";

export type NotificationDayGroup = "Today" | "Yesterday" | "Earlier";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const RELATIVE_HOURS = 3;

const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: NOTIFICATION_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const clock = new Intl.DateTimeFormat("en-US", { timeZone: NOTIFICATION_TIME_ZONE, hour: "numeric", minute: "2-digit" });
const dayMonth = new Intl.DateTimeFormat("en-GB", { timeZone: NOTIFICATION_TIME_ZONE, day: "numeric", month: "short" });
const dayMonthYear = new Intl.DateTimeFormat("en-GB", { timeZone: NOTIFICATION_TIME_ZONE, day: "numeric", month: "short", year: "numeric" });
const year = new Intl.DateTimeFormat("en-US", { timeZone: NOTIFICATION_TIME_ZONE, year: "numeric" });

const yesterdayKey = (now: number) => dayKey.format(new Date(now - 24 * HOUR));

export function getNotificationDayGroup(value: string, now: number): NotificationDayGroup {
  const key = dayKey.format(new Date(value));
  if (key === dayKey.format(new Date(now))) return "Today";
  if (key === yesterdayKey(now)) return "Yesterday";
  return "Earlier";
}

export function formatNotificationTime(value: string, now: number) {
  const date = new Date(value);
  const elapsed = now - date.getTime();
  const group = getNotificationDayGroup(value, now);

  if (elapsed < MINUTE) return "Just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)} min ago`;
  if (group === "Today" && elapsed < RELATIVE_HOURS * HOUR) return `${Math.floor(elapsed / HOUR)} hr ago`;
  if (group === "Today") return clock.format(date);
  if (group === "Yesterday") return `Yesterday, ${clock.format(date)}`;

  const sameYear = year.format(date) === year.format(new Date(now));
  return `${(sameYear ? dayMonth : dayMonthYear).format(date)}, ${clock.format(date)}`;
}
