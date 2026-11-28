import type { AccountCustomer, AccountStat, AccountTab, SavedAddress } from "@/types/store-account";
import type { CustomerOrder, OrderFilter } from "@/types/store-order";

export const ACCOUNT_CUSTOMER: AccountCustomer = {
  name: "Rafiul Islam",
  initials: "RI",
  phone: "01712-345678",
  mobile: "01712345678",
  email: "rafi@example.com",
  birthday: "1994-03-12",
  tier: "Gold member · 1,240 pts",
};

export const WISHLIST_PRODUCT_IDS = [2, 6, 7, 9, 12, 14];

export const ACCOUNT_TABS: AccountTab[] = [
  { label: "My orders", href: "/account", icon: "orders", count: 3 },
  { label: "Wishlist", href: "/wishlist", icon: "heart", count: WISHLIST_PRODUCT_IDS.length },
  { label: "Addresses", href: "/account/addresses", icon: "deliveries" },
  { label: "Profile", href: "/account/profile", icon: "user" },
];

export const ACCOUNT_STATS: AccountStat[] = [
  { label: "Orders", value: "14" },
  { label: "Total spent", value: "৳38,420" },
  { label: "Saved with offers", value: "৳4,180" },
  { label: "Reward points", value: "1,240" },
];

export const ORDER_FILTERS: OrderFilter[] = [
  { label: "All" },
  { label: "Active", tone: "live" },
  { label: "Delivered", tone: "ok" },
  { label: "Cancelled", tone: "no" },
];

export const ACCOUNT_ORDERS: CustomerOrder[] = [
  { number: "CF-260482", date: "Today", status: "Out for delivery", tone: "live", productIds: [1, 9, 3], total: 6873, payment: "Cash on delivery" },
  { number: "CF-259911", date: "18 Nov 2026", status: "Confirmed", tone: "live", productIds: [6, 5], total: 890, payment: "bKash" },
  { number: "CF-251204", date: "2 Nov 2026", status: "Delivered", tone: "ok", productIds: [2, 15], total: 3170, payment: "Cash on delivery" },
  { number: "CF-248870", date: "14 Oct 2026", status: "Delivered", tone: "ok", productIds: [7], total: 770, payment: "Nagad" },
  { number: "CF-240015", date: "1 Sep 2026", status: "Cancelled", tone: "no", productIds: [13, 8], total: 680, payment: "—" },
];

export const SAVED_ADDRESSES: SavedAddress[] = [
  { id: "home", icon: "🏠", label: "Home", name: "Rafiul Islam", phone: "01712-345678", line: "House 21, Road 3, Flat 4B, Dhanmondi, Dhaka" },
  { id: "office", icon: "💼", label: "Office", name: "Rafiul Islam", phone: "01712-345678", line: "Level 7, Navana Tower, Gulshan 1, Dhaka" },
  { id: "ammu", icon: "🎁", label: "Ammu", name: "Rokeya Begum", phone: "01819-000000", line: "Kanaikhali, Natore Sadar, Natore" },
];
