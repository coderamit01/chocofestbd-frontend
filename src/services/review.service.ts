import { REVIEW_PAGE_SIZE } from "@/config/reviews";
import { serverApiRequest } from "@/lib/server-api";
import type { AdminReview, ReviewsQuery, ReviewSummary } from "@/types/review";
import type { ReviewStatus } from "@/types/status";

export const ReviewService = {
  getReviews: (query: ReviewsQuery) => {
    const params = new URLSearchParams({ page: String(query.page), limit: String(REVIEW_PAGE_SIZE), status: query.status, sort: "newest" });
    if (query.rating) params.set("rating", String(query.rating));
    return serverApiRequest<AdminReview[]>(`/reviews/admin?${params}`);
  },

  getSummary: () => serverApiRequest<ReviewSummary>("/reviews/admin/summary"),

  setStatus: (reviewIds: string[], status: ReviewStatus) =>
    serverApiRequest<{ updated: number }>("/reviews/admin/bulk/status", { method: "PATCH", body: JSON.stringify({ reviewIds, status }) }),

  deleteReview: (reviewId: string) => serverApiRequest(`/reviews/admin/${encodeURIComponent(reviewId)}`, { method: "DELETE" }),
};
