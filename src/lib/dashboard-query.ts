import { CHART_BUCKETS, DASHBOARD_GRAINS, DASHBOARD_RANGES, DEFAULT_DASHBOARD_RANGE } from "@/config/dashboard";
import { dayKeyLabel, dayKeyMonth, daysBetween, dhakaDayKey, shiftDayKey } from "@/lib/dhaka-time";
import { firstParam } from "@/lib/order-query";
import type { ChartGroupBy, DashboardPeriod, DashboardQuery, DateWindow } from "@/types/dashboard";

type SearchParams = Record<string, string | string[] | undefined>;

const MAX_CUSTOM_DAYS = 731;
const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

const validKey = (value: string | undefined) => (value && DATE_KEY.test(value) && !Number.isNaN(Date.parse(value)) ? value : undefined);

export function parseDashboardQuery(searchParams: SearchParams): DashboardQuery {
  const range = DASHBOARD_RANGES.find((option) => option.value === firstParam(searchParams.range))?.value ?? DEFAULT_DASHBOARD_RANGE;
  const grain = DASHBOARD_GRAINS.find((option) => option.value === firstParam(searchParams.grain))?.value ?? "day";
  const from = validKey(firstParam(searchParams.from));
  const to = validKey(firstParam(searchParams.to));

  if (range === "custom" && from && to && from <= to && daysBetween(from, to) <= MAX_CUSTOM_DAYS) {
    return { range, grain, from, to };
  }

  return { range: range === "custom" ? DEFAULT_DASHBOARD_RANGE : range, grain };
}

export function dashboardQueryParams(query: Partial<DashboardQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.range && query.range !== DEFAULT_DASHBOARD_RANGE) params.range = query.range;
  if (query.grain && query.grain !== "day") params.grain = query.grain;
  if (query.range === "custom" && query.from && query.to) {
    params.from = query.from;
    params.to = query.to;
  }
  return params;
}

const monthName = (key: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", month: "long" }).format(new Date(`${key}T00:00:00Z`));

const spanLabel = (from: string, to: string) => {
  if (from === to) return dayKeyLabel(from);
  if (from.slice(0, 7) === to.slice(0, 7)) return `${Number(from.slice(8))}–${dayKeyLabel(to)}`;
  return `${dayKeyLabel(from)} – ${dayKeyLabel(to)}`;
};

const dayCount = (days: number) => (days === 1 ? "day" : `${days} days`);

function chartWindow(window: DateWindow, grain: DashboardQuery["grain"]): DateWindow & { groupBy: ChartGroupBy } {
  if (grain === "week") return { from: shiftDayKey(window.to, -(CHART_BUCKETS * 7 - 1)), to: window.to, groupBy: "week" };
  if (grain === "month") {
    const start = new Date(`${window.to.slice(0, 7)}-01T00:00:00Z`);
    start.setUTCMonth(start.getUTCMonth() - (CHART_BUCKETS - 1));
    return { from: start.toISOString().slice(0, 10), to: window.to, groupBy: "month" };
  }
  return { ...window, groupBy: window.from === window.to ? "hour" : "day" };
}

export function resolveDashboardPeriod(query: DashboardQuery, now: number): DashboardPeriod {
  const today = dhakaDayKey(now);
  const note = DASHBOARD_RANGES.find((option) => option.value === query.range)?.note ?? "";
  let window: DateWindow;
  let label: string;

  if (query.range === "today") {
    window = { from: today, to: today };
    label = `today (${dayKeyLabel(today)})`;
  } else if (query.range === "yesterday") {
    const day = shiftDayKey(today, -1);
    window = { from: day, to: day };
    label = `yesterday (${dayKeyLabel(day)})`;
  } else if (query.range === "30d") {
    window = { from: shiftDayKey(today, -29), to: today };
    label = "the last 30 days";
  } else if (query.range === "month") {
    window = { from: `${today.slice(0, 8)}01`, to: today };
    label = `${monthName(today)} (${spanLabel(window.from, today).replace(` ${dayKeyMonth(today)}`, "")})`;
  } else if (query.range === "custom" && query.from && query.to) {
    window = { from: query.from, to: query.to };
    label = spanLabel(query.from, query.to);
  } else {
    window = { from: shiftDayKey(today, -6), to: today };
    label = "the last 7 days";
  }

  return {
    ...window,
    label,
    compareLabel: dayCount(daysBetween(window.from, window.to)),
    note,
    chart: chartWindow(window, query.grain),
  };
}
