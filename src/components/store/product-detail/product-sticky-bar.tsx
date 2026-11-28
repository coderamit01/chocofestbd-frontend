"use client";

import Link from "next/link";
import { MobileStickyBar } from "@/components/store/ui/mobile-sticky-bar";
import { useProductDetail } from "./product-detail-provider";

const ACTION =
  "flex h-[50px] flex-1 cursor-pointer items-center justify-center rounded-full font-sans text-[14.5px] leading-none font-semibold no-underline";

export function ProductStickyBar() {
  const { addToCart } = useProductDetail();

  return (
    <MobileStickyBar className="mx-0 gap-2.5 rounded-[22px] p-2.5">
      <button type="button" onClick={addToCart} className={`${ACTION} border-0 bg-[#fff1e8] text-brand-text`}>
        Add to Cart
      </button>
      <Link href="/checkout" className={`${ACTION} bg-choco text-white hover:text-white`}>
        Buy Now
      </Link>
    </MobileStickyBar>
  );
}
