import type { MetricValue } from "@/types/metric";
import type { OrderStatus, ReviewStatus } from "@/types/status";

export type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  image: string | null;
  isBanned: boolean;
  points: number;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
};

export type CustomerSummary = {
  totalCustomers: MetricValue;
  newThisMonth: MetricValue;
  repeatRate: MetricValue;
  averageLifetimeValue: MetricValue;
};

export type CustomerStatusFilter = "all" | "active" | "banned";

export type CustomerOrdersFilter = "" | "yes" | "no";

export type CustomerSort = "newest" | "orders" | "spent";

export type CustomersQuery = {
  page: number;
  limit: number;
  search?: string;
  joined?: number;
  orders: CustomerOrdersFilter;
  status: CustomerStatusFilter;
  sort: CustomerSort;
  dir: "asc" | "desc";
};

type ProductRef = { id: string; name: string; image: string | null; price: string; discountPrice: string | null };

export type CustomerAddress = {
  id: string;
  label: string | null;
  recipientName: string;
  recipientPhone: string;
  address: string;
  district: string;
  area: string;
  isDefault: boolean;
  deliveryZone: { name: string };
};

export type CustomerWishlistItem = { id: string; createdAt: string; product: ProductRef & { slug: string } };

export type CustomerReview = {
  id: string;
  rating: number;
  comment: string | null;
  status: ReviewStatus;
  createdAt: string;
  product: { id: string; name: string };
};

export type CustomerCartItem = { id: string; quantity: number; product: ProductRef };

export type CustomerProfile = Omit<CustomerRow, "orderCount" | "totalSpent"> & {
  emailVerified: boolean;
  updatedAt: string;
  lastSeenAt: string | null;
  addresses: CustomerAddress[];
  wishlist: CustomerWishlistItem[];
  reviews: CustomerReview[];
  cart: { updatedAt: string | null; items: CustomerCartItem[] };
  stats: { orderCount: number; lifetimeValue: number; averageOrderValue: number; lastOrderAt: string | null };
  openOrders: string[];
};

export type PaymentMethod = "COD" | "SSLCOMMERZ" | "BKASH" | "NAGAD" | "ROCKET" | "BANK_TRANSFER";

export type CustomerOrder = {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  itemCount: number;
};

export type CustomerTab = "orders" | "addresses" | "wishlist" | "reviews" | "cart";
