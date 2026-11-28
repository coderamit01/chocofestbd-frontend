"use client";

import { SelectMenu } from "@/components/store/ui/select-menu";
import type { ListingSortKey, ListingSortLink } from "@/types/store-listing";
import { useListingNavigate } from "./use-listing-navigate";

type SortSelectProps = {
  sorts: ListingSortLink[];
};

export function SortSelect({ sorts }: SortSelectProps) {
  const { navigate } = useListingNavigate();
  const value = sorts.find((sort) => sort.selected)?.value ?? sorts[0].value;

  const handleChange = (next: ListingSortKey) => {
    const target = sorts.find((sort) => sort.value === next);
    if (target) navigate(target.href);
  };

  return (
    <div className="flex items-center gap-2 font-sans text-[13px] text-[#8a7f79]">
      <span>Sort by</span>
      <SelectMenu
        size="compact"
        ariaLabel="Sort products"
        options={sorts}
        value={value}
        onChange={handleChange}
        triggerClassName="min-w-[190px] bg-[#f8f6f4]"
      />
    </div>
  );
}
