import { cn } from "cn";
import { REVIEW_TAGS } from "@/config/store-product-detail";
import type { RatingBar } from "@/types/store-product-detail";

type RatingSummaryProps = {
  rating: number;
  reviewCount: number;
  bars: RatingBar[];
  filter: number;
  onFilter: (stars: number) => void;
};

export function RatingSummary({ rating, reviewCount, bars, filter, onFilter }: RatingSummaryProps) {
  return (
    <div className="grid grid-cols-[200px_1fr_300px] items-center gap-7 border-b border-[#f0ebe6] py-[18px] max-[1180px]:grid-cols-[160px_1fr] max-[900px]:grid-cols-1 max-[900px]:gap-3.5">
      <div className="flex flex-col gap-1 max-[900px]:flex-row max-[900px]:items-center max-[900px]:gap-2.5">
        <b className="font-heading text-[52px] leading-none font-extrabold text-ink max-[900px]:text-[40px]">
          {rating}
        </b>
        <span className="text-[18px] text-[#f5a524]" aria-hidden="true">
          {"★".repeat(Math.round(rating))}
        </span>
        <span className="text-[12.5px] text-[#8a7f79]">{reviewCount} verified reviews</span>
      </div>
      <div className="flex flex-col gap-1">
        {bars.map((bar) => (
          <button
            key={bar.stars}
            type="button"
            aria-pressed={filter === bar.stars}
            onClick={() => onFilter(filter === bar.stars ? 0 : bar.stars)}
            className={cn(
              "grid cursor-pointer grid-cols-[30px_1fr_36px] items-center gap-2.5 rounded-lg border-0 bg-transparent px-2 py-1 text-[13px] text-ink-2 hover:bg-brand-50 focus-visible:shadow-focus",
              filter === bar.stars && "bg-brand-50 font-semibold text-brand-text",
            )}
          >
            <span>{bar.stars}★</span>
            <span className="h-2 overflow-hidden rounded-[9px] bg-[#f0ebe6]">
              <i
                className="block h-full rounded-[9px] bg-[#f5a524]"
                style={{ width: `${reviewCount ? (bar.count / reviewCount) * 100 : 0}%` }}
              />
            </span>
            <span>{bar.count}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 max-[1180px]:col-span-full">
        <b className="text-[13.5px] text-ink">Customers mention</b>
        <div className="flex flex-wrap items-center gap-1.5">
          {REVIEW_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#f0ebe6] bg-[#faf7f5] px-[11px] py-[7px] text-[12.5px] text-[#3f3531]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
