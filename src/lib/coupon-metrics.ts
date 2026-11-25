import { formatTaka } from "@/lib/utils";
import type { CouponInsights, CouponStats } from "@/types/coupon";
import type { Metric } from "@/types/metric";

export const couponStatsMetrics = (stats: CouponStats): Metric[] => [
  { label: "Active coupons", value: stats.activeCoupons.toLocaleString("en-IN"), icon: "coupons", tone: "solid" },
  {
    label: "Uses this month",
    value: stats.usesThisMonth.value.toLocaleString("en-IN"),
    icon: "cart",
    tone: "sky",
    change: stats.usesThisMonth.change,
    note: "from last month",
  },
  {
    label: "Discount given",
    value: formatTaka(stats.discountGiven.value),
    icon: "percent",
    tone: "lav",
    change: stats.discountGiven.change,
    note: "from last month",
  },
  {
    label: "Revenue with coupons",
    value: formatTaka(stats.revenue.value),
    icon: "trend",
    tone: "mint",
    change: stats.revenue.change,
    note: "from last month",
  },
];

export const couponInsightMetrics = (insights: CouponInsights): Metric[] => [
  { label: "Times used", value: insights.timesUsed.value.toLocaleString("en-IN"), icon: "cart", tone: "solid", change: insights.timesUsed.change },
  { label: "Discount given", value: formatTaka(insights.discountGiven.value), icon: "percent", tone: "lav", change: insights.discountGiven.change },
  { label: "Revenue generated", value: formatTaka(insights.revenue.value), icon: "trend", tone: "mint", change: insights.revenue.change },
  {
    label: "Avg. order value",
    value: formatTaka(insights.averageOrderValue.value),
    icon: "cash",
    tone: "sky",
    change: insights.averageOrderValue.change,
  },
];
