"use client";

import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";

export function NotifyMeButton({ productName }: { productName: string }) {
  return (
    <button
      type="button"
      onClick={() => toast.success("We’ll tell you", { description: `SMS when ${productName} is back in stock` })}
      aria-label={`Notify me when ${productName} is back in stock`}
      className="mt-auto flex h-10.5 cursor-pointer items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-[#d6cdc6] bg-[#faf8f6] font-sans text-[13px] leading-none font-medium text-ink-2"
    >
      <Icon name="notifications" size={15} strokeWidth={1.8} />
      Notify me
    </button>
  );
}
