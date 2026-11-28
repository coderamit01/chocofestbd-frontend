"use client";

import { cn } from "cn";
import { TextLink } from "@/components/store/ui/text-link";
import type { ListingFilterData, ListingFilterVariant } from "@/types/store-listing";
import { FilterGroup } from "./filter-group";
import { FilterOption } from "./filter-option";
import { PriceRange } from "./price-range";

type FilterPanelProps = {
  filters: ListingFilterData;
  variant: ListingFilterVariant;
};

export function FilterPanel({ filters, variant }: FilterPanelProps) {
  const sheet = variant === "sheet";
  const { price, groups, chips } = filters;
  const priceActive = price.min > 0 || price.max < price.limit;

  return (
    <div>
      {chips.length > 0 && (
        <div
          className={cn(
            "flex items-center justify-between border-b border-[#f0ebe6] bg-[#fff8f3] px-[18px] py-3 font-sans text-[13px]",
            sheet && "-mx-[18px]",
          )}
        >
          <b className="font-semibold text-ink">{filters.activeLabel}</b>
          <TextLink href={filters.clearHref} scroll={false}>
            Clear all
          </TextLink>
        </div>
      )}
      <FilterGroup
        title="Price range"
        note={priceActive ? "Custom" : undefined}
        variant={variant}
        bodyClassName={cn("block w-full", sheet ? "px-1 pt-1 pb-4" : "px-[18px] pt-1 pb-[18px]")}
      >
        <PriceRange price={price} />
      </FilterGroup>
      {groups.map((group) => {
        const selected = group.options.filter((option) => option.selected).length;
        return (
          <FilterGroup
            key={group.key}
            title={group.title}
            note={selected ? `${selected} selected` : undefined}
            defaultOpen={group.defaultOpen}
            variant={variant}
            bodyClassName={cn(
              "flex pb-3",
              sheet ? "flex-row flex-wrap gap-2" : "flex-col gap-0.5 px-2.5",
              group.scroll && !sheet && "max-h-[236px] overflow-y-auto",
            )}
          >
            {group.options.map((option) => (
              <FilterOption key={option.value} option={option} variant={variant} />
            ))}
          </FilterGroup>
        );
      })}
    </div>
  );
}
