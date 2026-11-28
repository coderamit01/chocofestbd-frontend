import type { ListingFacetConfig, ListingScope, ListingSortOption } from "@/types/store-listing";

export const LISTING_PAGE_SIZE = 12;
export const LISTING_PRICE_LIMIT = 4000;
export const LISTING_PRICE_STEP = 50;
export const LISTING_PRICE_DEBOUNCE_MS = 350;

export const LISTING_TYPE_ORDER = ["Milk", "Dark", "White", "Assorted", "Wafer"];

export const LISTING_SORTS: ListingSortOption[] = [
  { value: "pop", label: "Most popular", shortLabel: "Most popular" },
  { value: "new", label: "Newest first", shortLabel: "Newest first" },
  { value: "low", label: "Price: low to high", shortLabel: "low to high" },
  { value: "high", label: "Price: high to low", shortLabel: "high to low" },
  { value: "rate", label: "Top rated", shortLabel: "Top rated" },
  { value: "off", label: "Biggest discount", shortLabel: "Biggest discount" },
];

export const LISTING_FACETS: ListingFacetConfig[] = [
  { key: "cat", title: "Category", field: "category", defaultOpen: true, chipLabel: (label) => label },
  { key: "brand", title: "Brand", field: "brand", scroll: true, defaultOpen: true, chipLabel: (label) => label },
  { key: "type", title: "Chocolate type", field: "type", defaultOpen: true, chipLabel: (label) => `${label} chocolate` },
  { key: "origin", title: "Country of origin", field: "origin", scroll: true, defaultOpen: false, chipLabel: (label) => `From ${label}` },
];

export const LISTING_CHIP_ORDER = ["brand", "type", "price", "cat", "origin"] as const;

export const LISTING_CATEGORY_SCOPES: ListingScope[] = [
  { slug: "chocolates", title: "Chocolates", categories: ["Chocolates", "Gift boxes"] },
  { slug: "gift-boxes", title: "Gift boxes", categories: ["Gift boxes"] },
  { slug: "milk-chocolate", title: "Milk chocolate", types: ["Milk"] },
  { slug: "dark-chocolate", title: "Dark chocolate", types: ["Dark"] },
  { slug: "white-chocolate", title: "White chocolate", types: ["White"] },
  { slug: "truffles-pralines", title: "Truffles & pralines", keywords: ["Lindor", "Rocher", "Raffaello", "Godiva"] },
  { slug: "wafers-biscuits", title: "Wafers & biscuits", categories: ["Biscuits & wafers"], keywords: ["KitKat", "Bueno"] },
  { slug: "biscuits-wafers", title: "Biscuits & wafers", categories: ["Biscuits & wafers"], keywords: ["KitKat", "Bueno"] },
  { slug: "nut-bars", title: "Nut bars", keywords: ["Hazelnut", "Toblerone", "Snickers"] },
  { slug: "snack-packs", title: "Snack packs", keywords: ["Pack of", "Minis", "Share"] },
  { slug: "snacks-candy", title: "Snacks & candy", categories: ["Snacks & candy"] },
  { slug: "baking-chocolate", title: "Baking chocolate", keywords: ["Excellence"] },
  { slug: "coffee-drinks", title: "Coffee & drinks", categories: ["Coffee & drinks"] },
  { slug: "imported-deals", title: "Imported deals", discounted: true },
];

export const LISTING_ALL_TITLE = "All products";
export const LISTING_SEARCH_TITLE = "Search results";

export const LISTING_EMPTY = {
  title: "No chocolates match these filters",
  description: "Try removing a filter, or browse our best sellers instead.",
  action: "Clear all filters",
};
