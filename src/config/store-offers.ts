import type { StoreCoupon } from "@/types/store-offers";

export const STORE_COUPONS: StoreCoupon[] = [
  { value: "10%", unit: "OFF", code: "CHOCO10", title: "Extra 10% off", description: "On orders over ৳1,500 · max ৳300", color: "#ee5615" },
  { value: "৳150", unit: "OFF", code: "FIRST150", title: "First order", description: "New customers · min ৳999", color: "#3d1104" },
  { value: "5%", unit: "BACK", title: "bKash cashback", description: "Pay with bKash · up to ৳100", color: "#e2136e" },
  { value: "FREE", unit: "SHIP", code: "FREESHIP", title: "Free delivery", description: "Inside Dhaka · orders over ৳2,000", color: "#1f8a4c" },
];

export const AUTO_COUPON_LABEL = "Auto-applied";

export const DEAL_PRODUCT_IDS = [1, 3, 5, 7, 9, 11, 13, 14, 16];
