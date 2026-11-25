import { getInitials } from "@/lib/utils";
import { isBengali } from "@/lib/customer-query";

const TIME_ZONE = "Asia/Dhaka";
const DAY_MS = 86_400_000;

const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const timeFormat = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" });
const dateFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short", year: "numeric" });
const monthYearFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, month: "short", year: "numeric" });

const daysBetween = (value: string, now: number) => {
  const [a, b] = [dayKey.format(new Date(value)), dayKey.format(new Date(now))];
  return Math.round((Date.parse(b) - Date.parse(a)) / DAY_MS);
};

export const customerInitials = (name: string) => (isBengali(name) ? name.trim().slice(0, 2) : getInitials(name) || "?");

export const memberSince = (value: string) => `Customer since ${monthYearFormat.format(new Date(value))}`;

export const formatDhakaDate = (value: string) => dateFormat.format(new Date(value));

export function dayWithTime(value: string, now: number) {
  const days = daysBetween(value, now);
  const time = timeFormat.format(new Date(value));
  if (days === 0) return `Today, ${time}`;
  if (days === 1) return `Yesterday, ${time}`;
  return `${dateFormat.format(new Date(value))}, ${time}`;
}

export function relativeDay(value: string, now: number) {
  const days = daysBetween(value, now);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export const effectivePrice = (product: { price: string; discountPrice: string | null }) => {
  const sale = product.discountPrice !== null && Number(product.discountPrice) > 0 && Number(product.discountPrice) < Number(product.price);
  return Number(sale ? product.discountPrice : product.price);
};

export const internationalPhone = (phone: string) => `88${phone}`;

export const stars = (rating: number) => "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
