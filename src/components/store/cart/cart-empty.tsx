import { Icon } from "@/components/shared/icon";
import { ProductGrid } from "@/components/store/ui/product-grid";
import { StoreButton } from "@/components/store/ui/store-button";
import { EMPTY_CART_PICK_IDS } from "@/config/store-cart";
import { productsByIds } from "@/lib/store-cart";

function EmptyCartArt() {
  return (
    <svg width="150" height="120" viewBox="0 0 150 120" aria-hidden="true">
      <ellipse cx="75" cy="110" rx="56" ry="7" fill="#efe7e1" />
      <path d="M34 40h82l-7 58a8 8 0 0 1-8 7H49a8 8 0 0 1-8-7z" fill="#fff" stroke="#3d1104" strokeWidth="3" />
      <path d="M56 40v-6a19 19 0 0 1 38 0v6" fill="none" stroke="#3d1104" strokeWidth="3" />
      <rect x="58" y="60" width="34" height="26" rx="4" fill="#ee5615" />
      <path d="M69 60v26M81 60v26M58 73h34" stroke="#c2410c" strokeWidth="2" />
    </svg>
  );
}

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center gap-2.5 px-5 pt-10 pb-5 text-center">
      <EmptyCartArt />
      <h2 className="mt-1.5 mb-0 font-heading text-[26px] leading-[1.2] font-bold text-ink">Your cart is empty</h2>
      <p className="mt-0 mb-2 max-w-[380px] text-ink-2">
        Looks like you haven’t added anything yet. Our best sellers are a good place to start.
      </p>
      <StoreButton href="/shop">
        Start shopping
        <Icon name="arrowRight" size={16} strokeWidth={1.8} />
      </StoreButton>
      <ProductGrid products={productsByIds(EMPTY_CART_PICK_IDS)} className="mt-7 w-full text-left" />
    </div>
  );
}
