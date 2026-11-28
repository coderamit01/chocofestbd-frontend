"use client";

import { useState } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { StoreButton, storeButtonClass } from "@/components/store/ui/store-button";
import type { ListingFilterData, ListingSortLink } from "@/types/store-listing";
import { BottomSheet } from "./bottom-sheet";
import { FilterPanel } from "./filter-panel";
import { ListingNavButton } from "./listing-nav-button";

type MobileListingBarProps = {
  filters: ListingFilterData;
  sorts: ListingSortLink[];
  sortLabel: string;
  total: number;
};

const BAR_BUTTON =
  "flex h-full flex-1 cursor-pointer items-center justify-center gap-2 border-0 bg-transparent font-sans text-[13.5px] leading-none font-semibold text-ink [&_svg]:text-brand";

export function MobileListingBar({ filters, sorts, sortLabel, total }: MobileListingBarProps) {
  const [sheet, setSheet] = useState<"filter" | "sort" | null>(null);
  const close = () => setSheet(null);
  const activeCount = filters.chips.length;

  return (
    <>
      <div className="mt-3 hidden h-[46px] items-center max-[900px]:flex rounded-[12px] border border-[#efe8e3] bg-white">
        <button type="button" onClick={() => setSheet("filter")} className={BAR_BUTTON}>
          <Icon name="sliders" size={18} strokeWidth={1.8} />
          Filter
          {activeCount > 0 && (
            <b className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11.5px] font-semibold text-white">
              {activeCount}
            </b>
          )}
        </button>
        <span className="h-6 w-px bg-[#efe8e3]" />
        <button type="button" onClick={() => setSheet("sort")} className={BAR_BUTTON}>
          <Icon name="sort" size={18} strokeWidth={1.8} />
          {sortLabel}
        </button>
      </div>
      {sheet === "filter" && (
        <BottomSheet
          title="Filters"
          onClose={close}
          footer={
            <>
              <ListingNavButton href={filters.clearHref} className={storeButtonClass({ variant: "ghost" })}>
                Clear
              </ListingNavButton>
              <StoreButton onClick={close}>Show {total} products</StoreButton>
            </>
          }
        >
          <FilterPanel filters={filters} variant="sheet" />
        </BottomSheet>
      )}
      {sheet === "sort" && (
        <BottomSheet title="Sort by" onClose={close}>
          {sorts.map((sort) => (
            <ListingNavButton
              key={sort.value}
              href={sort.href}
              onNavigate={close}
              role="radio"
              aria-checked={sort.selected}
              className={cn(
                "flex min-h-[52px] w-full cursor-pointer items-center justify-between border-b border-[#f4efeb] bg-transparent px-1 text-left font-sans text-[15px] leading-none text-[#3f3531]",
                sort.selected ? "font-semibold text-ink" : "font-normal",
              )}
            >
              {sort.label}
              <span
                className={cn(
                  "size-[22px] rounded-full",
                  sort.selected ? "border-[7px] border-brand" : "border-2 border-[#d6cdc6]",
                )}
              />
            </ListingNavButton>
          ))}
        </BottomSheet>
      )}
    </>
  );
}
