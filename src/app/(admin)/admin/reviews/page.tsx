import type { Metadata } from "next";
import { Suspense } from "react";
import { RatingSummary } from "@/components/admin/reviews/rating-summary";
import { ReviewsManager } from "@/components/admin/reviews/reviews-manager";
import { ReviewsSkeleton } from "@/components/admin/reviews/reviews-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { REVIEW_DELETE_ROLES, REVIEW_ROLES } from "@/config/reviews";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { parseReviewsQuery } from "@/lib/review-query";
import { ReviewService } from "@/services/review.service";
import type { ReviewsQuery } from "@/types/review";

export const metadata: Metadata = {
  title: "Reviews | Chocofest BD",
};

type ReviewsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadReviews(query: ReviewsQuery) {
  try {
    const [list, summary] = await Promise.all([ReviewService.getReviews(query), ReviewService.getSummary()]);
    return { reviews: list.data ?? [], meta: list.meta, summary: summary.data, now: Date.now(), error: null };
  } catch (error) {
    return {
      reviews: [],
      meta: undefined,
      summary: undefined,
      now: Date.now(),
      error: error instanceof ApiError ? error.message : "Something went wrong while loading reviews. Please refresh the page.",
    };
  }
}

async function ReviewsSection({ searchParams }: ReviewsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !REVIEW_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Reviews are only for the content team." />;
  }

  const query = parseReviewsQuery(params);
  const { reviews, meta, summary, now, error } = await loadReviews(query);

  if (error || !summary) return <LoadError title="Couldn’t load reviews" message={error ?? "Please refresh the page."} />;

  return (
    <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
      <RatingSummary summary={summary} />
      <ReviewsManager
        key={`${query.status}-${query.rating ?? "all"}-${query.page}`}
        reviews={reviews}
        meta={meta}
        summary={summary}
        query={query}
        now={now}
        canDelete={REVIEW_DELETE_ROLES.includes(currentUser.role)}
      />
    </div>
  );
}

export default function ReviewsPage({ searchParams }: ReviewsPageProps) {
  return (
    <Suspense fallback={<ReviewsSkeleton />}>
      <ReviewsSection searchParams={searchParams} />
    </Suspense>
  );
}
