"use client";

import { useSyncExternalStore } from "react";
import { CART_MAX_QUANTITY, CART_STORAGE_KEY, INITIAL_CART_STATE } from "@/config/store-cart";
import type { CartState, CartZone, PlacedOrder } from "@/types/store-cart";

type Listener = () => void;

const listeners = new Set<Listener>();
let state: CartState = INITIAL_CART_STATE;
let loaded = false;

function readStorage(): CartState {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? { ...INITIAL_CART_STATE, ...(JSON.parse(raw) as Partial<CartState>) } : INITIAL_CART_STATE;
  } catch {
    return INITIAL_CART_STATE;
  }
}

function writeStorage(next: CartState) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  state = readStorage();
  loaded = true;
}

function update(change: (current: CartState) => Partial<CartState>) {
  ensureLoaded();
  state = { ...state, ...change(state) };
  writeStorage(state);
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== CART_STORAGE_KEY) return;
  state = readStorage();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

const getServerSnapshot = () => INITIAL_CART_STATE;

const clampQuantity = (quantity: number) => Math.min(CART_MAX_QUANTITY, quantity);

export const cartActions = {
  setQuantity: (productId: number, quantity: number) =>
    update(({ items }) => ({
      items: items.map((item) =>
        item.productId === productId ? { ...item, quantity: clampQuantity(quantity) } : item,
      ),
    })),
  add: (productId: number, quantity = 1) =>
    update(({ items }) => {
      const existing = items.find((item) => item.productId === productId);
      return {
        items: existing
          ? items.map((item) =>
              item.productId === productId ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
            )
          : [...items, { productId, quantity }],
      };
    }),
  remove: (productId: number) =>
    update(({ items }) => ({
      items: items.filter((item) => item.productId !== productId),
      removed: items.find((item) => item.productId === productId) ?? null,
    })),
  undoRemove: () =>
    update(({ items, removed }) => ({
      items: removed ? [...items, removed] : items,
      removed: null,
    })),
  saveForLater: (productId: number) =>
    update(({ items, saved }) => ({
      items: items.filter((item) => item.productId !== productId),
      saved: saved.includes(productId) ? saved : [...saved, productId],
    })),
  moveToCart: (productId: number) =>
    update(({ items, saved }) => ({
      saved: saved.filter((id) => id !== productId),
      items: items.some((item) => item.productId === productId) ? items : [...items, { productId, quantity: 1 }],
    })),
  setZone: (zone: CartZone) => update(() => ({ zone })),
  applyCoupon: (couponCode: string) => update(() => ({ couponCode })),
  removeCoupon: () => update(() => ({ couponCode: "" })),
  setGift: (gift: boolean) => update(() => ({ gift })),
  setGiftNote: (giftNote: string) => update(() => ({ giftNote })),
  placeOrder: (order: PlacedOrder) => update(() => ({ order })),
  settleOrder: () =>
    update(({ order }) =>
      order && !order.settled
        ? {
            order: { ...order, settled: true },
            items: [],
            couponCode: "",
            removed: null,
          }
        : {},
    ),
};

export function useStoreCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
