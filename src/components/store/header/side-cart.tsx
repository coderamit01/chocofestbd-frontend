"use client";

import { Icon } from "@/components/shared/icon";
import { formatTaka } from "@/lib/utils";
import { useHeader } from "./header-provider";

export function SideCart() {
  const { count, subtotal, openPanel } = useHeader();
  const countText = `${count} ${count === 1 ? "item" : "items"}`;
  const subtotalText = formatTaka(subtotal);

  return (
    <button
      type="button"
      aria-label={`Open cart, ${countText}, ${subtotalText}`}
      onClick={() => openPanel("cart")}
      className="group fixed top-1/2 right-0 z-[46] flex w-[84px] -translate-y-1/2 flex-col overflow-hidden rounded-l-[14px] p-0 font-sans shadow-[0_14px_30px_-10px_rgba(61,17,4,0.45)] transition-[width,box-shadow] duration-200 hover:w-[92px] hover:shadow-[0_18px_36px_-10px_rgba(61,17,4,0.55)] focus-visible:shadow-[0_0_0_4px_rgba(238,86,21,0.35)] max-[900px]:hidden"
    >
      <span className="flex flex-col items-center gap-1 bg-[linear-gradient(180deg,#ff7a2f,#ee5615)] px-1.5 pt-3 pb-2.5 text-white">
        <Icon name="bag" size={30} strokeWidth={2} className="group-hover:animate-bag-wiggle" />
        <b className="text-[13.5px] leading-none font-bold whitespace-nowrap">{countText}</b>
      </span>
      <span className="block bg-choco px-1 py-[9px] text-center font-heading text-sm leading-none font-bold whitespace-nowrap text-white">
        {subtotalText}
      </span>
    </button>
  );
}
