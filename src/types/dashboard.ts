import type { PaymentMethod } from "@/types/order";
import type { PaymentRow } from "@/types/payment";
import type { OrderStatus, PaymentStatus } from "@/types/status";

export type DashboardRange = "today" | "yesterday" | "7d" | "30d" | "month" | "custom";

export type DashboardGrain = "day" | "week" | "month";

export type ChartGroupBy = "hour" | DashboardGrain;

export type DashboardQuery = {
  range: DashboardRange;
  grain: DashboardGrain;
  from?: string;
  to?: string;
};

export type DateWindow = { from: string; to: string };

export type DashboardPeriod = DateWindow & {
  label: string;
  compareLabel: string;
  note: string;
  chart: DateWindow & { groupBy: ChartGroupBy };
};

export type SummaryMetric = { value: number; previous: number; change: number | null };

export type DashboardSummary = {
  range: DateWindow;
  previousRange: DateWindow;
  revenue: SummaryMetric;
  deliveredRevenue: SummaryMetric;
  orders: SummaryMetric;
  averageOrderValue: SummaryMetric;
  newCustomers: SummaryMetric;
  discountGiven: SummaryMetric;
  cancelRate: SummaryMetric;
  pendingOrders: number;
};

export type SalesPoint = { date: string; orders: number; revenue: number; averageOrderValue: number };

export type SalesChart = {
  range: DateWindow;
  groupBy: ChartGroupBy;
  points: SalesPoint[];
};

export type DashboardOverview = {
  range: DateWindow;
  statusCounts: Record<OrderStatus, number>;
  paymentMethods: { method: PaymentMethod; orders: number; share: number }[];
  topCategories: { name: string; revenue: number }[];
  districts: { district: string; orders: number }[];
  topProducts: { id: string; name: string; image: string | null; units: number; revenue: number }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    recipientName: string;
    recipientPhone: string;
    total: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    createdAt: string;
  }[];
  pendingPayments: { total: number; items: PaymentRow[] };
  lowStock: { total: number; items: { id: string; name: string; stock: number; lowStockThreshold: number }[] };
  pendingReviews: {
    total: number;
    items: { id: string; rating: number; comment: string | null; customerName: string }[];
  };
  activeCoupons: {
    id: string;
    code: string;
    discountType: "PERCENTAGE" | "FIXED" | "FREE_DELIVERY";
    discountValue: number;
    usedCount: number;
    usageLimit: number | null;
  }[];
};

export type DashboardData = {
  period: DashboardPeriod;
  summary: DashboardSummary;
  chart: SalesChart;
  overview: DashboardOverview;
  now: number;
};
