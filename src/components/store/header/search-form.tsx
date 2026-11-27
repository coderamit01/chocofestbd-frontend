"use client";

import Form from "next/form";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import {
  SAMPLE_PRODUCTS,
  SEARCH_LISTENING_PLACEHOLDER,
  SEARCH_PLACEHOLDER,
  SEARCH_SUGGESTION_LIMIT,
  STORE_ROUTES,
} from "@/config/store-header";
import type { SearchScope } from "@/types/store";
import { Scrim } from "./scrim";
import { SearchScopeSelect } from "./search-scope-select";
import { SearchSuggestions } from "./search-suggestions";
import { useVoiceSearch } from "./use-voice-search";
import { VoiceSearchButton } from "./voice-search-button";

type SearchFormProps = {
  scopes?: SearchScope[];
  withSuggestions?: boolean;
  autoFocus?: boolean;
  className?: string;
};

export function SearchForm({ scopes, withSuggestions = false, autoFocus, className }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState(scopes?.[0]?.value ?? "all");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fill = (text: string) => {
    setQuery(text);
    setOpen(true);
    inputRef.current?.focus();
  };
  const voice = useVoiceSearch(fill);

  const term = query.trim().toLowerCase();
  const products = useMemo(
    () =>
      term
        ? SAMPLE_PRODUCTS.filter((product) => `${product.name} ${product.brand}`.toLowerCase().includes(term)).slice(
            0,
            SEARCH_SUGGESTION_LIMIT,
          )
        : [],
    [term],
  );

  const showSuggestions = withSuggestions && open;
  const close = () => setOpen(false);

  const handleVoice = () => {
    if (!voice.listening) setQuery("");
    if (!voice.toggle()) inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") close();
  };

  return (
    <div className={cn("relative", className)}>
      {showSuggestions && <Scrim onClick={close} />}
      <Form
        action={STORE_ROUTES.search}
        onSubmit={close}
        className={cn(
          "relative flex h-[50px] items-center rounded-[14px] border-[1.5px] border-[#ece5df] bg-[#faf8f6] transition-[border-color,box-shadow,background-color] duration-150 focus-within:border-brand focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(238,86,21,0.12)]",
          showSuggestions && "z-[55]",
        )}
      >
        {scopes && (
          <>
            <SearchScopeSelect scopes={scopes} value={scope} onChange={setScope} onOpen={close} />
            {scope !== "all" && <input type="hidden" name="category" value={scope} />}
          </>
        )}
        <input
          ref={inputRef}
          type="search"
          name="q"
          aria-label="Search products"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={voice.listening ? SEARCH_LISTENING_PLACEHOLDER : SEARCH_PLACEHOLDER}
          value={query}
          onChange={(event) => fill(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-full min-w-0 flex-1 border-0 bg-transparent px-3.5 font-sans text-[14.5px] leading-none text-ink outline-0 focus-visible:shadow-none"
        />
        <VoiceSearchButton listening={voice.listening} onClick={handleVoice} />
        <button
          type="submit"
          aria-label="Search"
          className="mr-1 flex size-[42px] flex-none items-center justify-center rounded-[11px] bg-brand text-white transition-colors duration-150 hover:bg-brand-hover"
        >
          <Icon name="search" size={20} strokeWidth={1.8} />
        </button>
      </Form>
      {showSuggestions && (
        <SearchSuggestions query={query.trim()} products={products} onPickTerm={fill} onNavigate={close} />
      )}
    </div>
  );
}
