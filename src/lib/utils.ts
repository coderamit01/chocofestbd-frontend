export { cn } from "cn";

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const formatDate = (value: string | Date) => dateFormatter.format(new Date(value));

export const formatPhone = (phone: string) => (phone.length === 11 ? `${phone.slice(0, 5)}-${phone.slice(5)}` : phone);

export const pickByHash = <T,>(key: string, options: T[]) => {
  const hash = [...key].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 0);
  return options[hash % options.length];
};

export const formatTaka = (amount: number | string) => `৳${Math.round(Number(amount)).toLocaleString("en-IN")}`;

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const timeAgo = (value: string | Date) => {
  const elapsed = Date.now() - new Date(value).getTime();
  if (elapsed < MINUTE) return "Just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)} min ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)} hr ago`;
  if (elapsed < 2 * DAY) return "Yesterday";
  return formatDate(value);
};
