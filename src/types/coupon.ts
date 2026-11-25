import type { MetricValue } from "@/types/metric";
import type { OrderStatus } from "@/types/status";

export type DiscountType = "PERCENTAGE" | "FIXED" | "FREE_DELIVERY";

export type CouponScope = "ALL" | "PRODUCTS" | "CATEGORIES";

export type CouponState = "Active" | "Scheduled" | "Expired" | "Disabled";

export type CouponStatusFilter = "all" | "active" | "scheduled" | "expired" | "disabled";

export type Coupon = {
  id: string;
  code: string;
  discountType: DiscountType;
  scope: CouponScope;
  discountValue: string;
  maxDiscountAmount: string | null;
  minOrderAmount: string | null;
  usageLimit: number | null;
  usageLimitPerUser: number | null;
  usedCount: number;
  startsAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
  excludeSaleItems: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { products: number; categories: number; orders: number };
};

export type CouponOption = { id: string; name: string };

export type CouponDetail = Coupon & {
  products: (CouponOption & { slug: string; sku: string })[];
  categories: (CouponOption & { slug: string })[];
};

export type CouponOptions = { products: CouponOption[]; categories: CouponOption[] };

export type CouponStats = {
  activeCoupons: number;
  usesThisMonth: MetricValue;
  discountGiven: MetricValue;
  revenue: MetricValue;
};

export type CouponInsights = {
  timesUsed: MetricValue;
  discountGiven: MetricValue;
  revenue: MetricValue;
  averageOrderValue: MetricValue;
  usesPerDay: { date: string; count: number }[];
};

export type CouponOrder = {
  id: string;
  orderNumber: string;
  recipientName: string;
  user: { id: string; name: string } | null;
  createdAt: string;
  subtotal: string;
  discountAmount: string;
  total: string;
  status: OrderStatus;
};

export type CouponsQuery = {
  page: number;
  search?: string;
  status: CouponStatusFilter;
  type?: DiscountType;
};

export type CouponFormValues = {
  code: string;
  discountType: DiscountType;
  value: string;
  max: string;
  scope: CouponScope;
  picks: string[];
  min: string;
  limit: string;
  perCustomer: string;
  startsOn: string;
  expiresOn: string;
  excludeSaleItems: boolean;
  isActive: boolean;
};

export type CouponPayload = {
  code: string;
  discountType: DiscountType;
  scope: CouponScope;
  discountValue?: string;
  maxDiscountAmount: string | null;
  minOrderAmount: string | null;
  usageLimit: number | null;
  usageLimitPerUser: number | null;
  startsAt: string | null;
  expiresAt: string | null;
  excludeSaleItems: boolean;
  isActive: boolean;
  productIds?: string[];
  categoryIds?: string[];
};
