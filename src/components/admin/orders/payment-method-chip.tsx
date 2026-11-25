import { PAYMENT_METHODS } from "@/config/orders";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types/order";

type PaymentMethodChipProps = {
  method: PaymentMethod;
  size?: "sm" | "md";
  className?: string;
};

export function PaymentMethodChip({ method, size = "sm", className }: PaymentMethodChipProps) {
  const { short, color } = PAYMENT_METHODS[method];

  return (
    <span
      className={cn(
        "inline-flex items-center font-sans leading-none font-semibold whitespace-nowrap text-white",
        size === "md" ? "h-6 rounded-[7px] px-[9px] text-[11.5px]" : "h-[22px] rounded-[6px] px-2 text-[11px]",
        className
      )}
      style={{ background: color }}
    >
      {short}
    </span>
  );
}
