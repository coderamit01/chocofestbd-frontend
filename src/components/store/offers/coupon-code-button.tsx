import { cn } from "cn";

const BASE =
  "mt-2 flex h-[38px] items-center justify-between gap-2 rounded-[10px] border-[1.5px] border-(--cc) bg-white pr-1.5 pl-3 font-sans text-[13px] leading-none";

type CouponCodeButtonProps = {
  code: string;
  copied: boolean;
  onCopy: (code: string) => void;
};

export function CouponCodeButton({ code, copied, onCopy }: CouponCodeButtonProps) {
  return (
    <button
      type="button"
      aria-label={`Copy coupon code ${code}`}
      onClick={() => onCopy(code)}
      className={cn(BASE, "cursor-pointer border-dashed font-bold tracking-[0.06em] text-ink")}
    >
      {code}
      <span aria-hidden="true" className="rounded-[7px] bg-(--cc) px-[9px] py-1.5 text-[11px] tracking-normal text-white">
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}

export function CouponAutoBadge({ label }: { label: string }) {
  return <div className={cn(BASE, "border-solid font-medium text-[#5f5450]")}>{label}</div>;
}
