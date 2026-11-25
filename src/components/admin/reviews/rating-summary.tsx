import { RATING_BAR_COLORS, STAR_COLOR } from "@/config/reviews";
import { stars } from "@/lib/customer-display";
import type { ReviewSummary } from "@/types/review";

export function RatingSummary({ summary }: { summary: ReviewSummary }) {
  const top = Math.max(1, ...summary.breakdown.map((row) => row.count));

  return (
    <section aria-labelledby="rs" className="max-w-95 min-w-0 flex-[1_1_300px] rounded-xl bg-card px-6 py-5.5 max-[900px]:max-w-none max-[900px]:p-4.5">
      <div className="mb-4.5 flex items-center justify-between gap-3">
        <h3 id="rs" className="font-heading text-heading text-ink">
          Rating summary
        </h3>
      </div>
      <div className="mb-5 flex items-center gap-4">
        <span className="font-heading text-[48px] leading-none font-semibold">{summary.averageRating.toFixed(1)}</span>
        <span className="flex flex-col gap-1">
          <span className="text-lg tracking-[2px]" style={{ color: STAR_COLOR }} aria-label={`${summary.averageRating.toFixed(1)} out of 5`}>
            {stars(Math.round(summary.averageRating))}
          </span>
          <span className="text-caption text-ink-3">from {summary.approvedCount.toLocaleString("en-IN")} approved reviews</span>
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {summary.breakdown.map((row) => (
          <div key={row.rating} className="flex items-center gap-2.5 text-[13.5px]">
            <span className="w-7">{row.rating}★</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${((row.count / top) * 100).toFixed(0)}%`,
                  background: row.rating >= 4 ? RATING_BAR_COLORS.high : row.rating === 3 ? RATING_BAR_COLORS.mid : RATING_BAR_COLORS.low,
                }}
              />
            </div>
            <span className="w-12 text-right text-ink-2 tabular-nums">{row.count.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
