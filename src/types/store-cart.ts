import type { StoreProduct } from "@/types/store-product";

export type CartItem = {
  productId: number;
  quantity: number;
};

export type CartZone = "dhaka" | "out";

export type DeliveryZoneId = "in" | "sub" | "out" | "exp";

export type PaymentMethodId = "cod" | "bkash" | "nagad" | "card";

export type AddressLabel = "Home" | "Office" | "Gift recipient";

export type CartLine = {
  product: StoreProduct;
  quantity: number;
};

export type CheckoutAddress = {
  phone: string;
  name: string;
  district: string;
  area: string;
  addr: string;
  email: string;
  note: string;
};

export type PlacedOrderLine = {
  productId: number;
  quantity: number;
};

export type PlacedOrder = {
  number: string;
  address: CheckoutAddress;
  lines: PlacedOrderLine[];
  delivery: DeliveryZoneId;
  payment: PaymentMethodId;
  total: number;
  settled: boolean;
};

export type CartState = {
  items: CartItem[];
  saved: number[];
  removed: CartItem | null;
  zone: CartZone;
  couponCode: string;
  gift: boolean;
  giftNote: string;
  order: PlacedOrder | null;
};

export type CartTotals = {
  count: number;
  subtotal: number;
  discount: number;
  bundle: number;
  afterBundle: number;
  coupon: number;
};

export type CouponError = "empty" | "bad" | "min";

export type CartZoneOption = {
  id: CartZone;
  label: string;
  description: string;
};

export type DeliveryZone = {
  id: DeliveryZoneId;
  name: string;
  areas: string;
  charge: number;
  days: string;
  icon: "truck" | "clock";
  active: boolean;
  sort: number;
};

export type PaymentMethod = {
  id: PaymentMethodId;
  title: string;
  description: string;
  mark: string;
  logo: "cod" | "bk" | "ng" | "cd";
  info: string;
  fee: boolean;
  tag?: string;
};

export type CheckoutStep = {
  label: string;
  state: "ok" | "on" | "todo";
};

export type OrderTimelineStep = {
  title: string;
  description: string;
  state: "done" | "now" | "todo";
};
