"use client";

import { cn } from "cn";
import { QuantityStepper } from "@/components/store/ui/quantity-stepper";
import { PRODUCT_MAX_QUANTITY } from "@/config/store-product-detail";
import { useProductDetail } from "./product-detail-provider";

const COMPACT =
  "hidden h-[38px] flex-none rounded-full border border-[#e7e0da] px-[3px] max-[900px]:flex [&_b]:min-w-[26px] [&_b]:text-sm [&_button]:size-[30px] [&_button]:rounded-full [&_button:last-child]:bg-brand [&_button:last-child]:text-white";

export function ProductQuantity({ compact = false }: { compact?: boolean }) {
  const { quantity, setQuantity } = useProductDetail();

  return (
    <QuantityStepper
      value={quantity}
      onChange={setQuantity}
      max={PRODUCT_MAX_QUANTITY}
      size="lg"
      className={cn(compact && COMPACT)}
    />
  );
}
