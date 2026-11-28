"use client";

import { useState } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type WishlistButtonProps = { defaultSaved?: boolean; className?: string };

export function WishlistButton({ defaultSaved = false, className }: WishlistButtonProps) {
  const [saved, setSaved] = useState(defaultSaved);

  return (
    <button
      type="button"
      onClick={() => setSaved((value) => !value)}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
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
