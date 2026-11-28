import type { StoreProduct } from "@/types/store-product";

export type ListingSearchParams = Record<string, string | string[] | undefined>;

export type ListingSortKey = "pop" | "new" | "low" | "high" | "rate" | "off";

export type ListingView = "grid" | "list";

export type ListingFacetKey = "cat" | "brand" | "type" | "origin";

export type ListingScope = {
  slug: string;
  title: string;
  categories?: string[];
  types?: string[];
  brands?: string[];
  keywords?: string[];
  discounted?: boolean;
};

export type ListingFacetConfig = {
  key: ListingFacetKey;
  title: string;
  field: keyof Pick<StoreProduct, "category" | "brand" | "type" | "origin">;
  scroll?: boolean;
  defaultOpen: boolean;
  chipLabel: (label: string) => string;
};

export type ListingSortOption = {
  value: ListingSortKey;
  label: string;
  shortLabel: string;
};

export type ListingFilters = Record<ListingFacetKey, string[]> & {
  min: number;
  max: number;
};

export type ListingState = {
  path: string;
  base: Record<string, string>;
  query: string;
  filters: ListingFilters;
  sort: ListingSortKey;
  view: ListingView;
  page: number;
};

export type ListingLink = {
  label: string;
  href: string;
};

export type ListingFacetOption = ListingLink & {
  value: string;
  count: number;
  selected: boolean;
};

export type ListingFacetGroup = {
  key: ListingFacetKey;
  title: string;
  scroll: boolean;
  defaultOpen: boolean;
  options: ListingFacetOption[];
};

export type ListingPriceFilter = {
  min: number;
  max: number;
  limit: number;
  step: number;
  basePath: string;
  baseQuery: string;
};

export type ListingSortLink = ListingLink & {
  value: ListingSortKey;
  selected: boolean;
};

export type ListingFilterData = {
  groups: ListingFacetGroup[];
  price: ListingPriceFilter;
  chips: ListingLink[];
  clearHref: string;
  activeLabel: string;
};

export type ListingResult = {
  products: StoreProduct[];
  total: number;
  shown: number;
  moreHref?: string;
  filters: ListingFilterData;
  sorts: ListingSortLink[];
  sortLabel: string;
  views: Record<ListingView, string>;
  view: ListingView;
  query: string;
};

export type ListingFilterVariant = "side" | "sheet";
