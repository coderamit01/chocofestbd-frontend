import { CartBackLink } from "@/components/store/cart/cart-back-link";
import { CheckoutSteps } from "@/components/store/cart/checkout-steps";
import { pluralItems } from "@/lib/store-cart";

export function CartHeading({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5 pt-[26px] pb-5 max-[900px]:gap-3 max-[900px]:pt-4 max-[900px]:pb-3">
      <div>
        <h1 className="mt-0 mb-1.5 font-heading text-[34px] leading-[1.1] font-bold tracking-[-0.02em] text-ink max-[900px]:text-2xl">
          Your cart{" "}
          <span className="font-sans text-lg font-medium text-[#8a7f79] max-[900px]:text-sm">
            ({pluralItems(count)})
          </span>
        </h1>
        <CartBackLink href="/shop" label="Continue shopping" />
      </div>
      <CheckoutSteps current={0} />
    </div>
  );
}
