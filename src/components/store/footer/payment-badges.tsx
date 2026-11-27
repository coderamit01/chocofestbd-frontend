import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { FooterPaymentMethod } from "@/types/store-footer";

type PaymentBadgesProps = { label: string; methods: FooterPaymentMethod[] };

export function PaymentBadges({ label, methods }: PaymentBadgesProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-[#9b908a]">{label}</span>
      <span className="flex max-w-[360px] flex-wrap gap-1.5">
        {methods.map((method) => (
          <span
            key={method.label}
            style={{ color: method.color }}
            className={cn(
              "inline-flex h-[26px] items-center gap-1 rounded-[7px] border border-[#ece5df] bg-white px-[9px] font-sans text-[11.5px] leading-none font-bold text-choco",
              method.italic && "italic",
            )}
          >
            {method.icon && <Icon name={method.icon} size={14} strokeWidth={1.8} />}
            {method.label}
          </span>
        ))}
      </span>
    </div>
  );
}
