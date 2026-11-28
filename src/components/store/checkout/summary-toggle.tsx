import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type SummaryToggleProps = {
  open: boolean;
  count: number;
  total: string;
  controls: string;
  onToggle: () => void;
};

export function SummaryToggle({ open, count, total, controls, onToggle }: SummaryToggleProps) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="-mx-3.5 mt-0 mb-3 hidden w-[calc(100%+28px)] cursor-pointer items-center justify-between border-x-0 border-y border-[#f0ebe6] bg-white p-3.5 font-sans text-sm leading-none font-semibold text-brand-text max-[900px]:flex"
    >
      <span className="flex items-center gap-2">
        <Icon name="cart" size={18} strokeWidth={1.8} />
        {open ? "Hide order summary" : `Show order summary (${count})`}
        <span className={cn("flex text-[#8a7f79] transition-transform duration-200", open && "rotate-180")}>
          <Icon name="chevronDown" size={16} strokeWidth={1.8} />
        </span>
      </span>
      <b className="font-heading text-lg leading-none font-extrabold text-ink">{total}</b>
    </button>
  );
}
