import { COUPON_ORDER_PAGE_SIZES, COUPON_STATUS_OPTIONS, DEFAULT_COUPON_ORDER_PAGE_SIZE, DISCOUNT_TYPE_OPTIONS } from "@/config/coupons";
import type { CouponsQuery, CouponStatusFilter, DiscountType } from "@/types/coupon";

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

const positive = (value: string | undefined) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : 1;
};

export function parseCouponsQuery(searchParams: SearchParams): CouponsQuery {
  const status = first(searchParams.status);
  const type = first(searchParams.type);
  return {
    page: positive(first(searchParams.page)),
    search: first(searchParams.search),
    status: COUPON_STATUS_OPTIONS.some((option) => option.value === status) ? (status as CouponStatusFilter) : "all",
    type: DISCOUNT_TYPE_OPTIONS.some((option) => option.value === type) ? (type as DiscountType) : undefined,
  };
}

export function couponsQueryParams(query: Partial<CouponsQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.page && query.page > 1) params.page = String(query.page);
  if (query.search) params.search = query.search;
  if (query.status && query.status !== "all") params.status = query.status;
  if (query.type) params.type = query.type;
  return params;
}

export type CouponOrdersQuery = { page: number; limit: number; search?: string };

export function parseCouponOrdersQuery(searchParams: SearchParams): CouponOrdersQuery {
  const limit = Number(first(searchParams.limit));
  return {
    page: positive(first(searchParams.page)),
    limit: COUPON_ORDER_PAGE_SIZES.includes(limit) ? limit : DEFAULT_COUPON_ORDER_PAGE_SIZE,
    search: first(searchParams.search),
  };
}

export function couponOrdersQueryParams(query: Partial<CouponOrdersQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.page && query.page > 1) params.page = String(query.page);
  if (query.limit && query.limit !== DEFAULT_COUPON_ORDER_PAGE_SIZE) params.limit = String(query.limit);
  if (query.search) params.search = query.search;
  return params;
}
