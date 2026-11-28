"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type WishlistButtonProps = { productName?: string; defaultSaved?: boolean; className?: string };

export function WishlistButton({ productName, defaultSaved = false, className }: WishlistButtonProps) {
  const [saved, setSaved] = useState(defaultSaved);

  const toggle = () => {
    setSaved(!saved);
    toast.success(saved ? "Removed from wishlist" : "Saved to wishlist", { description: productName });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      className={cn(
        "flex size-8.5 cursor-pointer items-center justify-center rounded-full border-0 bg-white/92 text-ink shadow-[0_2px_8px_rgba(34,21,16,0.15)] transition-[color,scale] duration-150 ease-[ease] hover:scale-[1.08]",
        saved && "text-brand",
        className,
      )}
    >
      <Icon name="heart" size={18} strokeWidth={2} className={cn(saved && "fill-brand")} />
    </button>
  );
}
