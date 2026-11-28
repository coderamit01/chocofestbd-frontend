"use client";

import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import { formatTaka } from "@/lib/utils";
import { ProductQuantity } from "./product-quantity";
import { useProductDetail } from "./product-detail-provider";

export function ProductBuyRow({ price }: { price: number }) {
  const { quantity, addToCart } = useProductDetail();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-2.5 pt-1 max-[900px]:hidden">
      <ProductQuantity />
      <StoreButton onClick={addToCart} className="h-[54px] text-[15px]">
        <Icon name="cart" size={18} strokeWidth={1.8} />
        Add to cart · {formatTaka(price * quantity)}
      </StoreButton>
      <StoreButton href="/checkout" className="h-[54px] bg-choco bg-none px-7 shadow-none hover:bg-ink">
        Buy now
      </StoreButton>
    </div>
  );
}
