"use client";

import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import { orderTrackHref } from "@/lib/store-account";
import type { CustomerOrder } from "@/types/store-order";

const ACTION_CLASS = "px-3.5 max-[900px]:flex-1";

export function OrderActions({ order }: { order: CustomerOrder }) {
  return (
    <div className="flex gap-2 max-[900px]:w-full">
      {order.tone === "live" && (
        <StoreButton href={orderTrackHref(order)} size="sm" className={ACTION_CLASS}>
          <Icon name="truck" size={15} strokeWidth={1.8} />
          Track
        </StoreButton>
      )}
      <StoreButton
        variant="ghost"
        size="sm"
        className={ACTION_CLASS}
        onClick={() => toast.success("Added to cart", { description: `${order.productIds.length} items from ${order.number}` })}
      >
        <Icon name="refresh" size={15} strokeWidth={1.8} />
        Buy again
      </StoreButton>
      {order.tone === "ok" && (
        <StoreButton
          variant="ghost"
          size="sm"
          className={ACTION_CLASS}
          onClick={() => toast.success("Thanks!", { description: "Review form opens here" })}
        >
          <Icon name="star" size={15} strokeWidth={1.8} />
          Review
        </StoreButton>
      )}
    </div>
  );
}
