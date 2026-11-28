"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { CartGift } from "@/components/store/cart/cart-gift";
import { CartHeading } from "@/components/store/cart/cart-heading";
import { CartItemsBox } from "@/components/store/cart/cart-items-box";
import { CartStickyBar } from "@/components/store/cart/cart-sticky-bar";
import { CartSummary } from "@/components/store/cart/cart-summary";
import { CartUpsell } from "@/components/store/cart/cart-upsell";
import { FreeDeliveryBar } from "@/components/store/cart/free-delivery-bar";
import { SavedForLater } from "@/components/store/cart/saved-for-later";
import { COUPON, COUPON_ERRORS, UPSELL_PRODUCT_IDS } from "@/config/store-cart";
import { cartActions, useStoreCart } from "@/hooks/use-store-cart";
import {
  cartSummary,
  couponError,
  findProduct,
  freeDeliveryMessage,
  productsByIds,
  toCartLines,
} from "@/lib/store-cart";
import type { CouponError } from "@/types/store-cart";

export function CartView({ empty }: { empty: ReactNode }) {
  const cart = useStoreCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponFailure, setCouponFailure] = useState<CouponError | null>(null);

  const lines = toCartLines(cart.items);
  const summary = cartSummary(lines, cart.zone, cart.couponCode, cart.gift);
  const inCart = (id: number) => cart.items.some((item) => item.productId === id);
  const upsell = productsByIds(UPSELL_PRODUCT_IDS.filter((id) => !inCart(id)));
  const saved = productsByIds(cart.saved);

  const applyCoupon = (input: string) => {
    const failure = couponError(input, summary.afterBundle);
    setCouponFailure(failure);
    if (failure) return;
    cartActions.applyCoupon(COUPON.code);
    setCouponInput("");
    toast.success("Coupon applied", { description: "CHOCO10 · 10% off" });
  };

  const changeQuantity = (productId: number, quantity: number) =>
    quantity < 1 ? cartActions.remove(productId) : cartActions.setQuantity(productId, quantity);

  const saveForLater = (productId: number) => {
    cartActions.saveForLater(productId);
    toast.success("Saved for later", {
      description: findProduct(productId)?.name,
    });
  };

  if (!lines.length) {
    return (
      <>
        <CartHeading count={0} />
        {empty}
      </>
    );
  }

  return (
    <>
      <CartHeading count={summary.count} />
      <div className="grid grid-cols-[minmax(0,1fr)_380px] items-start gap-6 max-[1180px]:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-4">
          <FreeDeliveryBar
            message={freeDeliveryMessage(cart.zone, summary.left)}
            progress={summary.progress}
            done={!summary.left}
            showLink={cart.zone === "dhaka" && summary.left > 0}
          />
          <CartItemsBox
            lines={lines}
            removedName={cart.removed ? findProduct(cart.removed.productId)?.name : undefined}
            onQuantity={changeQuantity}
            onRemove={cartActions.remove}
            onSave={saveForLater}
            onUndo={cartActions.undoRemove}
          />
          <CartGift
            gift={cart.gift}
            note={cart.giftNote}
            onToggle={() => cartActions.setGift(!cart.gift)}
            onNote={cartActions.setGiftNote}
          />
          {saved.length > 0 && <SavedForLater products={saved} onMove={cartActions.moveToCart} />}
          {upsell.length > 0 && (
            <CartUpsell
              products={upsell}
              onAdd={(product) => {
                cartActions.add(product.id);
                toast.success("Added to cart", { description: product.name });
              }}
            />
          )}
        </div>
        <aside className="sticky top-4 flex flex-col gap-3 max-[1180px]:static">
          <CartSummary
            summary={summary}
            zone={cart.zone}
            couponCode={cart.couponCode}
            gift={cart.gift}
            couponInput={couponInput}
            couponError={couponFailure ? COUPON_ERRORS[couponFailure] : undefined}
            onZone={cartActions.setZone}
            onCouponInput={(value) => {
              setCouponInput(value);
              setCouponFailure(null);
            }}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={cartActions.removeCoupon}
          />
        </aside>
      </div>
      <CartStickyBar count={summary.count} total={summary.total} />
    </>
  );
}
