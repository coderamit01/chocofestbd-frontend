import type { UserRole } from "@/types/auth";
import type { CustomerOrdersFilter, CustomerStatusFilter, CustomerTab, PaymentMethod } from "@/types/customer";

export const CUSTOMER_VIEW_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "ORDER_HANDLER"];
export const CUSTOMER_EDIT_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
export const CUSTOMER_BAN_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

export const CUSTOMERS_PATH = "/admin/customers";
export const customerPath = (customerId: string) => `${CUSTOMERS_PATH}/${customerId}`;
export const orderPath = (orderId: string) => `/admin/orders/${orderId}`;

export const CUSTOMER_PAGE_SIZES = [5, 10, 20];
export const DEFAULT_CUSTOMER_PAGE_SIZE = 10;
export const CUSTOMER_ORDERS_PAGE_SIZE = 10;
export const CUSTOMER_EXPORT_PAGE_SIZE = 100;

export const CUSTOMER_JOINED_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Joined any time" },
  { value: "30", label: "Last 30 days" },
  { value: "365", label: "Last 12 months" },
];

export const CUSTOMER_ORDER_OPTIONS: { value: CustomerOrdersFilter; label: string }[] = [
  { value: "", label: "Any orders" },
  { value: "yes", label: "Has orders" },
  { value: "no", label: "No orders yet" },
];

export const CUSTOMER_STATUS_OPTIONS: { value: CustomerStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "banned", label: "Banned" },
];

export const CUSTOMER_TABS: { value: CustomerTab; label: string }[] = [
  { value: "orders", label: "Orders" },
  { value: "addresses", label: "Addresses" },
  { value: "wishlist", label: "Wishlist" },
  { value: "reviews", label: "Reviews" },
  { value: "cart", label: "Cart" },
];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  COD: "COD",
  SSLCOMMERZ: "Card",
  BKASH: "bKash",
  NAGAD: "Nagad",
  ROCKET: "Rocket",
  BANK_TRANSFER: "Bank transfer",
};

export const POINTS_REASON_MAX = 200;
