import type { IconName } from "@/components/shared/icon";
import type { UserRole } from "@/types/auth";
import type { CheckoutPaymentMethod, OrderCouponFilter, OrderDateFilter, OrderTab, PaymentMethod } from "@/types/order";
import type { OrderStatus, PaymentStatus } from "@/types/status";

export const ORDER_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "ORDER_HANDLER"];

export const ORDERS_PATH = "/admin/orders";
export const PAYMENTS_PATH = "/admin/payments";
export const orderPath = (orderId: string) => `${ORDERS_PATH}/${orderId}`;
export const invoicePath = (orderId: string) => `${ORDERS_PATH}/${orderId}/invoice`;
export const bulkInvoicePath = (orderIds: string[]) => `${ORDERS_PATH}/invoices?ids=${orderIds.join(",")}`;
export const customerPath = (userId: string) => `/admin/customers/${userId}`;

export const ORDER_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "RETURNED",
  "CANCELLED",
];

export const ORDER_TABS: OrderTab[] = ["ALL", ...ORDER_STATUSES];

export const ORDER_FLOW: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "PACKED", "SHIPPED", "CANCELLED"],
  PROCESSING: ["PACKED", "SHIPPED", "CANCELLED"],
  PACKED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "RETURNED"],
  DELIVERED: ["RETURNED"],
  RETURNED: [],
  CANCELLED: [],
};

export const CANCELLABLE_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED", "PROCESSING", "PACKED"];

export const ORDER_PAGE_SIZES = [5, 10, 20];
export const DEFAULT_ORDER_PAGE_SIZE = 10;
export const EXPORT_PAGE_SIZE = 100;
export const EXPORT_MAX_PAGES = 50;

export const PAYMENT_METHODS: Record<PaymentMethod, { label: string; short: string; color: string }> = {
  COD: { label: "Cash on delivery", short: "COD", color: "#5f5450" },
  BKASH: { label: "bKash", short: "bKash", color: "#e2136e" },
  NAGAD: { label: "Nagad", short: "Nagad", color: "#ec1c24" },
  ROCKET: { label: "Rocket", short: "Rocket", color: "#8c3494" },
  SSLCOMMERZ: { label: "SSLCommerz", short: "SSLCommerz", color: "#1b64a6" },
  BANK_TRANSFER: { label: "Bank transfer", short: "Bank transfer", color: "#3d1104" },
};

export const PAYMENT_METHOD_FILTERS: PaymentMethod[] = ["COD", "BKASH", "NAGAD", "ROCKET", "SSLCOMMERZ", "BANK_TRANSFER"];

export const CHECKOUT_PAYMENT_METHODS: CheckoutPaymentMethod[] = ["COD", "BKASH", "NAGAD", "ROCKET", "BANK_TRANSFER"];

export const PAYMENT_STATUS_FILTERS: PaymentStatus[] = ["UNPAID", "PAID", "PARTIALLY_REFUNDED", "REFUNDED"];

export const ORDER_DATE_FILTERS: { value: OrderDateFilter; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
];

export const ORDER_COUPON_FILTERS: { value: OrderCouponFilter; label: string; chip: string }[] = [
  { value: "yes", label: "Used a coupon", chip: "Used" },
  { value: "no", label: "No coupon", chip: "None" },
];

export const CANCEL_REASONS = [
  "Customer requested",
  "Customer unreachable",
  "Payment not received",
  "Out of stock",
  "Suspected fake order",
];

export const DEFAULT_CANCEL_REASON = "Cancelled by staff";

export const ORDER_TIMELINE_STEPS: { status: OrderStatus; description: string; icon: IconName }[] = [
  { status: "PENDING", description: "Order placed", icon: "clock" },
  { status: "CONFIRMED", description: "Confirmed with customer", icon: "check" },
  { status: "PROCESSING", description: "Being prepared", icon: "box" },
  { status: "PACKED", description: "Packed & labelled", icon: "gift" },
  { status: "SHIPPED", description: "Handed to courier", icon: "zones" },
  { status: "DELIVERED", description: "Delivered to customer", icon: "home" },
];

export const ORDER_SOURCE_LABELS = { website: "via website", staff: "by staff" } as const;

export const INVOICE_COPY = {
  thanks: "Thank you for choosing",
  policy: "Check your parcel in front of the rider. Unopened items can be returned within 3 days.",
  helpPrefix: "যেকোনো প্রয়োজনে WhatsApp করুন",
  signature: "Authorised signature",
  timeZoneLabel: "Asia/Dhaka",
};
