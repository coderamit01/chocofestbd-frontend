"use client";

import { useState } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { ProductReview } from "@/types/store-product-detail";

export function ReviewCard({ review }: { review: ProductReview }) {
  const [helped, setHelped] = useState(false);

  return (
    <article className="flex flex-col gap-2 rounded-[18px] border border-[#f0ebe6] p-[18px]">
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-10 flex-none items-center justify-center rounded-full font-heading text-[13px] leading-none font-semibold text-white"
          style={{ background: review.color }}
        >
          {review.initials}
        </span>
        <span className="flex flex-1 flex-col gap-0.5">
          <b className="text-sm text-ink">{review.name}</b>
          <small className="text-xs text-[#8a7f79]">
            {review.location} · {review.date}
          </small>
        </span>
        <span className="text-[#f5a524]" aria-label={`${review.rating} out of 5 stars`}>
          {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
        </span>
      </div>
      <span className="inline-flex items-center gap-1 text-xs text-[#1f8a4c]">
        <Icon name="check" size={13} strokeWidth={1.8} />
        Verified purchase · {review.variant}
      </span>
      <p className="m-0 text-sm leading-[1.6] text-[#3f3531]">{review.quote}</p>
      <button
        type="button"
        aria-pressed={helped}
        onClick={() => setHelped(!helped)}
        className={cn(
          "inline-flex h-8 cursor-pointer items-center gap-1.5 self-start rounded-full border border-[#e7e0da] bg-white px-3 font-sans text-[12.5px] leading-none font-medium text-ink-2 focus-visible:shadow-focus",
          helped && "border-brand bg-brand-50 text-brand-text",
        )}
      >
        <Icon name="trendUp" size={14} strokeWidth={1.8} />
        Helpful ({review.helpful + (helped ? 1 : 0)})
      </button>
    </article>
  );
}
