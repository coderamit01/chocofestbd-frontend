const TIME_ZONE = "Asia/Dhaka";

const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const timeFormat = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" });
const dayMonth = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short" });
const dayMonthYear = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short", year: "numeric" });

export function reviewDate(value: string, now: number) {
  const date = new Date(value);
  const [day, today] = [dayKey.format(date), dayKey.format(new Date(now))];
  const days = Math.round((Date.parse(today) - Date.parse(day)) / 86_400_000);
  if (days <= 0) return `Today, ${timeFormat.format(date)}`;
  if (days === 1) return "Yesterday";
  return day.slice(0, 4) === today.slice(0, 4) ? dayMonth.format(date) : dayMonthYear.format(date);
}

export const reviewCountLabel = (count: number) => `${count} ${count === 1 ? "review" : "reviews"}`;
