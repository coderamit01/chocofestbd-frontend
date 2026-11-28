import { cn } from "cn";
import { ChoiceOption } from "@/components/store/checkout/choice-option";
import { PAYMENT_METHODS } from "@/config/store-checkout";
import type { PaymentMethod, PaymentMethodId } from "@/types/store-cart";

const LOGOS: Record<PaymentMethod["logo"], string> = {
  cod: "bg-[#1f8a4c] text-[11px]",
  bk: "bg-[#e2136e] text-xl",
  ng: "bg-[#f6921e] text-xl",
  cd: "bg-[#1a1f71] text-lg",
};

type PaymentMethodsProps = {
  value: PaymentMethodId;
  onChange: (method: PaymentMethodId) => void;
};

export function PaymentMethods({ value, onChange }: PaymentMethodsProps) {
  return (
    <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-2.5">
      {PAYMENT_METHODS.map((method) => {
        const selected = method.id === value;
        return (
          <div key={method.id} className={cn("rounded-2xl", selected && "shadow-[0_0_0_3px_rgba(238,86,21,0.1)]")}>
            <ChoiceOption
              selected={selected}
              title={method.title}
              description={method.description}
              onSelect={() => onChange(method.id)}
              className={cn(selected && "rounded-t-2xl rounded-b-none")}
              leading={
                <span
                  className={cn(
                    "flex size-[42px] flex-none items-center justify-center rounded-[12px] font-heading text-[13px] leading-none font-extrabold text-white max-[900px]:size-9",
                    LOGOS[method.logo],
                  )}
                >
                  {method.mark}
                </span>
              }
              trailing={
                method.tag && (
                  <span className="rounded-full bg-choco px-[9px] py-[5px] font-sans text-[11px] leading-none font-semibold whitespace-nowrap text-white max-[900px]:hidden">
                    {method.tag}
                  </span>
                )
              }
            />
            {selected && method.info && (
              <div className="rounded-b-2xl border-[1.5px] border-t-0 border-brand bg-[#fffaf6] pt-3 pr-4 pb-3.5 pl-[52px] text-[13px] leading-[1.55] text-ink-2 max-[900px]:pt-2.5 max-[900px]:pr-3 max-[900px]:pb-3 max-[900px]:pl-11 max-[900px]:text-[12.5px]">
                {method.info}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
