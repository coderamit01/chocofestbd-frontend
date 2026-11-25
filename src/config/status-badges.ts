import type { BadgeVariant } from "@/components/ui/badge";
import type { UserRole } from "@/types/auth";
import type {
  AccountStatus,
  NotificationSeverity,
  OrderStatus,
  PaymentStatus,
  PaymentVerificationStatus,
  ProductStatus,
  ReviewStatus,
  ScheduleStatus,
  StockLevel,
} from "@/types/status";

type BadgeStyle = { label: string; variant: BadgeVariant };

type BadgeMap<T extends string> = Record<T, BadgeStyle>;

const ORDER: BadgeMap<OrderStatus> = {
  PENDING: { label: "Pending", variant: "warning" },
  CONFIRMED: { label: "Confirmed", variant: "info" },
  PROCESSING: { label: "Processing", variant: "processing" },
  PACKED: { label: "Packed", variant: "packed" },
  SHIPPED: { label: "Shipped", variant: "shipped" },
  DELIVERED: { label: "Delivered", variant: "success" },
  RETURNED: { label: "Returned", variant: "neutral" },
  CANCELLED: { label: "Cancelled", variant: "danger" },
};

const PAYMENT: BadgeMap<PaymentStatus> = {
  UNPAID: { label: "Unpaid", variant: "warning" },
  PAID: { label: "Paid", variant: "success" },
  PARTIALLY_REFUNDED: { label: "Partially refunded", variant: "brand" },
  REFUNDED: { label: "Refunded", variant: "neutral" },
};

const VERIFICATION: BadgeMap<PaymentVerificationStatus> = {
  PENDING: { label: "Pending", variant: "warning" },
  VERIFIED: { label: "Verified", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

const PRODUCT: BadgeMap<ProductStatus> = {
  DRAFT: { label: "Draft", variant: "neutral" },
  ACTIVE: { label: "Active", variant: "success" },
  ARCHIVED: { label: "Archived", variant: "brand" },
};

const STOCK: BadgeMap<StockLevel> = {
  IN_STOCK: { label: "In stock", variant: "success" },
  LOW_STOCK: { label: "Low stock", variant: "warning" },
  OUT_OF_STOCK: { label: "Out of stock", variant: "danger" },
};

const REVIEW: BadgeMap<ReviewStatus> = {
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

const SCHEDULE: BadgeMap<ScheduleStatus> = {
  ACTIVE: { label: "Active", variant: "success" },
  LIVE: { label: "Live", variant: "success" },
  SCHEDULED: { label: "Scheduled", variant: "info" },
  EXPIRED: { label: "Expired", variant: "neutral" },
  DISABLED: { label: "Disabled", variant: "danger" },
};

const ACCOUNT: BadgeMap<AccountStatus> = {
  ACTIVE: { label: "Active", variant: "success" },
  INVITED: { label: "Invited", variant: "info" },
  BANNED: { label: "Banned", variant: "danger" },
  DEACTIVATED: { label: "Deactivated", variant: "neutral" },
  TRASHED: { label: "In trash", variant: "neutral" },
};

const ROLE: BadgeMap<UserRole> = {
  SUPER_ADMIN: { label: "Super Admin", variant: "dark" },
  ADMIN: { label: "Admin", variant: "default" },
  MANAGER: { label: "Manager", variant: "lavender" },
  ORDER_HANDLER: { label: "Order Handler", variant: "info" },
  RIDER: { label: "Rider", variant: "success" },
  CUSTOMER: { label: "Customer", variant: "neutral" },
};

const SEVERITY: BadgeMap<NotificationSeverity> = {
  INFO: { label: "Info", variant: "info" },
  WARNING: { label: "Warning", variant: "warning" },
  CRITICAL: { label: "Critical", variant: "danger" },
};

export const STATUS_BADGES = {
  order: ORDER,
  payment: PAYMENT,
  verification: VERIFICATION,
  product: PRODUCT,
  stock: STOCK,
  review: REVIEW,
  schedule: SCHEDULE,
  account: ACCOUNT,
  role: ROLE,
  severity: SEVERITY,
};

export type StatusKind = keyof typeof STATUS_BADGES;

export type StatusOf<K extends StatusKind> = keyof (typeof STATUS_BADGES)[K];
