import { Icon } from "@/components/shared/icon";
import { MonoThumb } from "@/components/shared/mono-thumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STAR_COLOR } from "@/config/reviews";
import { stars } from "@/lib/customer-display";
import { isBengali } from "@/lib/customer-query";
import { reviewDate } from "@/lib/review";
import { cn } from "@/lib/utils";
import type { AdminReview } from "@/types/review";
import type { ReviewStatus } from "@/types/status";

type ReviewCardProps = {
  review: AdminReview;
  now: number;
  selected: boolean;
  canDelete: boolean;
  isPending: boolean;
  onToggle: () => void;
  onStatus: (status: ReviewStatus) => void;
  onDelete: () => void;
};

export function ReviewCard({ review, now, selected, canDelete, isPending, onToggle, onStatus, onDelete }: ReviewCardProps) {
  return (
    <article className={cn("flex gap-3.5 rounded-xl p-4.5", selected ? "bg-brand-50" : "bg-surface-2")}>
      <label className="mt-1 inline-flex cursor-pointer self-start">
        <input
          type="checkbox"
          aria-label={`Select review by ${review.user.name}`}
          checked={selected}
          onChange={onToggle}
        />
      </label>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <MonoThumb item={review.product} className="size-10 text-xs leading-none" />
          <span className="flex min-w-40 flex-1 flex-col">
            <span className="text-sm font-medium">{review.product.name}</span>
            <span className="text-xs text-ink-3">
              <span className={cn(isBengali(review.user.name) && "font-bengali")}>{review.user.name}</span> · {reviewDate(review.createdAt, now)}
            </span>
          </span>
          <span className="tracking-[1px]" style={{ color: STAR_COLOR }} aria-label={`${review.rating} of 5`}>
            {stars(review.rating)}
          </span>
          {review.isVerifiedPurchase && (
            <Badge variant="success" size="sm">
              <Icon name="check" size={12} strokeWidth={2.4} />
              Verified purchase
            </Badge>
          )}
        </div>
        {review.comment && (
          <p className={cn("text-[14.5px] leading-[1.6] break-words", isBengali(review.comment) && "font-bengali")}>{review.comment}</p>
        )}
        {review.image && (
          <a
            href={review.image}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 self-start rounded-[10px] bg-surface px-2.5 py-2 text-xs text-ink-3 hover:text-ink"
          >
            <Icon name="image" size={15} strokeWidth={1.8} />1 photo attached
          </a>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {review.status !== "APPROVED" && (
            <Button size="sm" disabled={isPending} onClick={() => onStatus("APPROVED")}>
              <Icon name="check" size={15} strokeWidth={1.8} className="size-[15px]" />
              Approve
            </Button>
          )}
          {review.status !== "REJECTED" && (
            <Button variant="outline" size="sm" disabled={isPending} onClick={() => onStatus("REJECTED")}>
              Reject
            </Button>
          )}
          {canDelete && (
            <Button variant="ghost" size="sm" disabled={isPending} onClick={onDelete}>
              <Icon name="trash" size={15} strokeWidth={1.8} className="size-[15px]" />
              Delete
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
