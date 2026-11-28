import { STORE_PRODUCTS } from "@/config/store-products";
import type { TrackLine } from "@/types/store-order";

const ORDER_NUMBER_PATTERN = /^CF-?\d{6}$/;
const PHONE_PATTERN = /^01\d{9}$/;

export const normalizeOrderNumber = (value: string) => value.toUpperCase();

export const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 11);

export const isTrackable = (orderNumber: string, phone: string) =>
  ORDER_NUMBER_PATTERN.test(orderNumber.trim()) && PHONE_PATTERN.test(phone);

export const trackLineProducts = (lines: TrackLine[]) =>
  lines.flatMap(({ productId, quantity }) => {
    const product = STORE_PRODUCTS.find((item) => item.id === productId);
    return product ? [{ product, quantity }] : [];
  });
