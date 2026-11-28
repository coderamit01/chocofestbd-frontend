import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { ListingFacetOption, ListingFilterVariant } from "@/types/store-listing";
import { ListingNavButton } from "./listing-nav-button";

type FilterOptionProps = {
  option: ListingFacetOption;
  variant: ListingFilterVariant;
};

export function FilterOption({ option, variant }: FilterOptionProps) {
  const sheet = variant === "sheet";

  return (
    <ListingNavButton
      href={option.href}
      role="checkbox"
      aria-checked={option.selected}
      className={cn(
        "flex min-h-10 cursor-pointer items-center gap-2.5 text-left font-sans text-[13.5px] leading-[1.2] font-normal text-[#3f3531] hover:bg-[#faf6f3]",
        sheet ? "rounded-full border border-[#e7e0da] bg-transparent px-3.5" : "rounded-[10px] border-0 bg-transparent px-2",
        option.selected && "font-medium text-ink",
        option.selected && sheet && "border-brand bg-brand-50 text-[#9a3412] hover:bg-brand-50",
        option.count === 0 && !option.selected && "opacity-45",
      )}
    >
      {!sheet && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-5 flex-none items-center justify-center rounded-[6px] border-[1.5px] border-[#d6cdc6] bg-white text-transparent transition-all duration-150",
            option.selected && "border-brand bg-brand text-white",
          )}
        >
          <Icon name="check" size={12} strokeWidth={3.2} />
        </span>
      )}
      <span className={sheet ? "flex-none" : "flex-1"}>{option.label}</span>
      <span className="text-[12px] text-[#a69b95]">{option.count}</span>
    </ListingNavButton>
  );
}
