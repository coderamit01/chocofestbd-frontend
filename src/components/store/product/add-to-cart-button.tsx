"use client";

import { useState, type ReactNode } from "react";
import { cn } from "cn";

type AddToCartButtonProps = {
  productName: string;
  icon?: ReactNode;
  className?: string;
  labelClassName?: string;
};

export function AddToCartButton({ productName, icon, className, labelClassName }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(0);
  const label = quantity ? `✓ In cart (${quantity})` : "Add To Cart";

  return (
    <button
      type="button"
      onClick={() => setQuantity((value) => value + 1)}
      aria-label={`${label}: ${productName}`}
      className={cn(
        "inline-flex h-9.5 cursor-pointer items-center justify-center gap-1.5 rounded-sm border-0 bg-brand px-2 font-sans text-[14px] leading-none font-semibold whitespace-nowrap text-white transition-[background-color] duration-150 ease-[ease] hover:bg-[#d9490d]",
        quantity > 0 && "cursor-default bg-[#e6f6ec] text-[#1f8a4c] hover:bg-[#e6f6ec]",
        className,
      )}
    >
      {icon}
      <span className={labelClassName}>{label}</span>
    </button>
  );
}
