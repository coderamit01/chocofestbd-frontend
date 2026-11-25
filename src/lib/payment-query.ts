import { ADVANCE_PAYMENT_METHODS, DEFAULT_PAYMENT_SEGMENT, PAYMENT_PAGE_SIZE, PAYMENT_SEGMENTS } from "@/config/payments";
import { firstParam } from "@/lib/order-query";
import type { AdvancePaymentMethod, PaymentsQuery } from "@/types/payment";

type SearchParams = Record<string, string | string[] | undefined>;

export function parsePaymentsQuery(searchParams: SearchParams): PaymentsQuery {
  const page = Number(firstParam(searchParams.page));
  const status = firstParam(searchParams.status)?.toUpperCase();
  const method = firstParam(searchParams.method);

  return {
    status: PAYMENT_SEGMENTS.find((segment) => segment.value === status)?.value ?? DEFAULT_PAYMENT_SEGMENT,
    page: Number.isInteger(page) && page > 0 ? page : 1,
    search: firstParam(searchParams.search),
    method: ADVANCE_PAYMENT_METHODS.find((option) => option === method) as AdvancePaymentMethod | undefined,
  };
}

export function paymentsQueryParams(query: Partial<PaymentsQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.status && query.status !== DEFAULT_PAYMENT_SEGMENT) params.status = query.status.toLowerCase();
  if (query.page && query.page > 1) params.page = String(query.page);
  if (query.search) params.search = query.search;
  if (query.method) params.method = query.method;
  return params;
}

export function paymentApiParams(query: PaymentsQuery) {
  const params = new URLSearchParams({ page: String(query.page), limit: String(PAYMENT_PAGE_SIZE) });
  if (query.status !== "ALL") params.set("verification", query.status);
  if (query.method) params.set("paymentMethod", query.method);
  if (query.search) params.set("searchTerm", query.search);
  return params;
}
