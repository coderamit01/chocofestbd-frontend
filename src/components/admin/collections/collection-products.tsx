"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { setCollectionProductsAction } from "@/actions/collection.actions";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { buttonVariants } from "@/components/ui/button";
import { SEARCH_DEBOUNCE_MS } from "@/config/search";
import { useDismiss } from "@/hooks/use-dismiss";
import { monogram, monogramTint } from "@/lib/monogram";
import { cn } from "@/lib/utils";
import { ProductClient } from "@/services/product.client";
import type { CollectionDetail, CollectionProduct } from "@/types/collection";

const ghostIcon = buttonVariants({ variant: "ghost", size: "icon-sm" });

function Thumb({ product, className }: { product: Pick<CollectionProduct, "id" | "name" | "thumbnail">; className: string }) {
  return (
    <span
      className={cn("flex flex-none items-center justify-center overflow-hidden rounded-[10px] font-heading leading-none font-bold", className)}
      style={product.thumbnail ? undefined : monogramTint(product.id)}
    >
      {product.thumbnail ? <img src={product.thumbnail} alt="" className="size-full object-cover" /> : monogram(product.name)}
    </span>
  );
}

export function CollectionProducts({ collection }: { collection: CollectionDetail }) {
  const [items, setItems] = useState<CollectionProduct[]>(collection.products);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ term: string; products: CollectionProduct[] }>({ term: "", products: [] });
  const [isSaving, startSaving] = useTransition();
  const searchRef = useRef<HTMLDivElement>(null);
  const term = query.trim();

  useDismiss(searchRef, term.length > 0, () => setQuery(""));

  useEffect(() => {
    if (!term) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const { data = [] } = await ProductClient.searchProducts(term);
        if (!cancelled) setResults({ term, products: data.map(({ id, name, thumbnail }) => ({ id, name, thumbnail, position: 0 })) });
      } catch {
        if (!cancelled) setResults({ term, products: [] });
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [term]);

  const save = (next: CollectionProduct[], message?: { title: string; description: string }) => {
    const previous = items;
    setItems(next);
    startSaving(async () => {
      const result = await setCollectionProductsAction(collection.id, next.map((item) => item.id));
      if (!result.success) {
        setItems(previous);
        toast.error("Couldn’t update products", { description: result.message });
      } else if (message) {
        toast.success(message.title, { description: message.description });
      }
    });
  };

  const addable = results.term === term ? results.products.filter((product) => !items.some((item) => item.id === product.id)).slice(0, 5) : [];

  const move = (index: number, direction: -1 | 1) => {
    const next = [...items];
    const [item] = next.splice(index, 1);
    next.splice(index + direction, 0, item);
    save(next);
  };

  return (
    <section aria-labelledby="pm" className="flex min-w-0 flex-[1_1_400px] flex-col gap-4 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-col gap-1">
        <span className="eyebrow">Products in</span>
        <h3 id="pm" className="font-heading text-lg leading-[1.3] font-semibold text-ink">
          {collection.title}
        </h3>
      </div>

      <div ref={searchRef} className="relative">
        <SearchInput label="Search products to add" value={query} onChange={(event) => setQuery(event.target.value)} />
        {term && (
          <div className="absolute top-12 right-0 left-0 z-40 animate-pop rounded-[14px] bg-surface p-1.5 shadow-pop">
            {results.term !== term ? (
              <p className="p-3 text-center text-[12.5px] text-ink-3">Searching…</p>
            ) : addable.length === 0 ? (
              <p className="p-3 text-center text-[12.5px] text-ink-3">No products to add for “{term}”.</p>
            ) : (
              addable.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    setQuery("");
                    save([...items, product], { title: "Added", description: `${product.name} → ${collection.title}` });
                  }}
                  className="flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm leading-[1.2] text-ink outline-none hover:bg-surface-2 focus-visible:bg-surface-2"
                >
                  <Thumb product={product} className="size-8 text-[11px]" />
                  <span className="min-w-0 flex-1 truncate">{product.name}</span>
                  <Icon name="plus" size={17} strokeWidth={1.8} className="text-ink-3" />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState title="No products yet" description="Search above to add products to this collection." />
      ) : (
        <ol className="flex flex-col gap-2">
          {items.map((product, index) => (
            <li key={product.id} className="flex items-center gap-2.5 rounded-xl bg-surface-2 p-2.5">
              <span className="w-5.5 text-center font-semibold text-ink-3">{index + 1}</span>
              <Thumb product={product} className="size-9.5 text-xs" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{product.name}</span>
              <button type="button" aria-label={`Move ${product.name} up`} disabled={index === 0 || isSaving} onClick={() => move(index, -1)} className={ghostIcon}>
                <Icon name="arrowUp" size={16} strokeWidth={1.8} className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Move ${product.name} down`}
                disabled={index === items.length - 1 || isSaving}
                onClick={() => move(index, 1)}
                className={ghostIcon}
              >
                <Icon name="arrowDown" size={16} strokeWidth={1.8} className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Remove ${product.name}`}
                disabled={isSaving}
                onClick={() => save(items.filter((item) => item.id !== product.id))}
                className={ghostIcon}
              >
                <Icon name="close" size={16} strokeWidth={1.8} className="size-4" />
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
