import type { ReactNode } from "react";
import { cn } from "cn";

type SummaryRowProps = {
  label: ReactNode;
  value: ReactNode;
  saving?: boolean;
  free?: boolean;
};

export function SummaryRow({ label, value, saving, free }: SummaryRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2.5 text-sm", saving ? "text-[#1f8a4c]" : "text-ink-2")}>
      <span>{label}</span>
      <b className={cn("font-semibold", saving || free ? "text-[#1f8a4c]" : "text-ink", free && "font-bold")}>
        {value}
      </b>
    </div>
  );
}

export function SummaryTotal({ total }: { total: string }) {
  return (
    <div className="flex items-end justify-between border-t border-[#f0ebe6] pt-3.5">
      <span className="flex flex-col font-sans text-base leading-[1.2] font-semibold">
        Total
        <small className="text-[11.5px] font-normal text-[#8a7f79]">VAT included</small>
      </span>
      <b className="font-heading text-[28px] leading-none font-extrabold">{total}</b>
    </div>
  );
}

export function SummaryCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 rounded-[22px] border border-[#f0ebe6] bg-white p-[22px] shadow-[0_20px_40px_-30px_rgba(61,17,4,0.35)] max-[900px]:p-[18px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SummaryTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h2 className={cn("m-0 font-heading text-xl leading-[1.2] font-bold", className)}>{children}</h2>;
}
