import { cn } from "cn";
import type { OrderFilter } from "@/types/store-order";

type OrderFilterTabsProps = {
  filters: OrderFilter[];
  active: number;
  onChange: (index: number) => void;
};

export function OrderFilterTabs({ filters, active, onChange }: OrderFilterTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter orders"
      className="flex flex-wrap gap-1.5 max-[900px]:w-full max-[900px]:flex-nowrap max-[900px]:overflow-x-auto max-[900px]:pb-1"
    >
      {filters.map((filter, index) => (
        <button
          key={filter.label}
          type="button"
          aria-pressed={index === active}
          onClick={() => onChange(index)}
          className={cn(
            "h-[38px] rounded-full border border-[#e7e0da] bg-white px-4 font-sans text-[13.5px] leading-none font-medium text-ink-2 transition-all duration-150 hover:border-brand hover:text-brand-text max-[900px]:flex-none",
            index === active && "border-choco bg-choco text-white hover:border-choco hover:text-white",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
