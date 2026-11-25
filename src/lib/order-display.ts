import type { BadgeVariant } from "@/components/ui/badge";
import { PAYMENT_METHODS } from "@/config/orders";
import type { OrderDetail, OrderListItem, PaymentMethod } from "@/types/order";

const BANGLA = /[ঀ-৿]/;
const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

export const isBangla = (text: string | null | undefined) => !!text && BANGLA.test(text);

export const toBanglaDigits = (text: string) => text.replace(/\d/g, (digit) => BANGLA_DIGITS[Number(digit)]);

export const methodLabel = (method: PaymentMethod) => PAYMENT_METHODS[method].label;

export const methodShort = (method: PaymentMethod) => PAYMENT_METHODS[method].short;

export const unitCount = (items: { quantity: number }[]) => items.reduce((sum, item) => sum + item.quantity, 0);

export const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

export const money = (value: string | number) => Number(value) || 0;

type PaymentDisplay = { label: string; short: string; variant: BadgeVariant };

export function paymentDisplay(order: Pick<OrderDetail, "paymentMethod" | "paymentStatus" | "paymentVerification">): PaymentDisplay {
  if (order.paymentStatus === "PAID") return { label: "Paid", short: "Paid", variant: "success" };
  if (order.paymentStatus === "PARTIALLY_REFUNDED") return { label: "Partially refunded", short: "Part refunded", variant: "brand" };
  if (order.paymentStatus === "REFUNDED") return { label: "Refunded", short: "Refunded", variant: "neutral" };
  if (order.paymentMethod === "COD") return { label: "Unpaid · COD", short: "On delivery", variant: "warning" };
  if (order.paymentVerification.status === "REJECTED") return { label: "Payment rejected", short: "Rejected", variant: "danger" };
  return { label: "Unpaid · verify", short: "Awaiting", variant: "warning" };
}

export function splitStoreName(name: string) {
  const match = name.match(/^(.*?)(\s+BD)$/i);
  return match ? { main: match[1], accent: match[2].trim() } : { main: name, accent: "" };
}

const csvCell = (value: string | number | null | undefined) => {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const toCsv = (rows: (string | number | null | undefined)[][]) => `﻿${rows.map((row) => row.map(csvCell).join(",")).join("\n")}`;

export function downloadCsv(filename: string, csv: string) {
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const ORDER_CSV_HEADER = [
  "Order",
  "Invoice",
  "Placed at",
  "Customer",
  "Phone",
  "Items",
  "Subtotal",
  "Discount",
  "Delivery",
  "Total",
  "Payment method",
  "Payment status",
  "Status",
  "Zone",
  "District",
  "Area",
  "Coupon",
];

export const orderCsvRow = (order: OrderListItem, placedAt: string) => [
  order.orderNumber,
  order.invoiceNumber,
  placedAt,
  order.recipientName,
  order.recipientPhone,
  unitCount(order.items),
  order.subtotal,
  order.discountAmount,
  order.deliveryCharge,
  order.total,
  methodLabel(order.paymentMethod),
  order.paymentStatus,
  order.status,
  order.deliveryZoneName,
  order.district,
  order.area,
  order.couponCode,
];
