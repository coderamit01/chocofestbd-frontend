import type { ReactNode } from "react";
import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";

type CouponFieldProps = {
  value: string;
  error?: ReactNode;
  onChange: (value: string) => void;
  onApply: () => void;
};

export function CouponField({ value, error, onChange, onApply }: CouponFieldProps) {
  return (
    <>
      <div className="flex gap-2">
        <input
          value={value}
          placeholder="Coupon code"
          aria-label="Coupon code"
          aria-invalid={Boolean(error) || undefined}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            onApply();
          }}
          className="h-[46px] min-w-0 flex-1 rounded-[12px] border-[1.5px] border-[#e7e0da] bg-surface-2 px-3.5 font-sans text-sm leading-none font-medium text-ink uppercase outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-ink-4 focus:border-brand focus:bg-white focus:shadow-focus"
        />
        <StoreButton variant="ghost" className="h-[46px] px-4" onClick={onApply}>
          Apply
        </StoreButton>
      </div>
      {error && (
        <span role="alert" className="flex items-center gap-1.5 text-[12.5px] text-[#d92d20]">
          <Icon name="alert" size={14} strokeWidth={1.8} />
          {error}
        </span>
      )}
    </>
  );
}
