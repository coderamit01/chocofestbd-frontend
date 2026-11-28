import type { StoreLink } from "@/types/store";
import type { StoreProduct } from "@/types/store-product";

export type HomeRail = {
  id: string;
  title: string;
  more?: StoreLink;
  prevLabel: string;
  nextLabel: string;
  products: StoreProduct[];
};

export type HomeReview = {
  quote: string;
  name: string;
  location: string;
  initials: string;
  color: string;
};
