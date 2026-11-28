"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import { PRODUCT_REVIEWS } from "@/config/store-product-detail";
import type { RatingBar } from "@/types/store-product-detail";
import { ProductDetailCard, ProductDetailCardTitle } from "./product-detail-card";
import { RatingSummary } from "./rating-summary";
import { ReviewCard } from "./review-card";

type ProductReviewsSectionProps = {
  rating: number;
  reviewCount: number;
  bars: RatingBar[];
};

export function ProductReviewsSection({ rating, reviewCount, bars }: ProductReviewsSectionProps) {
  const [filter, setFilter] = useState(0);
  const reviews = PRODUCT_REVIEWS.filter((review) => !filter || review.rating === filter);

  return (
    <ProductDetailCard id="reviews">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <ProductDetailCardTitle>Customer reviews</ProductDetailCardTitle>
        <StoreButton
          variant="ghost"
          className="h-[42px]"
          onClick={() => toast.success("Thanks!", { description: "You can review after your order is delivered" })}
        >
          <Icon name="edit" size={16} strokeWidth={1.8} />
          Write a review
        </StoreButton>
      </div>
      <RatingSummary rating={rating} reviewCount={reviewCount} bars={bars} filter={filter} onFilter={setFilter} />
      {filter > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter(0)}
            className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full border border-[#ffd0b5] bg-brand-50 pr-2.5 pl-3.5 font-sans text-[13px] leading-none font-medium text-[#9a3412] hover:bg-[#ffe8da] focus-visible:shadow-focus"
          >
            {filter}★ reviews
            <Icon name="close" size={14} strokeWidth={1.8} />
          </button>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3.5 max-[900px]:grid-cols-1">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </ProductDetailCard>
  );
}
