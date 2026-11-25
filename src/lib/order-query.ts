import { DEFAULT_ORDER_PAGE_SIZE, ORDER_COUPON_FILTERS, ORDER_DATE_FILTERS, ORDER_PAGE_SIZES, ORDER_TABS, PAYMENT_METHOD_FILTERS, PAYMENT_STATUS_FILTERS } from "@/config/orders";
import { dhakaDayKey, shiftDayKey } from "@/lib/dhaka-time";
import type { OrderCouponFilter, OrderDateFilter, OrdersQuery, OrderTab, PaymentMethod } from "@/types/order";
import type { PaymentStatus } from "@/types/status";

type SearchParams = Record<string, string | string[] | undefined>;

export const firstParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

const oneOf = <T extends string>(value: string | undefined, options: readonly T[]) =>
  value && (options as readonly string[]).includes(value) ? (value as T) : undefined;

export function parseOrdersQuery(searchParams: SearchParams): OrdersQuery {
  const page = Number(firstParam(searchParams.page));
  const limit = Number(firstParam(searchParams.limit));
  const tab = firstParam(searchParams.tab)?.toUpperCase();

  return {
    tab: oneOf<OrderTab>(tab, ORDER_TABS) ?? "ALL",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: ORDER_PAGE_SIZES.includes(limit) ? limit : DEFAULT_ORDER_PAGE_SIZE,
    sort: firstParam(searchParams.sort) === "total" ? "total" : "date",
    dir: firstParam(searchParams.dir) === "asc" ? "asc" : "desc",
    search: firstParam(searchParams.search),
    method: oneOf<PaymentMethod>(firstParam(searchParams.method), PAYMENT_METHOD_FILTERS),
    pay: oneOf<PaymentStatus>(firstParam(searchParams.pay), PAYMENT_STATUS_FILTERS),
    date: oneOf<OrderDateFilter>(firstParam(searchParams.date), ORDER_DATE_FILTERS.map((option) => option.value)),
    zone: firstParam(searchParams.zone),
    district: firstParam(searchParams.district),
    coupon: oneOf<OrderCouponFilter>(firstParam(searchParams.coupon), ORDER_COUPON_FILTERS.map((option) => option.value)),
  };
}

export function ordersQueryParams(query: Partial<OrdersQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.tab && query.tab !== "ALL") params.tab = query.tab.toLowerCase();
  if (query.page && query.page > 1) params.page = String(query.page);
  if (query.limit && query.limit !== DEFAULT_ORDER_PAGE_SIZE) params.limit = String(query.limit);
  if (query.sort === "total") params.sort = "total";
  if (query.dir === "asc") params.dir = "asc";
  if (query.search) params.search = query.search;
  if (query.method) params.method = query.method;
  if (query.pay) params.pay = query.pay;
  if (query.date) params.date = query.date;
  if (query.zone) params.zone = query.zone;
  if (query.district) params.district = query.district;
  if (query.coupon) params.coupon = query.coupon;
  return params;
}

const SORTS = { date: { desc: "newest", asc: "oldest" }, total: { desc: "highest", asc: "lowest" } } as const;

export function orderFilterParams(query: OrdersQuery, now: number) {
  const params = new URLSearchParams();
  if (query.search) params.set("searchTerm", query.search);
  if (query.method) params.set("paymentMethod", query.method);
  if (query.pay) params.set("paymentStatus", query.pay);
  if (query.zone) params.set("deliveryZone", query.zone);
  if (query.district) params.set("district", query.district);
  if (query.coupon) params.set("coupon", query.coupon);
  if (query.date) {
    const today = dhakaDayKey(now);
    const day = query.date === "today" ? today : shiftDayKey(today, -1);
    params.set("from", day);
    params.set("to", day);
  }
  return params;
}

export function orderListParams(query: OrdersQuery, now: number, page = query.page, limit = query.limit) {
  const params = orderFilterParams(query, now);
  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("sort", SORTS[query.sort][query.dir]);
  if (query.tab !== "ALL") params.set("status", query.tab);
  return params;
}

export const hasOrderFilters = (query: OrdersQuery) =>
  !!(query.search || query.method || query.pay || query.date || query.zone || query.district || query.coupon || query.tab !== "ALL");
