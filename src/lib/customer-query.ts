import { CUSTOMER_JOINED_OPTIONS, CUSTOMER_PAGE_SIZES, DEFAULT_CUSTOMER_PAGE_SIZE } from "@/config/customers";
import type { CustomerOrdersFilter, CustomerSort, CustomersQuery, CustomerStatusFilter } from "@/types/customer";

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

export const BENGALI_PATTERN = /[ঀ-৿]/;

export const isBengali = (value: string | null | undefined) => !!value && BENGALI_PATTERN.test(value);

export function parseCustomersQuery(searchParams: SearchParams): CustomersQuery {
  const page = Number(first(searchParams.page));
  const limit = Number(first(searchParams.limit));
  const joined = first(searchParams.joined);
  const orders = first(searchParams.orders);
  const status = first(searchParams.status);
  const sort = first(searchParams.sort);

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: CUSTOMER_PAGE_SIZES.includes(limit) ? limit : DEFAULT_CUSTOMER_PAGE_SIZE,
    search: first(searchParams.search),
    joined: CUSTOMER_JOINED_OPTIONS.some((option) => option.value && option.value === joined) ? Number(joined) : undefined,
    orders: orders === "yes" || orders === "no" ? (orders as CustomerOrdersFilter) : "",
    status: status === "active" || status === "banned" ? (status as CustomerStatusFilter) : "all",
    sort: sort === "orders" || sort === "spent" ? (sort as CustomerSort) : "newest",
    dir: first(searchParams.dir) === "asc" ? "asc" : "desc",
  };
}

export function customersQueryParams(query: Partial<CustomersQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.page && query.page > 1) params.page = String(query.page);
  if (query.limit && query.limit !== DEFAULT_CUSTOMER_PAGE_SIZE) params.limit = String(query.limit);
  if (query.search) params.search = query.search;
  if (query.joined) params.joined = String(query.joined);
  if (query.orders) params.orders = query.orders;
  if (query.status && query.status !== "all") params.status = query.status;
  if (query.sort && query.sort !== "newest") {
    params.sort = query.sort;
    if (query.dir === "asc") params.dir = "asc";
  }
  return params;
}

export function customersApiParams(query: CustomersQuery, overrides: { page?: number; limit?: number } = {}) {
  const params = new URLSearchParams({
    page: String(overrides.page ?? query.page),
    limit: String(overrides.limit ?? query.limit),
    sortBy: query.sort,
    sortOrder: query.dir,
  });
  if (query.search) params.set("searchTerm", query.search);
  if (query.joined) params.set("joinedWithinDays", String(query.joined));
  if (query.orders) params.set("hasOrders", String(query.orders === "yes"));
  if (query.status !== "all") params.set("status", query.status);
  return params;
}
