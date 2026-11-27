import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { POPULAR_SEARCHES, STORE_ROUTES } from "@/config/store-header";
import { formatTaka } from "@/lib/utils";
import type { StoreProduct } from "@/types/store";
import { ProductThumb } from "./product-thumb";
import { SectionLabel } from "./section-label";

type SearchSuggestionsProps = {
  query: string;
  products: StoreProduct[];
  onPickTerm: (term: string) => void;
  onNavigate: () => void;
};

function PopularSearches({ onPickTerm }: Pick<SearchSuggestionsProps, "onPickTerm">) {
  return (
    <div className="flex flex-col gap-1.5">
      <SectionLabel>Popular right now</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onPickTerm(term)}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-full border border-line bg-white px-3.5 font-sans text-[13px] leading-none font-medium text-[#3f3531] hover:border-[#ffc9a8] hover:bg-brand-50 hover:text-brand-text"
          >
            <Icon name="trend" size={13} strokeWidth={1.8} />
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductSuggestion({ product, onNavigate }: { product: StoreProduct; onNavigate: () => void }) {
  return (
    <Link
      href={product.href}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-[12px] p-2 text-ink hover:bg-brand-50 hover:text-ink"
    >
      <ProductThumb color={product.color} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-ink">{product.name}</span>
        <span className="text-xs text-ink-3">{product.brand}</span>
      </span>
      <span className="flex flex-col items-end gap-0.5">
        <b className="font-heading text-[15px] leading-none font-bold text-ink">{formatTaka(product.price)}</b>
        {product.oldPrice && <s className="text-xs text-ink-3">{formatTaka(product.oldPrice)}</s>}
      </span>
    </Link>
  );
}

function ProductResults({ query, products, onNavigate }: Omit<SearchSuggestionsProps, "onPickTerm">) {
  return (
    <div className="flex flex-col gap-1.5">
      <SectionLabel>Products</SectionLabel>
      {products.map((product) => (
        <ProductSuggestion key={product.id} product={product} onNavigate={onNavigate} />
      ))}
      {products.length === 0 && (
        <p className="m-0 px-1 py-2 text-[12.5px] text-ink-3">
          No products match “{query}”. Try a brand like <b className="font-semibold">Ferrero</b>.
        </p>
      )}
      <Link
        href={{ pathname: STORE_ROUTES.search, query: { q: query } }}
        onClick={onNavigate}
        className="mt-1.5 flex items-center gap-2 rounded-[12px] bg-surface-2 p-3 text-[13.5px] font-medium text-brand-text hover:text-brand-text"
      >
        <Icon name="search" size={15} strokeWidth={1.8} />
        See all results for “{query}”
      </Link>
    </div>
  );
}

export function SearchSuggestions({ query, products, onPickTerm, onNavigate }: SearchSuggestionsProps) {
  return (
    <div className="absolute top-[calc(100%+8px)] right-0 left-0 z-[55] animate-drop rounded-xl bg-white p-3.5 shadow-[0_24px_48px_-16px_rgba(61,17,4,0.28),0_0_0_1px_#f0ebe6]">
      {query ? (
        <ProductResults query={query} products={products} onNavigate={onNavigate} />
      ) : (
        <PopularSearches onPickTerm={onPickTerm} />
      )}
    </div>
  );
}
