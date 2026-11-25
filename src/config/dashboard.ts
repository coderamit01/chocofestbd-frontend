import type { UserRole } from "@/types/auth";
import type { DashboardGrain, DashboardRange } from "@/types/dashboard";
import type { OrderStatus } from "@/types/status";

export const DASHBOARD_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];

export const ROLE_LANDING: Partial<Record<UserRole, string>> = {
  ORDER_HANDLER: "/admin/orders",
  RIDER: "/admin/deliveries",
};

export const DASHBOARD_TIME_ZONE = "Asia/Dhaka";

export const DASHBOARD_RANGES: { value: DashboardRange; label: string; note: string }[] = [
  { value: "today", label: "Today", note: "from yesterday" },
  { value: "yesterday", label: "Yesterday", note: "from the day before" },
  { value: "7d", label: "7 days", note: "from last week" },
  { value: "30d", label: "30 days", note: "from previous 30 days" },
  { value: "month", label: "This month", note: "from last month" },
  { value: "custom", label: "Custom", note: "from previous period" },
];

export const DEFAULT_DASHBOARD_RANGE: DashboardRange = "7d";

export const DASHBOARD_GRAINS: { value: DashboardGrain; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export const CHART_BUCKETS = 12;

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "#f0a500",
  CONFIRMED: "#3b8fd9",
  PROCESSING: "#6d72e8",
  PACKED: "#a35ee0",
  SHIPPED: "#14a3b8",
  DELIVERED: "#22a55a",
  RETURNED: "#8a94a6",
  CANCELLED: "#e5533f",
};

export const CHART_COLORS = {
  revenue: "#ee5615",
  orders: "#ffc6a5",
  bar: "#ffd0b5",
  district: "#ffb38a",
  critical: "#e5533f",
  warning: "#f0a500",
};

export const PRODUCT_TINTS: [string, string][] = [
  ["#fbe9d0", "#7a4a05"],
  ["#3d1104", "#ffd9c2"],
  ["#ffe8db", "#c2410c"],
  ["#efebfc", "#6d4fd1"],
  ["#e6f6ed", "#12733f"],
];

export const REVIEWS_PATH = "/admin/reviews";
export const COUPONS_PATH = "/admin/coupons";
