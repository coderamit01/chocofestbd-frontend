import type { Metric } from "@/types/metric";
import { relativeDay } from "@/lib/customer-display";
import { formatTaka } from "@/lib/utils";
import type { CustomerProfile, CustomerSummary } from "@/types/customer";

export const customerSummaryMetrics = (summary: CustomerSummary): Metric[] => [
  {
    label: "Total customers",
    value: summary.totalCustomers.value.toLocaleString("en-IN"),
    icon: "customers",
    tone: "solid",
    change: summary.totalCustomers.change,
  },
  {
    label: "New this month",
    value: summary.newThisMonth.value.toLocaleString("en-IN"),
    icon: "userAdd",
    tone: "mint",
    change: summary.newThisMonth.change,
    note: "from last month",
  },
  {
    label: "Repeat customers",
    value: `${summary.repeatRate.value}%`,
    icon: "refresh",
    tone: "lav",
    change: summary.repeatRate.change,
  },
  {
    label: "Avg. lifetime value",
    value: formatTaka(summary.averageLifetimeValue.value),
    icon: "cash",
    tone: "sky",
    change: summary.averageLifetimeValue.change,
  },
];

export const customerProfileMetrics = (profile: CustomerProfile, now: number): Metric[] => [
  { label: "Orders", value: profile.stats.orderCount.toLocaleString("en-IN"), icon: "orders", tone: "solid" },
  { label: "Lifetime value", value: formatTaka(profile.stats.lifetimeValue), icon: "cash", tone: "mint" },
  { label: "Avg. order", value: formatTaka(profile.stats.averageOrderValue), icon: "trend", tone: "sky" },
  {
    label: "Last order",
    value: profile.stats.lastOrderAt ? relativeDay(profile.stats.lastOrderAt, now) : "—",
    icon: "clock",
    tone: "lav",
  },
];
