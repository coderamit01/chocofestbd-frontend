import type { UserRole } from "@/types/auth";
import type { CouponScope, CouponState, CouponStatusFilter, DiscountType } from "@/types/coupon";
import type { BadgeVariant } from "@/components/ui/badge";

export const COUPON_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
export const COUPON_DELETE_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

export const COUPONS_PATH = "/admin/coupons";
export const couponPath = (couponId: string) => `${COUPONS_PATH}/${couponId}`;

export const COUPON_PAGE_SIZE = 50;
export const COUPON_ORDER_PAGE_SIZES = [5, 10, 20];
export const DEFAULT_COUPON_ORDER_PAGE_SIZE = 5;
export const COUPON_CHART_DAYS = 14;

export const COUPON_STATUS_OPTIONS: { value: CouponStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "scheduled", label: "Scheduled" },
  { value: "expired", label: "Expired" },
  { value: "disabled", label: "Disabled" },
];

export const DISCOUNT_TYPE_OPTIONS: { value: DiscountType; label: string }[] = [
  { value: "PERCENTAGE", label: "Percentage" },
  { value: "FIXED", label: "Fixed" },
  { value: "FREE_DELIVERY", label: "Free delivery" },
];

export const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  PERCENTAGE: "Percentage",
  FIXED: "Fixed",
  FREE_DELIVERY: "Free delivery",
};

export const COUPON_SCOPE_OPTIONS: { value: CouponScope; label: string }[] = [
  { value: "ALL", label: "All products" },
  { value: "PRODUCTS", label: "Specific products" },
  { value: "CATEGORIES", label: "Specific categories" },
];

export const COUPON_STATE_BADGES: Record<CouponState, BadgeVariant> = {
  Active: "success",
  Scheduled: "info",
  Expired: "neutral",
  Disabled: "danger",
};

export const COUPON_CODE_PATTERN = /^[A-Z0-9_-]{3,30}$/;
