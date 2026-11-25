import { ApiError } from "@/lib/api-client";
import { OrderService } from "@/services/order.service";
import { PaymentService } from "@/services/payment.service";
import type { OrdersQuery } from "@/types/order";
import type { PaymentsQuery } from "@/types/payment";

const errorMessage = (error: unknown, fallback: string) => (error instanceof ApiError ? error.message : fallback);

export async function loadOrdersPage(query: OrdersQuery) {
  try {
    const now = Date.now();
    const [list, counts, summary, filters] = await Promise.all([
      OrderService.getOrders(query, now),
      OrderService.getCounts(query, now),
      OrderService.getSummary(),
      OrderService.getFilterOptions(),
    ]);

    if (!counts.data || !summary.data || !filters.data) throw new Error("Missing order data");

    return {
      data: { orders: list.data ?? [], meta: list.meta, counts: counts.data, summary: summary.data, filters: filters.data },
      error: null,
    };
  } catch (error) {
    return { data: null, error: errorMessage(error, "Something went wrong while loading orders. Please refresh the page.") };
  }
}

export async function loadOrderDetail(orderId: string) {
  try {
    const { data } = await OrderService.getOrder(orderId);
    if (!data) throw new Error("Missing order");
    return { data, notFound: false, error: null };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return { data: null, notFound: true, error: null };
    return { data: null, notFound: false, error: errorMessage(error, "Something went wrong while loading this order. Please refresh the page.") };
  }
}

export async function loadInvoices(orderIds: string[]) {
  try {
    const now = Date.now();
    if (orderIds.length === 1) {
      const { data } = await OrderService.getInvoice(orderIds[0]);
      return { data: data ? [data] : [], now, notFound: !data, error: null };
    }
    const { data = [] } = await OrderService.getInvoices(orderIds);
    return { data, now, notFound: data.length === 0, error: null };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return { data: [], now: 0, notFound: true, error: null };
    return { data: [], now: 0, notFound: false, error: errorMessage(error, "Something went wrong while loading the invoice. Please refresh the page.") };
  }
}

export async function loadPaymentsPage(query: PaymentsQuery) {
  try {
    const now = Date.now();
    const [list, summary] = await Promise.all([PaymentService.getPayments(query), PaymentService.getSummary()]);
    if (!summary.data) throw new Error("Missing payment summary");
    return { data: { payments: list.data ?? [], meta: list.meta, summary: summary.data, now }, error: null };
  } catch (error) {
    return { data: null, error: errorMessage(error, "Something went wrong while loading payments. Please refresh the page.") };
  }
}
