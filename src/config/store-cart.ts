import type { CartState, CartZoneOption, CouponError } from "@/types/store-cart";

export const CART_STORAGE_KEY = "chocofest-cart";

export const CART_MAX_QUANTITY = 20;

export const FREE_DELIVERY_MIN = 2000;

export const CART_DELIVERY_FEES = { dhaka: 80, out: 130 };

export const BUNDLE_MIN_ITEMS = 3;

export const BUNDLE_RATE = 0.05;

export const GIFT_FEE = 60;

export const GIFT_NOTE_MAX = 150;

export const COUPON = {
  code: "CHOCO10",
  rate: 0.1,
  max: 300,
  minSubtotal: 1500,
};

export const COUPON_ERRORS: Record<CouponError, string> = {
  min: "CHOCO10 needs a subtotal of ৳1,500 or more",
  empty: "Enter a coupon code",
  bad: "That code isn’t valid. Check the spelling and try again",
};

export const CART_ZONES: CartZoneOption[] = [
  {
    id: "dhaka",
    label: "Inside Dhaka",
    description: "Same day · order before 4 PM",
  },
  { id: "out", label: "Outside Dhaka", description: "1–3 days by courier" },
];

export const UPSELL_PRODUCT_IDS = [5, 8, 13, 10];

export const EMPTY_CART_PICK_IDS = [1, 2, 6, 3];

export const ACCEPTED_PAYMENT_MARKS = [
  { label: "COD", className: "text-[#1f8a4c]" },
  { label: "bKash", className: "text-[#e2136e]" },
  { label: "Nagad", className: "text-[#f6921e]" },
  { label: "VISA", className: "text-[#1a1f71] italic" },
  { label: "MC", className: "text-[#eb001b]" },
];

export const INITIAL_CART_STATE: CartState = {
  items: [
    { productId: 1, quantity: 2 },
    { productId: 9, quantity: 1 },
    { productId: 3, quantity: 1 },
  ],
  saved: [14],
  removed: null,
  zone: "dhaka",
  couponCode: "",
  gift: false,
  giftNote: "Happy birthday Ammu! Love, Rafi",
  order: null,
};
