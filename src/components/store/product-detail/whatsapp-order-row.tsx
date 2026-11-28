"use client";

import { Icon } from "@/components/shared/icon";
import { whatsappOrderHref } from "@/lib/store-product-detail";
import type { ProductDetail } from "@/types/store-product-detail";
import { useProductDetail } from "./product-detail-provider";

export function WhatsappOrderRow({ detail }: { detail: ProductDetail }) {
  const { quantity } = useProductDetail();

  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-[#d7f0e0] bg-[#f2faf5] py-2 pr-2 pl-3.5">
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 font-sans text-[12.5px] leading-[1.3] text-ink-2">
        <b className="font-sans text-[13.5px] leading-[1.2] font-semibold text-ink">Prefer to chat?</b>
        Order directly on WhatsApp
      </span>
      <a
        href={whatsappOrderHref(detail, quantity)}
        target="_blank"
        rel="noopener"
        className="inline-flex h-[38px] flex-none items-center gap-[7px] rounded-full bg-[#1fa855] px-4 font-sans text-[13px] leading-none font-semibold text-white no-underline transition-[background-color] duration-150 hover:bg-[#178a45] hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(31,168,85,0.35)]"
      >
        <Icon name="whatsappSolid" size={16} fill="currentColor" stroke="none" />
        Order now
      </a>
    </div>
  );
}
