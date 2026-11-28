import { cn } from "cn";
import { ACCEPTED_PAYMENT_MARKS } from "@/config/store-cart";

export function AcceptedPayments() {
  return (
    <div className="flex items-center justify-between gap-2 text-xs text-[#8a7f79]">
      <span>We accept</span>
      <span className="flex gap-1">
        {ACCEPTED_PAYMENT_MARKS.map((mark) => (
          <i
            key={mark.label}
            className={cn(
              "inline-flex h-6 items-center justify-center rounded-[5px] border border-[#ece5df] bg-white px-1.5 font-sans text-[9.5px] leading-none font-bold not-italic",
              mark.className,
            )}
          >
            {mark.label}
          </i>
        ))}
      </span>
    </div>
  );
}
