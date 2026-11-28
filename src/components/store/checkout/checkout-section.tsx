import type { ReactNode } from "react";
import { cn } from "cn";
import { StoreCard } from "@/components/store/ui/store-card";

type CheckoutSectionProps = {
  step: number;
  title: string;
  description?: string;
  compact?: boolean;
  children: ReactNode;
};

export function CheckoutSection({ step, title, description, compact, children }: CheckoutSectionProps) {
  return (
    <StoreCard as="section" className={cn(compact && "p-5")}>
      <div className="mb-[18px] flex gap-3.5 max-[900px]:mb-3.5 max-[900px]:gap-2.5">
        <span className="flex size-8 flex-none items-center justify-center rounded-full bg-choco font-heading text-sm leading-none font-bold text-white max-[900px]:size-7 max-[900px]:text-[13px]">
          {step}
        </span>
        <div>
          <h2
            className={cn(
              "m-0 font-heading leading-[1.25] font-bold text-ink max-[900px]:text-[17px]",
              compact ? "text-lg" : "text-[19px]",
            )}
          >
            {title}
          </h2>
          {description && <p className="mt-[3px] mb-0 text-[13px] text-[#8a7f79]">{description}</p>}
        </div>
      </div>
      {children}
    </StoreCard>
  );
}
