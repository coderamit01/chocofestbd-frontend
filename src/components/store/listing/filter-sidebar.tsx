import { Icon } from "@/components/shared/icon";
import type { ListingFilterData } from "@/types/store-listing";
import { FilterPanel } from "./filter-panel";

export function FilterSidebar({ filters }: { filters: ListingFilterData }) {
  return (
    <aside
      aria-label="Filters"
      className="sticky top-4 overflow-hidden rounded-[20px] border border-[#f0ebe6] bg-white max-[900px]:hidden"
    >
      <div className="border-b border-[#f0ebe6] px-[18px] py-4">
        <b className="flex items-center gap-2 font-heading text-[16px] leading-none font-bold text-ink">
          <Icon name="sliders" size={18} strokeWidth={1.8} />
          Filters
        </b>
      </div>
      <FilterPanel filters={filters} variant="side" />
    </aside>
  );
}
