import {
  BUNDLE_MIN_ITEMS,
  BUNDLE_RATE,
  COUPON,
  CART_DELIVERY_FEES,
  FREE_DELIVERY_MIN,
  GIFT_FEE,
} from "@/config/store-cart";
import {
  CARD_FEE_RATE,
  DELIVERY_ZONES,
  DHAKA_CITY_DISTRICT,
  DHAKA_SUBURB_DISTRICTS,
  DISTRICT_AREAS,
  PAYMENT_METHODS,
} from "@/config/store-checkout";
import { STORE_PRODUCTS } from "@/config/store-products";
import { formatTaka } from "@/lib/utils";
import type {
  CartItem,
  CartLine,
  CartTotals,
  CartZone,
  CouponError,
  DeliveryZone,
  DeliveryZoneId,
  PaymentMethodId,
} from "@/types/store-cart";
import type { StoreProduct } from "@/types/store-product";

export const findProduct = (id: number) => STORE_PRODUCTS.find((product) => product.id === id);

export const productsByIds = (ids: number[]) =>
  ids.map(findProduct).filter((product): product is StoreProduct => Boolean(product));

export const toCartLines = (items: CartItem[]): CartLine[] =>
  items.flatMap(({ productId, quantity }) => {
    const product = findProduct(productId);
    return product ? [{ product, quantity }] : [];
  });

export const lineTotal = ({ product, quantity }: CartLine) => product.price * quantity;

export const lineSaving = ({ product, quantity }: CartLine) =>
  product.oldPrice ? (product.oldPrice - product.price) * quantity : 0;

export const couponAmount = (afterBundle: number) => Math.min(COUPON.max, Math.round(afterBundle * COUPON.rate));

export function cartTotals(lines: CartLine[], couponCode: string): CartTotals {
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce(
    (sum, { product, quantity }) => sum + (product.oldPrice || product.price) * quantity,
    0,
  );
  const net = lines.reduce((sum, line) => sum + lineTotal(line), 0);
  const bundle = count >= BUNDLE_MIN_ITEMS ? Math.round(net * BUNDLE_RATE) : 0;
  const afterBundle = net - bundle;
  return {
    count,
    subtotal,
    discount: subtotal - net,
    bundle,
    afterBundle,
    coupon: couponCode === COUPON.code ? couponAmount(afterBundle) : 0,
  };
}

export const cartZoneFee = (zone: CartZone, afterBundle: number) =>
  zone === "dhaka" && afterBundle >= FREE_DELIVERY_MIN ? 0 : CART_DELIVERY_FEES[zone];

export function couponError(input: string, afterBundle: number): CouponError | null {
  const code = input.trim().toUpperCase();
  if (!code) return "empty";
  if (code !== COUPON.code) return "bad";
  if (afterBundle < COUPON.minSubtotal) return "min";
  return null;
}

export function freeDeliveryMessage(zone: CartZone, left: number) {
  if (zone !== "dhaka") return "Free delivery is available inside Dhaka on orders over ৳2,000";
  return left ? `Add ${formatTaka(left)} more for FREE delivery in Dhaka` : "Nice! Your order ships FREE inside Dhaka";
}

export const activeDeliveryZones = () => DELIVERY_ZONES.filter((zone) => zone.active).sort((a, b) => a.sort - b.sort);

export function suggestedZoneId(district: string): DeliveryZoneId {
  if (district === DHAKA_CITY_DISTRICT) return "in";
  if (DHAKA_SUBURB_DISTRICTS.includes(district)) return "sub";
  return district ? "out" : "in";
}

export function resolveDeliveryZone(district: string, override: DeliveryZoneId | null): DeliveryZone {
  const zones = activeDeliveryZones();
  return (
    zones.find((zone) => zone.id === override) ??
    zones.find((zone) => zone.id === suggestedZoneId(district)) ??
    zones[0]
  );
}

export const findPaymentMethod = (id: PaymentMethodId) =>
  PAYMENT_METHODS.find((method) => method.id === id) ?? PAYMENT_METHODS[0];

export const districtAreas = (district: string) =>
  DISTRICT_AREAS[district] ?? (district ? [`${district} Sadar`, `${district} City`, "Other area"] : []);

export const deliveryEta = (zone: DeliveryZone) => (zone.days === "Same day" ? "today" : `in ${zone.days}`);

export const cardFee = (base: number) => Math.round(base * CARD_FEE_RATE);

export const formatPhone = (phone: string) => (phone ? `${phone.slice(0, 5)}-${phone.slice(5)}` : "");

export const firstName = (name: string) => (name || "friend").trim().split(" ")[0];

export const pluralItems = (count: number) => `${count} item${count === 1 ? "" : "s"}`;

export function checkoutTotals(
  lines: CartLine[],
  couponCode: string,
  gift: boolean,
  zone: DeliveryZone,
  payment: PaymentMethodId,
) {
  const totals = cartTotals(lines, "");
  const coupon = couponCode ? couponAmount(totals.afterBundle) : 0;
  const base = totals.afterBundle - coupon + zone.charge;
  const paymentFee = findPaymentMethod(payment).fee ? cardFee(base) : 0;
  return {
    ...totals,
    coupon,
    discountAll: totals.subtotal - totals.afterBundle + coupon,
    shipping: zone.charge,
    giftFee: gift ? GIFT_FEE : 0,
    paymentFee,
    total: base + (gift ? GIFT_FEE : 0) + paymentFee,
  };
}

export function cartSummary(lines: CartLine[], zone: CartZone, couponCode: string, gift: boolean) {
  const totals = cartTotals(lines, couponCode);
  const shipping = cartZoneFee(zone, totals.afterBundle);
  const freeShippingSaving = shipping === 0 && zone === "dhaka" ? CART_DELIVERY_FEES.dhaka : 0;
  return {
    ...totals,
    shipping,
    giftFee: gift ? GIFT_FEE : 0,
    total: totals.afterBundle - totals.coupon + shipping + (gift ? GIFT_FEE : 0),
    left: Math.max(0, FREE_DELIVERY_MIN - totals.afterBundle),
    progress: Math.min(100, (totals.afterBundle / FREE_DELIVERY_MIN) * 100),
    savings: totals.discount + totals.bundle + totals.coupon,
    savingsShown: totals.discount + totals.bundle + totals.coupon + freeShippingSaving,
  };
}

export type CartSummaryTotals = ReturnType<typeof cartSummary>;

export type CheckoutTotals = ReturnType<typeof checkoutTotals>;
