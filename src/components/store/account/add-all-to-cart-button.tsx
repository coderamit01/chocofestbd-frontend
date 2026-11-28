"use client";

import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";

export function AddAllToCartButton() {
  return (
    <StoreButton
      className="h-[42px]"
      onClick={() => toast.success("Added to cart", { description: "All in-stock wishlist items" })}
    >
      <Icon name="cart" size={16} strokeWidth={1.8} />
      Add all to cart
    </StoreButton>
  );
}
