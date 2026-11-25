import { orderFilterParams, orderListParams } from "@/lib/order-query";
import { serverApiRequest } from "@/lib/server-api";
import type {
  BulkStatusResult,
  CreateOrderPayload,
  CustomerMatch,
  OrderCounts,
  OrderDetail,
  OrderFilterOptions,
  OrderFormOptions,
  OrderInvoice,
  OrderListItem,
  OrderPreview,
  OrdersQuery,
  OrderSummary,
  StatusChangeInput,
} from "@/types/order";

const json = (method: string, body: unknown): RequestInit => ({ method, body: JSON.stringify(body) });

export const OrderService = {
  getOrders: (query: OrdersQuery, now: number, page?: number, limit?: number) =>
    serverApiRequest<OrderListItem[]>(`/orders/admin?${orderListParams(query, now, page, limit)}`),

  getCounts: (query: OrdersQuery, now: number) =>
    serverApiRequest<OrderCounts>(`/orders/admin/counts?${orderFilterParams(query, now)}`),

  getSummary: () => serverApiRequest<OrderSummary>("/orders/admin/summary"),

  getFilterOptions: () => serverApiRequest<OrderFilterOptions>("/orders/admin/filters"),

  getFormOptions: () => serverApiRequest<OrderFormOptions>("/orders/admin/form-options"),

  searchCustomers: (searchTerm: string) =>
    serverApiRequest<CustomerMatch[]>(`/orders/admin/customers?${new URLSearchParams({ searchTerm })}`),

  getOrder: (orderId: string) => serverApiRequest<OrderDetail>(`/orders/admin/${encodeURIComponent(orderId)}`),

  getInvoice: (orderId: string) => serverApiRequest<OrderInvoice>(`/orders/admin/${encodeURIComponent(orderId)}/invoice`),

  getInvoices: (orderIds: string[]) =>
    serverApiRequest<OrderInvoice[]>(`/orders/admin/invoices?${new URLSearchParams({ ids: orderIds.join(",") })}`),

  create: (payload: CreateOrderPayload) => serverApiRequest<{ id: string; orderNumber: string; total: string }>("/orders/admin", json("POST", payload)),

  preview: (payload: { items: CreateOrderPayload["items"]; deliveryZoneId: string; couponCode?: string; phone?: string }) =>
    serverApiRequest<OrderPreview>("/orders/preview", json("POST", payload)),

  updateStatus: (orderId: string, change: StatusChangeInput & { cancelReason?: string }) =>
    serverApiRequest(`/orders/admin/${orderId}/status`, json("PATCH", change)),

  bulkStatus: (orderIds: string[], change: StatusChangeInput) =>
    serverApiRequest<BulkStatusResult>("/orders/admin/status", json("PATCH", { orderIds, ...change })),

  markPaid: (orderId: string) => serverApiRequest(`/orders/admin/${orderId}/payment`, json("PATCH", { paymentStatus: "PAID" })),

  rejectPayment: (orderId: string, reason?: string) =>
    serverApiRequest(`/orders/admin/${orderId}/payment/reject`, json("PATCH", reason ? { reason } : {})),

  recordRefund: (orderId: string, amount: number, reference?: string) =>
    serverApiRequest(`/orders/admin/${orderId}/refund`, json("PATCH", { amount, ...(reference && { reference }) })),

  updateNote: (orderId: string, adminNote: string) => serverApiRequest(`/orders/admin/${orderId}/note`, json("PATCH", { adminNote })),
};
