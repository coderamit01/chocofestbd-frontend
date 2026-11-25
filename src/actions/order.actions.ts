"use server";

import { refresh } from "next/cache";
import { DEFAULT_CANCEL_REASON, EXPORT_MAX_PAGES, EXPORT_PAGE_SIZE } from "@/config/orders";
import { ApiError, type ApiResponse } from "@/lib/api-client";
import { OrderService } from "@/services/order.service";
import type { ActionResult } from "@/types/api";
import type { BulkStatusResult, CreateOrderPayload, CustomerMatch, OrderFormOptions, OrderListItem, OrderPreview, OrdersQuery, StatusChangeInput } from "@/types/order";

type DataResult<T> = ActionResult & { data?: T };

const failure = (error: unknown, fallback = "Something went wrong. Please try again."): DataResult<never> => ({
  success: false,
  message: error instanceof ApiError ? error.message : fallback,
});

async function mutate<T>(request: () => Promise<ApiResponse<T>>): Promise<DataResult<T>> {
  try {
    const { message, data } = await request();
    refresh();
    return { success: true, message, data };
  } catch (error) {
    return failure(error);
  }
}

async function read<T>(request: () => Promise<ApiResponse<T>>): Promise<DataResult<T>> {
  try {
    const { message, data } = await request();
    return { success: true, message, data };
  } catch (error) {
    return failure(error);
  }
}

export async function changeOrderStatusAction(orderId: string, change: StatusChangeInput) {
  return mutate(() =>
    OrderService.updateStatus(orderId, change.status === "CANCELLED" ? { ...change, cancelReason: change.note || DEFAULT_CANCEL_REASON } : change)
  );
}

export async function cancelOrderAction(orderId: string, reason: string, details?: string) {
  return mutate(() => OrderService.updateStatus(orderId, { status: "CANCELLED", cancelReason: reason, ...(details && { note: details }) }));
}

export async function bulkOrderStatusAction(orderIds: string[], change: StatusChangeInput): Promise<DataResult<BulkStatusResult>> {
  return mutate(() => OrderService.bulkStatus(orderIds, change));
}

export async function markPaymentPaidAction(orderId: string) {
  return mutate(() => OrderService.markPaid(orderId));
}

export async function rejectPaymentAction(orderId: string, reason?: string) {
  return mutate(() => OrderService.rejectPayment(orderId, reason));
}

export async function recordRefundAction(orderId: string, amount: number, reference?: string) {
  return mutate(() => OrderService.recordRefund(orderId, amount, reference));
}

export async function saveAdminNoteAction(orderId: string, adminNote: string) {
  return mutate(() => OrderService.updateNote(orderId, adminNote));
}

export async function createOrderAction(payload: CreateOrderPayload) {
  return mutate(() => OrderService.create(payload));
}

export async function previewOrderAction(payload: Parameters<typeof OrderService.preview>[0]): Promise<DataResult<OrderPreview>> {
  return read(() => OrderService.preview(payload));
}

export async function loadOrderFormOptionsAction(): Promise<DataResult<OrderFormOptions>> {
  return read(() => OrderService.getFormOptions());
}

export async function searchCustomersAction(searchTerm: string): Promise<DataResult<CustomerMatch[]>> {
  if (!searchTerm.trim()) return { success: true, message: "", data: [] };
  return read(() => OrderService.searchCustomers(searchTerm.trim()));
}

export async function exportOrdersAction(query: OrdersQuery): Promise<DataResult<OrderListItem[]>> {
  try {
    const now = Date.now();
    const rows: OrderListItem[] = [];

    for (let page = 1; page <= EXPORT_MAX_PAGES; page += 1) {
      const { data = [], meta } = await OrderService.getOrders(query, now, page, EXPORT_PAGE_SIZE);
      rows.push(...data);
      if (!meta || page >= meta.totalPages) break;
    }

    return { success: true, message: "Export ready", data: rows };
  } catch (error) {
    return failure(error, "Couldn’t export orders. Please try again.");
  }
}
