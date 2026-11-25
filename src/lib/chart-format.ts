import { dayKeyLabel, dayKeyMonth } from "@/lib/dhaka-time";
import type { ChartGroupBy } from "@/types/dashboard";

const isoWeek = (key: string) => {
  const date = new Date(`${key}T00:00:00Z`);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  return Math.ceil(((date.getTime() - yearStart) / 86_400_000 + 1) / 7);
};

const hourOf = (bucket: string) => Number(bucket.slice(11, 13));

export function bucketLabel(bucket: string, groupBy: ChartGroupBy) {
  if (groupBy === "hour") {
    const hour = hourOf(bucket);
    return `${hour % 12 || 12}${hour < 12 ? "a" : "p"}`;
  }
  if (groupBy === "week") return `W${isoWeek(bucket.slice(0, 10))}`;
  if (groupBy === "month") return dayKeyMonth(bucket.slice(0, 10));
  return dayKeyLabel(bucket.slice(0, 10));
}

export function bucketTitle(bucket: string, groupBy: ChartGroupBy) {
  const day = bucket.slice(0, 10);
  if (groupBy === "hour") {
    const hour = hourOf(bucket);
    return `${dayKeyLabel(day)}, ${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
  }
  if (groupBy === "week") return `Week of ${dayKeyLabel(day)}`;
  if (groupBy === "month") return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", month: "long", year: "numeric" }).format(new Date(`${day}T00:00:00Z`));
  return dayKeyLabel(day, true);
}

export const compactTaka = (value: number) =>
  value >= 100000 ? `৳${(value / 100000).toFixed(1).replace(".0", "")}L` : value >= 1000 ? `৳${Math.round(value / 1000)}k` : `৳${Math.round(value)}`;
