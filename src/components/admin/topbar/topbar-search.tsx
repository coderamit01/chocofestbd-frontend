"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon";
import { SEARCH_DEBOUNCE_MS, SEARCH_LIMIT_PER_KIND, SEARCH_SOURCES, SEARCH_SUGGESTION_LIMIT } from "@/config/search";
import { SearchService } from "@/services/search.service";
import type { UserRole } from "@/types/auth";
import type { SearchResult } from "@/types/search";
import { TopbarPopover, topbarIconButtonClass } from "./topbar-popover";

const BANGLA = /[ঀ-৿]/;

type TopbarSearchProps = {
  role?: UserRole;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function TopbarSearch({ role, open, onToggle, onClose }: TopbarSearchProps) {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<{ key: string; results: SearchResult[] }>({ key: "", results: [] });
  const term = query.trim();
  const key = `${role}|${term}`;
  const isLoading = found.key !== key;
  const results = found.results;

  useEffect(() => {
    if (!open || !role) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      const next = await SearchService.search(role, term, term ? SEARCH_LIMIT_PER_KIND : SEARCH_SUGGESTION_LIMIT);
      if (!cancelled) setFound({ key: `${role}|${term}`, results: next });
    }, term ? SEARCH_DEBOUNCE_MS : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, role, term]);

  const showEmpty = !isLoading && results.length === 0;

  return (
    <TopbarPopover
      open={open}
      onClose={onClose}
      className="top-[58px] w-[440px] p-3"
      trigger={
        <button type="button" className={topbarIconButtonClass} aria-label="Search" aria-expanded={open} onClick={onToggle}>
          <Icon name="search" size={21} strokeWidth={1.8} />
        </button>
      }
    >
      <div className="relative flex items-center">
        <Icon name="search" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 text-ink-3" />
        <input
          type="search"
          autoFocus
          aria-label="Global search"
          placeholder="Order #, phone, product or SKU"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10.5 w-full rounded-[10px] border border-transparent bg-surface-2 pr-3.5 pl-10.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-focus"
        />
      </div>

      <div className="mt-2 flex flex-col">
        {isLoading && results.length === 0 && (
          <p className="p-4 text-center text-[12.5px] text-ink-3">Searching…</p>
        )}

        {results.map((result) => (
          <Link
            key={`${result.kind}-${result.id}`}
            href={result.href}
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left text-sm leading-[1.2] text-ink outline-none hover:bg-surface-2 focus-visible:bg-surface-2"
          >
            <span className="flex size-[34px] flex-none items-center justify-center rounded-[10px] bg-surface-3 text-ink-2">
              <Icon name={SEARCH_SOURCES[result.kind].icon} size={16} strokeWidth={1.8} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className={BANGLA.test(result.title) ? "truncate font-bengali font-medium" : "truncate font-medium"}>
                {result.title}
              </span>
              <span className="truncate text-xs text-ink-3">{result.subtitle}</span>
            </span>
            <Badge variant="neutral" size="sm">
              {result.kind}
            </Badge>
          </Link>
        ))}

        {showEmpty && (
          <p className="p-4 text-center text-[12.5px] text-ink-3">
            {term ? `Nothing matches “${term}”.` : "Nothing to show yet."}
          </p>
        )}
      </div>
    </TopbarPopover>
  );
}
