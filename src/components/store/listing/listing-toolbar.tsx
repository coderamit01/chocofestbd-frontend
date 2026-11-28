import type { ListingSortLink, ListingView } from "@/types/store-listing";
import { SortSelect } from "./sort-select";
import { ViewToggle } from "./view-toggle";

type ListingToolbarProps = {
  total: number;
  query: string;
  sorts: ListingSortLink[];
  view: ListingView;
  views: Record<ListingView, string>;
};

export function ListingToolbar({ total, query, sorts, view, views }: ListingToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] border border-[#f0ebe6] bg-white py-2 pr-2 pl-4 max-[900px]:border-0 max-[900px]:bg-transparent max-[900px]:p-0">
      <p className="m-0 font-sans text-[14px] text-ink-2">
        <b className="font-semibold text-ink">{total}</b> products{query && ` for “${query}”`}
      </p>
      <div className="flex items-center gap-2 max-[900px]:hidden">
        <SortSelect sorts={sorts} />
        <ViewToggle view={view} hrefs={views} />
      </div>
    </div>
  );
}
