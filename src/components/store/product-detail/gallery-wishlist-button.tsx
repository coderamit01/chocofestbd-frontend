"use client";

import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { useProductDetail } from "./product-detail-provider";

export function GalleryWishlistButton() {
  const { wished, toggleWish } = useProductDetail();

  return (
    <button
      type="button"
      aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
      onClick={toggleWish}
      className={cn(
        "absolute top-[18px] right-[18px] z-2 flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-[#8a7f79] shadow-[0_2px_8px_rgba(34,21,16,0.12)] transition-[color,scale] duration-150 hover:scale-[1.08] hover:text-brand focus-visible:shadow-focus",
        "max-[900px]:top-3.5 max-[900px]:right-3.5 max-[900px]:size-[42px]",
        wished && "text-brand",
      )}
    >
      <Icon name="heart" size={18} strokeWidth={2} className={cn(wished && "fill-brand")} />
    </button>
  );
}
