import { DISCOUNT_TYPE_LABELS } from "@/config/coupons";
import { formatTaka } from "@/lib/utils";
import type { Coupon, CouponDetail, CouponFormValues, CouponPayload, CouponScope, CouponState, DiscountType } from "@/types/coupon";

const TIME_ZONE = "Asia/Dhaka";
const DHAKA_OFFSET = "+06:00";

const dayMonth = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short" });
const dayMonthYear = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short", year: "numeric" });
const dhakaDay = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });

export const toDhakaDate = (value: string | null) => (value ? dhakaDay.format(new Date(value)) : "");

export const todayInDhaka = (now: number) => dhakaDay.format(new Date(now));

export const fromDhakaDate = (value: string, endOfDay = false) =>
  value ? `${value}T${endOfDay ? "23:59:59" : "00:00:00"}${DHAKA_OFFSET}` : null;

export function couponState(coupon: Coupon, now: number): CouponState {
  if (!coupon.isActive) return "Disabled";
  if (coupon.startsAt && new Date(coupon.startsAt).getTime() > now) return "Scheduled";
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() <= now) return "Expired";
  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) return "Expired";
  return "Active";
}

export const couponValue = (coupon: Pick<Coupon, "discountType" | "discountValue">) => {
  if (coupon.discountType === "PERCENTAGE") return `${Number(coupon.discountValue)}%`;
  if (coupon.discountType === "FIXED") return formatTaka(coupon.discountValue);
  return "Free";
};

const scopeNoun = (scope: CouponScope, count: number) =>
  scope === "PRODUCTS" ? (count === 1 ? "product" : "products") : count === 1 ? "category" : "categories";

export const couponScopeLabel = (coupon: Coupon) => {
  if (coupon.scope === "ALL") return "All products";
  const count = coupon.scope === "PRODUCTS" ? coupon._count.products : coupon._count.categories;
  return `${count} ${scopeNoun(coupon.scope, count)}`;
};

export const couponWindow = (coupon: Coupon) =>
  `${dayMonth.format(new Date(coupon.startsAt ?? coupon.createdAt))} – ${coupon.expiresAt ? dayMonth.format(new Date(coupon.expiresAt)) : "no end"}`;

const couponWindowLong = (coupon: Coupon) => {
  const start = new Date(coupon.startsAt ?? coupon.createdAt);
  if (!coupon.expiresAt) return `From ${dayMonthYear.format(start)}`;
  const end = new Date(coupon.expiresAt);
  const sameYear = start.getFullYear() === end.getFullYear();
  return `${sameYear ? dayMonth.format(start) : dayMonthYear.format(start)} – ${dayMonthYear.format(end)}`;
};

const offerText = (type: DiscountType, value: string, max: string | null, scopeText: string) => {
  if (type === "FREE_DELIVERY") return `Free delivery on ${scopeText}`;
  if (type === "FIXED") return `${formatTaka(value || 0)} off ${scopeText}`;
  return `${Number(value || 0)}% off ${scopeText}${max ? `, up to ${formatTaka(max)}` : ""}`;
};

export const couponSummary = (coupon: CouponDetail) => {
  const count = coupon.scope === "PRODUCTS" ? coupon.products.length : coupon.categories.length;
  const scopeText = coupon.scope === "ALL" ? "everything" : `${count} ${scopeNoun(coupon.scope, count)}`;
  return [
    offerText(coupon.discountType, coupon.discountValue, coupon.maxDiscountAmount, scopeText),
    coupon.minOrderAmount && Number(coupon.minOrderAmount) > 0 ? `orders over ${formatTaka(coupon.minOrderAmount)}` : null,
    couponWindowLong(coupon),
  ]
    .filter(Boolean)
    .join(" · ");
};

export const couponRules = (coupon: CouponDetail) => {
  const picks = coupon.scope === "PRODUCTS" ? coupon.products : coupon.categories;
  return [
    {
      label: "Type",
      value:
        coupon.discountType === "FREE_DELIVERY"
          ? DISCOUNT_TYPE_LABELS.FREE_DELIVERY
          : `${DISCOUNT_TYPE_LABELS[coupon.discountType]} · ${couponValue(coupon)}`,
    },
    {
      label: "Max discount",
      value: coupon.discountType !== "PERCENTAGE" ? "—" : coupon.maxDiscountAmount ? formatTaka(coupon.maxDiscountAmount) : "No cap",
    },
    { label: "Applies to", value: coupon.scope === "ALL" ? "All products" : picks.map((pick) => pick.name).join(", ") },
    { label: "Min. order", value: coupon.minOrderAmount && Number(coupon.minOrderAmount) > 0 ? formatTaka(coupon.minOrderAmount) : "None" },
    {
      label: "Total limit",
      value: coupon.usageLimit
        ? `${coupon.usedCount.toLocaleString("en-IN")} of ${coupon.usageLimit.toLocaleString("en-IN")} used`
        : `${coupon.usedCount.toLocaleString("en-IN")} used · no limit`,
    },
    {
      label: "Per customer",
      value: coupon.usageLimitPerUser ? `${coupon.usageLimitPerUser} ${coupon.usageLimitPerUser === 1 ? "use" : "uses"}` : "Unlimited",
    },
    { label: "Sale items", value: coupon.excludeSaleItems ? "Excluded" : "Included" },
    { label: "Created", value: dayMonthYear.format(new Date(coupon.createdAt)) },
  ];
};

export function couponPreview(values: CouponFormValues) {
  if (!values.code) return "Fill the form to preview";
  const scopeText =
    values.scope === "ALL" ? "everything" : `${values.picks.length} ${values.scope === "PRODUCTS" ? "products" : "categories"}`;
  const offer =
    values.discountType === "FREE_DELIVERY"
      ? "Free delivery"
      : values.discountType === "PERCENTAGE"
        ? `${values.value || "0"}% off${values.max ? ` up to ${formatTaka(values.max)}` : ""}`
        : `${formatTaka(values.value || 0)} off`;
  return `${offer} on ${scopeText}${values.min ? `, orders over ${formatTaka(values.min)}` : ""}${
    values.perCustomer ? `, ${values.perCustomer}× per customer` : ""
  }.`;
}

export const emptyCouponValues = (today: string): CouponFormValues => ({
  code: "",
  discountType: "PERCENTAGE",
  value: "",
  max: "",
  scope: "ALL",
  picks: [],
  min: "",
  limit: "",
  perCustomer: "1",
  startsOn: today,
  expiresOn: "",
  excludeSaleItems: false,
  isActive: true,
});

const wholeNumber = (value: string | null) => (value && Number(value) > 0 ? String(Math.round(Number(value))) : "");

export const couponToValues = (coupon: CouponDetail): CouponFormValues => ({
  code: coupon.code,
  discountType: coupon.discountType,
  value: coupon.discountType === "FREE_DELIVERY" ? "" : wholeNumber(coupon.discountValue),
  max: wholeNumber(coupon.maxDiscountAmount),
  scope: coupon.scope,
  picks: (coupon.scope === "PRODUCTS" ? coupon.products : coupon.categories).map((item) => item.id),
  min: wholeNumber(coupon.minOrderAmount),
  limit: coupon.usageLimit ? String(coupon.usageLimit) : "",
  perCustomer: coupon.usageLimitPerUser ? String(coupon.usageLimitPerUser) : "",
  startsOn: toDhakaDate(coupon.startsAt),
  expiresOn: toDhakaDate(coupon.expiresAt),
  excludeSaleItems: coupon.excludeSaleItems,
  isActive: coupon.isActive,
});

export const couponPayload = (values: CouponFormValues): CouponPayload => ({
  code: values.code,
  discountType: values.discountType,
  scope: values.scope,
  ...(values.discountType !== "FREE_DELIVERY" && { discountValue: values.value }),
  maxDiscountAmount: values.discountType === "PERCENTAGE" && values.max ? values.max : null,
  minOrderAmount: values.min || null,
  usageLimit: Number(values.limit) || null,
  usageLimitPerUser: Number(values.perCustomer) || null,
  startsAt: fromDhakaDate(values.startsOn),
  expiresAt: fromDhakaDate(values.expiresOn, true),
  excludeSaleItems: values.excludeSaleItems,
  isActive: values.isActive,
  ...(values.scope === "PRODUCTS" && { productIds: values.picks }),
  ...(values.scope === "CATEGORIES" && { categoryIds: values.picks }),
});

export const generateCouponCode = () => `CF${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
