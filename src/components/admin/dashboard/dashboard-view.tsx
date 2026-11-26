"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { CHART_COLORS, DASHBOARD_RANGES } from "@/config/dashboard";
import { ORDERS_PATH, PAYMENT_METHODS } from "@/config/orders";
import { useDismiss } from "@/hooks/use-dismiss";
import { bucketTitle } from "@/lib/chart-format";
import { dashboardQueryParams } from "@/lib/dashboard-query";
import { formStyles } from "@/lib/form-styles";
import { downloadCsv, toCsv } from "@/lib/order-display";
import { cn, formatTaka } from "@/lib/utils";
import type { DashboardData, DashboardQuery, DashboardSummary } from "@/types/dashboard";
import { AwaitingVerificationCard } from "./awaiting-verification-card";
import { ActiveCouponsCard, BarListCard, LowStockCard, PendingReviewsCard, TopProductsCard } from "./dashboard-cards";
import { KpiGrid, type Kpi } from "./kpi-card";
import { RecentOrdersCard } from "./recent-orders-card";
import { SalesChart } from "./sales-chart";
import { StatusDonut } from "./status-donut";

const count = (value: number) => Math.round(value).toLocaleString("en-IN");

const buildKpis = (summary: DashboardSummary, note: string): Kpi[] => [
  { label: "Revenue", value: formatTaka(summary.revenue.value), icon: "trend", tone: "solid", change: summary.revenue.change, note },
  { label: "Delivered revenue", value: formatTaka(summary.deliveredRevenue.value), icon: "zones", tone: "mint", change: summary.deliveredRevenue.change, note },
  { label: "Total orders", value: count(summary.orders.value), icon: "orders", tone: "sky", change: summary.orders.change, note },
  { label: "Avg. order value", value: formatTaka(summary.averageOrderValue.value), icon: "cash", tone: "lav", change: summary.averageOrderValue.change, note },
  { label: "New customers", value: count(summary.newCustomers.value), icon: "userAdd", tone: "brand", change: summary.newCustomers.change, note },
  { label: "Discount given", value: formatTaka(summary.discountGiven.value), icon: "percent", tone: "gray", change: summary.discountGiven.change, note },
  {
    label: "Cancel / return rate",
    value: `${summary.cancelRate.value.toFixed(1)}%`,
    icon: "xcircle",
    tone: "rose",
    change: summary.cancelRate.change,
    note,
    invert: true,
  },
  {
    label: "Pending orders",
    value: count(summary.pendingOrders),
    icon: "clock",
    tone: "amber",
    link: { href: `${ORDERS_PATH}?tab=pending`, text: "Review now" },
  },
];

export function DashboardView({ data, query }: { data: DashboardData; query: DashboardQuery }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startNavigating] = useTransition();
  const [customOpen, setCustomOpen] = useState(false);
  const [from, setFrom] = useState(data.period.from);
  const [to, setTo] = useState(data.period.to);
  const [customError, setCustomError] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const closePicker = useCallback(() => setCustomOpen(false), []);
  useDismiss(pickerRef, customOpen, closePicker);

  const { period, summary, chart, overview, now } = data;

  const navigate = (next: Partial<DashboardQuery>) => {
    const params = new URLSearchParams(dashboardQueryParams({ ...query, ...next }));
    startNavigating(() => router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  const applyCustom = () => {
    if (!from || !to || from > to) {
      setCustomError(true);
      return;
    }
    setCustomOpen(false);
    navigate({ range: "custom", from, to });
  };

  const exportIt = () => {
    const filename = `dashboard-${query.range}.csv`;
    const rows: (string | number)[][] = [
      ["Period", `${period.from} to ${period.to}`],
      [],
      ["Metric", "Value", "Previous", "Change %"],
      ...(["revenue", "deliveredRevenue", "orders", "averageOrderValue", "newCustomers", "discountGiven", "cancelRate"] as const).map((key) => [
        key,
        summary[key].value,
        summary[key].previous,
        summary[key].change ?? "",
      ]),
      ["pendingOrders", summary.pendingOrders, "", ""],
      [],
      ["Period", "Revenue", "Orders"],
      ...chart.points.map((point) => [bucketTitle(point.date, chart.groupBy), point.revenue, point.orders]),
    ];
    downloadCsv(filename, toCsv(rows));
    toast.success("Export started", { description: filename });
  };

  return (
    <div className={cn("flex flex-col gap-6 transition-opacity max-[900px]:gap-4", isNavigating && "opacity-60")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[14.5px] text-ink-2">
          Showing <strong className="font-semibold text-ink">{period.label}</strong> · compared with the previous {period.compareLabel}
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <div ref={pickerRef} className="relative">
            <div role="group" aria-label="Date range" className="inline-flex gap-1 rounded-[12px] bg-surface-2 p-1">
              {DASHBOARD_RANGES.map((range) => {
                const on = query.range === range.value;
                return (
                  <button
                    key={range.value}
                    type="button"
                    aria-pressed={on}
                    aria-expanded={range.value === "custom" ? customOpen : undefined}
                    onClick={() => (range.value === "custom" ? setCustomOpen((open) => !open) : navigate({ range: range.value, from: undefined, to: undefined }))}
                    className={cn(
                      "h-8 rounded-[9px] px-3.5 text-[13px] leading-none font-medium whitespace-nowrap",
                      on ? "bg-surface text-ink shadow-seg" : "text-ink-2 hover:text-ink"
                    )}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
            {customOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 z-40 flex w-70 animate-pop flex-col gap-3 rounded-[14px] bg-surface p-4 shadow-pop">
                <div className={formStyles.field}>
                  <label className={formStyles.label} htmlFor="df">
                    From
                  </label>
                  <input id="df" type="date" value={from} max={to} onChange={(event) => setFrom(event.target.value)} className={formStyles.input} />
                </div>
                <div className={formStyles.field}>
                  <label className={formStyles.label} htmlFor="dt">
                    To
                  </label>
                  <input id="dt" type="date" value={to} min={from} onChange={(event) => setTo(event.target.value)} className={formStyles.input} />
                </div>
                {customError && <span className={formStyles.error}>Pick a start date on or before the end date.</span>}
                <Button size="sm" onClick={applyCustom}>
                  Apply
                </Button>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={exportIt}>
            <Icon name="download" size={18} strokeWidth={1.8} />
            Export
          </Button>
        </div>
      </div>

      <KpiGrid kpis={buildKpis(summary, period.note)} min={240} />

      <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
        <SalesChart chart={chart} grain={query.grain} onGrainChange={(grain) => navigate({ grain })} />
        <StatusDonut counts={overview.statusCounts} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 max-[900px]:gap-4">
        <BarListCard
          id="pm"
          title="Payment methods"
          note="share of orders"
          color={CHART_COLORS.revenue}
          empty="No orders in this period."
          rows={overview.paymentMethods.map((row) => ({
            label: PAYMENT_METHODS[row.method].label,
            value: count(row.orders),
            sub: `${Math.round(row.share)}%`,
            raw: row.orders,
          }))}
        />
        <BarListCard
          id="tc"
          title="Top categories"
          note="by revenue"
          color={CHART_COLORS.revenue}
          empty="No sales in this period."
          rows={overview.topCategories.map((row) => ({ label: row.name, value: formatTaka(row.revenue), raw: row.revenue }))}
        />
        <BarListCard
          id="od"
          title="Orders by district"
          note={`top ${overview.districts.length}`}
          color={CHART_COLORS.district}
          empty="No orders in this period."
          rows={overview.districts.map((row) => ({ label: row.district, value: count(row.orders), raw: row.orders }))}
        />
      </div>

      <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
        <RecentOrdersCard orders={overview.recentOrders} now={now} />
        <AwaitingVerificationCard pending={overview.pendingPayments} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6 max-[900px]:gap-4">
        <TopProductsCard products={overview.topProducts} />
        <LowStockCard lowStock={overview.lowStock} />
        <PendingReviewsCard reviews={overview.pendingReviews} />
        <ActiveCouponsCard coupons={overview.activeCoupons} />
      </div>
    </div>
  );
}
