"use client";

import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import { useProductDetail } from "./product-detail-provider";

type ActionToggleProps = {
  icon: IconName;
  on: boolean;
  label: string;
  onClick: () => void;
};

function ActionToggle({ icon, on, label, onClick }: ActionToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 cursor-pointer items-center gap-[7px] rounded-full border border-[#ece4de] bg-white px-3.5 font-sans text-[13px] leading-none font-medium text-[#3f3531] transition-[background-color,color,border-color] duration-150 hover:border-[#ffd0b5] hover:text-brand-text focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand/35",
        on && "border-brand bg-brand-50 text-brand-text hover:border-brand [&_svg]:fill-current",
      )}
    >
      <Icon name={icon} size={16} strokeWidth={1.8} />
      {label}
    </button>
  );
}

export function ProductActionToggles() {
  const { compared, toggleCompare, wished, toggleWish } = useProductDetail();

  return (
    <span className="flex gap-2">
      <ActionToggle
        icon="compare"
        on={compared}
        label={compared ? "Added to compare" : "Compare"}
        onClick={toggleCompare}
      />
      <ActionToggle icon="heart" on={wished} label={wished ? "In wishlist" : "Wishlist"} onClick={toggleWish} />
    </span>
  );
}
