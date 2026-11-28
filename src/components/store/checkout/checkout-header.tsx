import { CartBackLink } from "@/components/store/cart/cart-back-link";
import { CheckoutSteps } from "@/components/store/cart/checkout-steps";

export function CheckoutHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-[22px] pb-[18px] max-[900px]:py-3">
      <CartBackLink href="/cart" label="Back to cart" />
      <CheckoutSteps current={1} className="max-[900px]:order-first" />
    </div>
  );
}
