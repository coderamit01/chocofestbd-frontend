const TIME_ZONE = "Asia/Dhaka";
const DAY_MS = 24 * 60 * 60 * 1000;

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const dateFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short", year: "numeric" });
const dayMonthFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short" });
const clockFormat = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" });

export const dhakaDayKey = (value: string | number | Date) => dayKeyFormat.format(new Date(value));

export const dhakaDate = (value: string | number | Date) => dateFormat.format(new Date(value));

export const dhakaDayMonth = (value: string | number | Date) => dayMonthFormat.format(new Date(value));

export const dhakaClock = (value: string | number | Date) => clockFormat.format(new Date(value));

export const dhakaDateTime = (value: string | number | Date) => `${dhakaDate(value)}, ${dhakaClock(value)}`;

export const shiftDayKey = (key: string, days: number) =>
  new Date(Date.parse(`${key}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);

export const dayKeyLabel = (key: string, withYear = false) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "short", ...(withYear && { year: "numeric" }) }).format(
    new Date(`${key}T00:00:00Z`)
  );

export const dayKeyMonth = (key: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", month: "short" }).format(new Date(`${key}T00:00:00Z`));

export const daysBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS) + 1;

export function relativeDhakaTime(value: string, now: number) {
  const key = dhakaDayKey(value);
  const today = dhakaDayKey(now);
  if (key === today) return `Today, ${dhakaClock(value)}`;
  if (key === shiftDayKey(today, -1)) return `Yesterday, ${dhakaClock(value)}`;
  return `${dhakaDayMonth(value)}, ${dhakaClock(value)}`;
}

export function timeAgoFrom(value: string, now: number) {
  const elapsed = now - new Date(value).getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  if (elapsed < minute) return "Just now";
  if (elapsed < hour) return `${Math.floor(elapsed / minute)} min ago`;
  if (elapsed < DAY_MS) return `${Math.floor(elapsed / hour)} hr ago`;
  if (elapsed < 2 * DAY_MS) return "Yesterday";
  return dhakaDayMonth(value);
}
