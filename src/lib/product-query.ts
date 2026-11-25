import { DEFAULT_PRODUCT_PAGE_SIZE, PRODUCT_PAGE_SIZES, PRODUCT_SORTS, PRODUCT_STOCK_FILTERS, PRODUCT_TABS } from "@/config/products";
import type { ProductSort, ProductsQuery, ProductStockFilter, ProductTab } from "@/types/product";

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

const oneOf = <T extends string>(value: string | undefined, options: { value: T }[]) =>
  options.some((option) => option.value === value) ? (value as T) : undefined;

export function parseProductsQuery(searchParams: SearchParams): ProductsQuery {
  const page = Number(first(searchParams.page));
  const limit = Number(first(searchParams.limit));
  const maxPrice = Number(first(searchParams.maxPrice));

  return {
    tab: oneOf<ProductTab>(first(searchParams.tab), PRODUCT_TABS) ?? "all",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: PRODUCT_PAGE_SIZES.includes(limit) ? limit : DEFAULT_PRODUCT_PAGE_SIZE,
    sort: oneOf<ProductSort>(first(searchParams.sort), PRODUCT_SORTS) ?? "newest",
    view: first(searchParams.view) === "grid" ? "grid" : "table",
    search: first(searchParams.search),
    category: first(searchParams.category),
    brand: first(searchParams.brand),
    tag: first(searchParams.tag),
    stock: oneOf<ProductStockFilter>(first(searchParams.stock), PRODUCT_STOCK_FILTERS),
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    featured: first(searchParams.featured) === "true" || undefined,
  };
}

export function productsQueryParams(query: Partial<ProductsQuery>): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.tab && query.tab !== "all") params.tab = query.tab;
  if (query.page && query.page > 1) params.page = String(query.page);
  if (query.limit && query.limit !== DEFAULT_PRODUCT_PAGE_SIZE) params.limit = String(query.limit);
  if (query.sort && query.sort !== "newest") params.sort = query.sort;
  if (query.view === "grid") params.view = "grid";
  if (query.search) params.search = query.search;
  if (query.category) params.category = query.category;
  if (query.brand) params.brand = query.brand;
  if (query.tag) params.tag = query.tag;
  if (query.stock) params.stock = query.stock;
  if (query.maxPrice) params.maxPrice = String(query.maxPrice);
  if (query.featured) params.featured = "true";
  return params;
}
