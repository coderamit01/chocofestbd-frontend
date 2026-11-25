import type { UserRole } from "@/types/auth";
import type { OrderStatus, PaymentStatus, PaymentVerificationStatus } from "@/types/status";

export type PaymentMethod = "COD" | "SSLCOMMERZ" | "BKASH" | "NAGAD" | "ROCKET" | "BANK_TRANSFER";

export type CheckoutPaymentMethod = Exclude<PaymentMethod, "SSLCOMMERZ">;

export type OrderSortKey = "date" | "total";

export type SortDirection = "asc" | "desc";

export type OrderDateFilter = "today" | "yesterday";

export type OrderCouponFilter = "yes" | "no";

export type OrderTab = OrderStatus | "ALL";

export type OrdersQuery = {
  tab: OrderTab;
  page: number;
  limit: number;
  sort: OrderSortKey;
  dir: SortDirection;
  search?: string;
  method?: PaymentMethod;
  pay?: PaymentStatus;
  date?: OrderDateFilter;
  zone?: string;
  district?: string;
  coupon?: OrderCouponFilter;
};

export type OrderListItem = {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentSender: string | null;
  paymentTransactionId: string | null;
  total: string;
  subtotal: string;
  discountAmount: string;
  deliveryCharge: string;
  createdAt: string;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string | null;
  district: string;
  area: string;
  deliveryZoneName: string;
  couponCode: string | null;
  items: { productName: string; productImage: string | null; quantity: number }[];
  user: { id: string; name: string } | null;
};

export type OrderCounts = Record<OrderStatus | "ALL", number>;

export type OrderMetric = { value: number; change: number | null };

export type OrderSummary = {
  total: OrderMetric;
  pending: OrderMetric;
  shipped: OrderMetric;
  delivered: OrderMetric;
};

export type OrderFilterOptions = {
  zones: string[];
  districts: string[];
};

export type OrderItem = {
  id: string;
  productId: string | null;
  productName: string;
  productSku: string;
  productImage: string | null;
  unitPrice: string;
  quantity: number;
  lineTotal: string;
  discountAmount: string;
  categoryName: string | null;
};

export type OrderHistoryEntry = {
  id: string;
  status: OrderStatus;
  note: string | null;
  createdAt: string;
  changedBy: { id: string; name: string; role: UserRole } | null;
};

export type OrderDetail = {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentSender: string | null;
  paymentTransactionId: string | null;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string | null;
  address: string;
  district: string;
  area: string;
  deliveryZoneName: string;
  customerNote: string | null;
  adminNote: string | null;
  couponCode: string | null;
  cancelReason: string | null;
  subtotal: string;
  discountAmount: string;
  deliveryCharge: string;
  total: string;
  createdAt: string;
  items: OrderItem[];
  statusHistory: OrderHistoryEntry[];
  user: { id: string; name: string; email: string | null; phone: string | null } | null;
  customerOrderCount: number;
  source: "website" | "staff";
  deliveryZone: { name: string; estimatedDays: string | null };
  nextStatuses: OrderStatus[];
  refundedAmount: string;
  paymentVerification: {
    status: PaymentVerificationStatus | null;
    verifiedAt: string | null;
    verifiedBy: string | null;
    rejectReason: string | null;
  };
};

export type OrderInvoice = {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  orderDate: string;
  issuedAt: string;
  deliveredAt: string | null;
  store: {
    name: string;
    logo: string | null;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  billTo: {
    name: string;
    phone: string;
    email: string | null;
    address: string;
    area: string;
    district: string;
  };
  items: { name: string; sku: string; unitPrice: string; quantity: number; discountAmount: string; lineTotal: string }[];
  summary: {
    subtotal: string;
    discountAmount: string;
    couponCode: string | null;
    deliveryCharge: string;
    deliveryZoneName: string;
    total: string;
  };
  payment: {
    method: PaymentMethod;
    methodLabel: string;
    status: PaymentStatus;
    transactionId: string | null;
    paidAt: string | null;
  };
  customerNote: string | null;
};

export type OrderZoneOption = { id: string; name: string; charge: string; estimatedDays: string | null };

export type OrderProductOption = { id: string; name: string; sku: string; price: string; stock: number | null };

export type OrderFormOptions = {
  zones: OrderZoneOption[];
  products: OrderProductOption[];
  districts: { name: string; areas: string[] }[];
};

export type CustomerMatch = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  orderCount: number;
  address: { address: string; district: string; area: string; deliveryZoneId: string } | null;
};

export type CreateOrderPayload = {
  recipientName: string;
  recipientPhone: string;
  address: string;
  district: string;
  area: string;
  deliveryZoneId: string;
  items: { productId: string; quantity: number }[];
  paymentMethod: CheckoutPaymentMethod;
  couponCode?: string;
  customerNote?: string;
};

export type OrderPreview = {
  subtotal: string;
  discountAmount: string;
  deliveryCharge: string | null;
  total: string;
  coupon: { id: string; code: string; discountType: string } | null;
};

export type BulkStatusResult = {
  updated: number;
  failed: { orderNumber: string; message: string }[];
};

export type StatusChangeInput = {
  status: OrderStatus;
  note?: string;
};
