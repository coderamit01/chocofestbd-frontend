export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PAID" | "PARTIALLY_REFUNDED" | "REFUNDED";

export type PaymentVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type StockLevel = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ScheduleStatus = "ACTIVE" | "LIVE" | "SCHEDULED" | "EXPIRED" | "DISABLED";

export type AccountStatus = "ACTIVE" | "INVITED" | "BANNED" | "DEACTIVATED" | "TRASHED";

export type NotificationSeverity = "INFO" | "WARNING" | "CRITICAL";
