"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { cn } from "cn";
import { cartActions } from "@/hooks/use-store-cart";
import { formatTaka } from "@/lib/utils";

type AddToCartButtonProps = {
  productId?: number;
  productName: string;
  price?: number;
  icon?: ReactNode;
  className?: string;
  labelClassName?: string;
};

export function AddToCartButton({ productId, productName, price, icon, className, labelClassName }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(0);
  const label = quantity ? `✓ In cart (${quantity})` : "Add To Cart";

  const add = () => {
    setQuantity(quantity + 1);
    if (productId !== undefined) cartActions.add(productId);
    toast.success(quantity ? "Added one more" : "Added to cart", {
      description: price === undefined ? productName : `${productName} · ${formatTaka(price)}`,
    });
  };

  return (
    <button
      type="button"
      onClick={add}
      aria-label={`${label}: ${productName}`}
      className={cn(
        "inline-flex h-9.5 cursor-pointer items-center justify-center gap-1.5 rounded-sm border-0 bg-brand px-2 font-sans text-[14px] leading-none font-semibold whitespace-nowrap text-white transition-[background-color] duration-150 ease-[ease] hover:bg-[#d9490d]",
        quantity > 0 && "bg-[#e6f6ec] text-[#1f8a4c] hover:bg-[#e6f6ec]",
        className,
      )}
    >
      {icon}
      <span className={labelClassName}>{label}</span>
    </button>
  );
}
