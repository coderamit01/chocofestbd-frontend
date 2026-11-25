import { REVIEW_TABS } from "@/config/reviews";
import type { ReviewsQuery } from "@/types/review";
import type { ReviewStatus } from "@/types/status";

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

export function parseReviewsQuery(searchParams: SearchParams): ReviewsQuery {
  const status = first(searchParams.status)?.toUpperCase();
  const rating = Number(first(searchParams.rating));
  const page = Number(first(searchParams.page));
  return {
    status: REVIEW_TABS.some((tab) => tab.value === status) ? (status as ReviewStatus) : "PENDING",
    rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : undefined,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function reviewsQueryParams(query: Partial<ReviewsQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.status && query.status !== "PENDING") params.status = query.status;
  if (query.rating) params.rating = String(query.rating);
  if (query.page && query.page > 1) params.page = String(query.page);
  return params;
}
