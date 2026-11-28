import type { StoreProduct } from "@/types/store-product";

export type ProductGalleryView = {
  label: string;
  image: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductReview = {
  rating: number;
  name: string;
  location: string;
  date: string;
  variant: string;
  quote: string;
  initials: string;
  color: string;
  helpful: number;
};

export type RatingBar = {
  stars: number;
  count: number;
};

export type ProductTrustItem = {
  icon: "shield" | "cash" | "lock";
  title: string;
  note: string;
};

export type ProductDetailCopy = {
  title?: string;
  description?: string;
  highlights?: string[];
  pieces?: number;
  pieceUnit?: string;
  sku?: string;
};

export type ProductDetail = {
  product: StoreProduct;
  title: string;
  brandLine: string;
  description: string;
  highlights: string[];
  netWeight: string;
  variantLabel: string;
  sku: string;
  discount: number;
  savings: number;
  unitPriceNote?: string;
  categoryHref: string;
  brandHref: string;
  shareUrl: string;
  gallery: ProductGalleryView[];
  specs: ProductSpec[];
  ratingBars: RatingBar[];
  related: StoreProduct[];
  recent: StoreProduct[];
};
