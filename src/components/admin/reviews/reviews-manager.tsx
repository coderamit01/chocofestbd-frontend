"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteReviewAction, setReviewStatusAction } from "@/actions/review.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SelectMenu } from "@/components/shared/select-menu";
import { Button } from "@/components/ui/button";
import { REVIEW_RATING_OPTIONS, REVIEW_TABS } from "@/config/reviews";
import { filterStyles } from "@/lib/filter-styles";
import { reviewCountLabel } from "@/lib/review";
import { reviewsQueryParams } from "@/lib/review-query";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { AdminReview, ReviewsQuery, ReviewSummary } from "@/types/review";
import type { ReviewStatus } from "@/types/status";
import { ReviewCard } from "./review-card";

type ReviewsManagerProps = {
  reviews: AdminReview[];
  meta?: PaginationMeta;
  summary: ReviewSummary;
  query: ReviewsQuery;
  now: number;
  canDelete: boolean;
};

export function ReviewsManager({ reviews, meta, summary, query, now, canDelete }: ReviewsManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startNavigating] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<AdminReview | null>(null);

  const visibleSelected = reviews.filter((review) => selected.has(review.id)).map((review) => review.id);
  const allOn = reviews.length > 0 && reviews.every((review) => selected.has(review.id));

  const navigate = (next: Partial<ReviewsQuery>) => {
    const params = new URLSearchParams(reviewsQueryParams({ ...query, page: 1, ...next }));
    setSelected(new Set());
    startNavigating(() => router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const setStatus = (ids: string[], status: ReviewStatus) =>
    startSaving(async () => {
      const result = await setReviewStatusAction(ids, status);
      if (!result.success) {
        toast.error("Something went wrong", { description: result.message });
        return;
      }
      setSelected(new Set());
      if (status === "APPROVED") toast.success("Approved", { description: reviewCountLabel(ids.length) });
      else toast.error("Rejected", { description: reviewCountLabel(ids.length) });
    });

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startSaving(async () => {
      const result = await deleteReviewAction(target.id);
      if (!result.success) {
        toast.error("Couldn’t delete review", { description: result.message });
        return;
      }
      setDeleteTarget(null);
      setSelected((current) => {
        const next = new Set(current);
        next.delete(target.id);
        return next;
      });
      toast.error("Review deleted");
    });
  };

  return (
    <section className={cn(filterStyles.card, "min-w-0 flex-[2_1_600px]")}>
      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Review status" className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {REVIEW_TABS.map((tab) => {
            const on = tab.value === query.status;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => navigate({ status: tab.value })}
                className={cn(
                  "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap",
                  on ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5.5 items-center justify-center rounded-md px-1.5 text-[11.5px]",
                    on ? "bg-brand text-white" : "bg-surface-3 text-ink-2"
                  )}
                >
                  {summary.counts[tab.value].toLocaleString("en-IN")}
                </span>
              </button>
            );
          })}
        </div>
        <span className="flex-1" />
        <SelectMenu
          ariaLabel="Rating"
          size="sm"
          value={query.rating ? String(query.rating) : ""}
          onChange={(rating) => navigate({ rating: Number(rating) || undefined })}
          options={REVIEW_RATING_OPTIONS.map((option) => ({ value: String(option.value), label: option.label }))}
        />
      </div>

      {visibleSelected.length > 0 && (
        <div
          role="toolbar"
          aria-label="Bulk actions"
          className="flex flex-wrap items-center gap-3 rounded-[14px] bg-brand-50 py-2.5 pr-2.5 pl-3 shadow-[inset_0_0_0_1px_var(--brand-200)]"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex size-6.5 items-center justify-center rounded-sm bg-brand text-white">
              <Icon name="check" size={15} strokeWidth={3} />
            </span>
            <span className="font-semibold">{visibleSelected.length} selected</span>
          </span>
          <span className="h-5 w-px bg-brand-200" />
          <Button variant="link" size="sm" onClick={() => setSelected(new Set())}>
            Clear selection
          </Button>
          <span className="flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" disabled={isSaving} onClick={() => setStatus(visibleSelected, "APPROVED")}>
              <Icon name="check" size={15} strokeWidth={1.8} className="size-[15px]" />
              Approve
            </Button>
            <Button
              size="sm"
              disabled={isSaving}
              onClick={() => setStatus(visibleSelected, "REJECTED")}
              className="bg-surface text-danger shadow-[0_1px_2px_rgb(34_21_16/6%)] hover:bg-surface-2"
            >
              <Icon name="xcircle" size={15} strokeWidth={1.8} className="size-[15px]" />
              Reject
            </Button>
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <label className="inline-flex cursor-pointer items-center gap-2.5 self-start text-caption text-ink-3">
          <input
            type="checkbox"
            checked={allOn}
            onChange={() => setSelected(allOn ? new Set() : new Set(reviews.map((review) => review.id)))}
          />
          Select all in this tab
        </label>
      )}

      <div className={cn("transition-opacity", isNavigating && "opacity-60")}>
        {reviews.length === 0 ? (
          <EmptyState title="Nothing to moderate" description="Reviews in this tab will appear here." />
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                now={now}
                selected={selected.has(review.id)}
                canDelete={canDelete}
                isPending={isSaving}
                onToggle={() => toggle(review.id)}
                onStatus={(status) => setStatus([review.id], status)}
                onDelete={() => setDeleteTarget(review)}
              />
            ))}
          </div>
        )}
      </div>

      {meta && meta.totalPages > 1 && <DataPagination meta={meta} pathname={pathname} query={reviewsQueryParams(query)} />}

      <DangerDialog
        open={!!deleteTarget}
        title="Delete this review?"
        description="It’s removed from the product page and the rating is recalculated."
        confirmLabel="Delete review"
        pendingLabel="Deleting…"
        isPending={isSaving}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
