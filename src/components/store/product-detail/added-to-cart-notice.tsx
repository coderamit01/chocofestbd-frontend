"use client";

import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import { TextLink } from "@/components/store/ui/text-link";
import { cartLine } from "@/lib/store-product-detail";
import type { ProductDetail } from "@/types/store-product-detail";
import { useProductDetail } from "./product-detail-provider";

export function AddedToCartNotice({ detail }: { detail: ProductDetail }) {
  const { added, quantity } = useProductDetail();
  if (!added) return null;

  return (
    <div
      role="status"
      className="flex animate-fade items-center gap-3 rounded-[14px] border border-[#bfe6cc] bg-[#e6f6ec] px-3.5 py-3"
    >
      <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-[#1f8a4c] text-white">
        <Icon name="check" size={16} strokeWidth={1.8} />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <b className="text-sm text-ink">Added to cart</b>
        <small className="text-xs text-[#3f6b50]">{cartLine(detail, quantity)}</small>
      </span>
      <TextLink href="/cart">View cart</TextLink>
      <StoreButton href="/checkout" size="sm" className="px-3.5">
        Checkout
      </StoreButton>
    </div>
  );
}
