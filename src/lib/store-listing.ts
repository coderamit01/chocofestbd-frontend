import {
  LISTING_CATEGORY_SCOPES,
  LISTING_CHIP_ORDER,
  LISTING_FACETS,
  LISTING_PAGE_SIZE,
  LISTING_PRICE_LIMIT,
  LISTING_PRICE_STEP,
  LISTING_SORTS,
  LISTING_TYPE_ORDER,
} from "@/config/store-listing";
import { STORE_PRODUCTS } from "@/config/store-products";
import { generateSlug } from "@/lib/slug";
import { discountPercent } from "@/lib/store-product";
import { formatTaka } from "@/lib/utils";
import type {
  ListingFacetConfig,
  ListingFacetGroup,
  ListingFacetKey,
  ListingFilters,
  ListingLink,
  ListingResult,
  ListingScope,
  ListingSearchParams,
  ListingSortKey,
  ListingState,
  ListingView,
} from "@/types/store-listing";
import type { StoreProduct } from "@/types/store-product";

const BASE_KEYS = ["q", "category", "filter"];
const FACET_KEYS = LISTING_FACETS.map((facet) => facet.key);
const FACET_FIELDS = Object.fromEntries(LISTING_FACETS.map((facet) => [facet.key, facet.field])) as Record<
  ListingFacetKey,
  ListingFacetConfig["field"]
>;

const SORTERS: Record<ListingSortKey, (a: StoreProduct, b: StoreProduct) => number> = {
  pop: (a, b) => b.reviewCount - a.reviewCount,
  new: (a, b) => b.id - a.id,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  rate: (a, b) => b.rating - a.rating,
  off: (a, b) => discountPercent(b) - discountPercent(a),
};

const BRAND_SCOPES: ListingScope[] = [...new Set(STORE_PRODUCTS.map((product) => product.brand))].map((brand) => ({
  slug: generateSlug(brand),
  title: brand,
  brands: [brand],
}));

export const listingParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

const list = (value: string | string[] | undefined) => [...new Set(listingParam(value).split(",").filter(Boolean))];

const clampPrice = (value: number) =>
  Math.max(0, Math.min(LISTING_PRICE_LIMIT, Math.round(value / LISTING_PRICE_STEP) * LISTING_PRICE_STEP));

const toNumber = (value: string, fallback: number) => {
  const parsed = Number(value);
  return value && Number.isFinite(parsed) ? clampPrice(parsed) : fallback;
};

export const getListingScope = (slug: string) =>
  LISTING_CATEGORY_SCOPES.find((scope) => scope.slug === slug) ?? BRAND_SCOPES.find((scope) => scope.slug === slug);

export const listingScopeSlugs = () => [...LISTING_CATEGORY_SCOPES, ...BRAND_SCOPES].map((scope) => scope.slug);

const matchesScope = (product: StoreProduct, scope: ListingScope) => {
  const rules = [
    scope.categories?.includes(product.category),
    scope.types?.includes(product.type),
    scope.brands?.includes(product.brand),
    scope.keywords?.some((keyword) => product.name.toLowerCase().includes(keyword.toLowerCase())),
    scope.discounted ? Boolean(product.oldPrice) : undefined,
  ].filter((rule) => rule !== undefined);
  return rules.length === 0 || rules.some(Boolean);
};

const matchesQuery = (product: StoreProduct, query: string) =>
  !query || `${product.name} ${product.brand} ${product.type}`.toLowerCase().includes(query.toLowerCase());

function parseListingState(path: string, params: ListingSearchParams): ListingState {
  const sort = LISTING_SORTS.find((option) => option.value === listingParam(params.sort))?.value ?? "pop";
  const view: ListingView = listingParam(params.view) === "list" ? "list" : "grid";
  const min = Math.min(toNumber(listingParam(params.min), 0), LISTING_PRICE_LIMIT - LISTING_PRICE_STEP);
  const max = Math.max(toNumber(listingParam(params.max), LISTING_PRICE_LIMIT), min + LISTING_PRICE_STEP);
  const facets = Object.fromEntries(FACET_KEYS.map((key) => [key, list(params[key])])) as Record<ListingFacetKey, string[]>;
  const base = Object.fromEntries(BASE_KEYS.map((key) => [key, listingParam(params[key])]).filter(([, value]) => value));

  return {
    path,
    base,
    query: base.q ?? "",
    filters: { ...facets, min, max },
    sort,
    view,
    page: Math.max(1, Math.floor(Number(listingParam(params.page))) || 1),
  };
}

type ListingPatch = Partial<Omit<ListingState, "path" | "base" | "query" | "filters">> & {
  filters?: Partial<ListingFilters>;
};

function listingQuery(state: ListingState, patch: ListingPatch = {}) {
  const filters = { ...state.filters, ...patch.filters };
  const sort = patch.sort ?? state.sort;
  const view = patch.view ?? state.view;
  const page = patch.page ?? 1;
  const params = new URLSearchParams(state.base);

  FACET_KEYS.forEach((key) => filters[key].length && params.set(key, filters[key].join(",")));
  if (filters.min > 0) params.set("min", String(filters.min));
  if (filters.max < LISTING_PRICE_LIMIT) params.set("max", String(filters.max));
  if (sort !== "pop") params.set("sort", sort);
  if (view !== "grid") params.set("view", view);
  if (page > 1) params.set("page", String(page));

  return params.toString();
}

const listingHref = (state: ListingState, patch?: ListingPatch) => {
  const query = listingQuery(state, patch);
  return query ? `${state.path}?${query}` : state.path;
};

const toggle = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

const facetLabels = (products: StoreProduct[], facet: ListingFacetConfig) => {
  const labels = [...new Set(products.map((product) => product[facet.field]))];
  if (facet.key !== "type") return labels;
  const rank = (label: string) => (LISTING_TYPE_ORDER.indexOf(label) + 1 || LISTING_TYPE_ORDER.length + 1);
  return labels.sort((a, b) => rank(a) - rank(b));
};

const CLEARED_FILTERS: ListingFilters = { cat: [], brand: [], type: [], origin: [], min: 0, max: LISTING_PRICE_LIMIT };

const passesFilters = (product: StoreProduct, filters: ListingFilters, skip?: ListingFacetKey) =>
  LISTING_FACETS.every(
    (facet) =>
      facet.key === skip || !filters[facet.key].length || filters[facet.key].includes(generateSlug(product[facet.field])),
  ) &&
  product.price >= filters.min &&
  product.price <= filters.max;

function facetGroups(scoped: StoreProduct[], state: ListingState): ListingFacetGroup[] {
  return LISTING_FACETS.map((facet) => ({
    key: facet.key,
    title: facet.title,
    scroll: Boolean(facet.scroll),
    defaultOpen: facet.defaultOpen,
    options: facetLabels(scoped, facet).map((label) => {
      const value = generateSlug(label);
      const current = state.filters[facet.key];
      return {
        value,
        label,
        count: scoped.filter((product) => passesFilters(product, state.filters, facet.key) && product[facet.field] === label)
          .length,
        selected: current.includes(value),
        href: listingHref(state, { filters: { [facet.key]: toggle(current, value) } }),
      };
    }),
  })).filter((group) => group.options.length);
}

function activeChips(groups: ListingFacetGroup[], state: ListingState): ListingLink[] {
  const { min, max } = state.filters;
  const chips: Record<(typeof LISTING_CHIP_ORDER)[number], ListingLink[]> = {
    cat: [],
    brand: [],
    type: [],
    origin: [],
    price:
      min > 0 || max < LISTING_PRICE_LIMIT
        ? [
            {
              label: `${formatTaka(min)} – ${formatTaka(max)}`,
              href: listingHref(state, { filters: { min: 0, max: LISTING_PRICE_LIMIT } }),
            },
          ]
        : [],
  };
  groups.forEach((group) => {
    const facet = LISTING_FACETS.find((item) => item.key === group.key);
    chips[group.key] = group.options
      .filter((option) => option.selected)
      .map((option) => ({ label: facet?.chipLabel(option.label) ?? option.label, href: option.href }));
  });
  return LISTING_CHIP_ORDER.flatMap((key) => chips[key]);
}

type BuildListingInput = {
  path: string;
  params: ListingSearchParams;
  scope?: ListingScope;
};

export function buildListing({ path, params, scope }: BuildListingInput): ListingResult {
  const parsed = parseListingState(path, params);
  const scopes = [scope, getListingScope(parsed.base.category ?? ""), getListingScope(parsed.base.filter ?? "")].filter(
    (item): item is ListingScope => Boolean(item),
  );
  const scoped = STORE_PRODUCTS.filter(
    (product) => scopes.every((item) => matchesScope(product, item)) && matchesQuery(product, parsed.query),
  );

  const known = (key: ListingFacetKey) => scoped.map((product) => generateSlug(product[FACET_FIELDS[key]]));
  const filters = { ...parsed.filters };
  FACET_KEYS.forEach((key) => {
    filters[key] = parsed.filters[key].filter((value) => known(key).includes(value));
  });
  const state: ListingState = { ...parsed, filters };

  const products = scoped.filter((product) => passesFilters(product, filters)).sort(SORTERS[state.sort]);
  const shown = Math.min(state.page * LISTING_PAGE_SIZE, products.length);
  const groups = facetGroups(scoped, state);
  const chips = activeChips(groups, state);
  const sort = LISTING_SORTS.find((option) => option.value === state.sort) ?? LISTING_SORTS[0];

  return {
    products: products.slice(0, shown),
    total: products.length,
    shown,
    moreHref: shown < products.length ? listingHref(state, { page: state.page + 1 }) : undefined,
    filters: {
      groups,
      chips,
      activeLabel: `${chips.length} ${chips.length === 1 ? "filter" : "filters"} applied`,
      clearHref: listingHref(state, { filters: CLEARED_FILTERS }),
      price: {
        min: filters.min,
        max: filters.max,
        limit: LISTING_PRICE_LIMIT,
        step: LISTING_PRICE_STEP,
        basePath: state.path,
        baseQuery: listingQuery(state, { filters: { min: 0, max: LISTING_PRICE_LIMIT } }),
      },
    },
    sorts: LISTING_SORTS.map((option) => ({
      value: option.value,
      label: option.label,
      href: listingHref(state, { sort: option.value }),
      selected: option.value === state.sort,
    })),
    sortLabel: sort.shortLabel,
    views: {
      grid: listingHref(state, { view: "grid", page: state.page }),
      list: listingHref(state, { view: "list", page: state.page }),
    },
    view: state.view,
    query: state.query,
  };
}
