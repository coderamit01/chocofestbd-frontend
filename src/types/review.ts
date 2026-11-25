import type { ReviewStatus } from "@/types/status";

export type AdminReview = {
  id: string;
  rating: number;
  comment: string | null;
  image: string | null;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  product: { id: string; name: string; slug: string; image: string | null };
  user: { id: string; name: string; email: string; phone: string | null; image: string | null };
};

export type ReviewSummary = {
  counts: Record<ReviewStatus, number>;
  averageRating: number;
  approvedCount: number;
  breakdown: { rating: number; count: number }[];
};

export type ReviewsQuery = {
  status: ReviewStatus;
  rating?: number;
  page: number;
};
