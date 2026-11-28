"use client";

import { useState } from "react";
import { PageHero } from "@/components/store/ui/page-hero";
import { FAQ_SEARCH_PLACEHOLDER } from "@/config/store-faq";
import { filterFaqs } from "@/lib/store-faq";
import type { FaqCategory, FaqEntry, FaqFilter } from "@/types/store-faq";
import { FaqCategoryNav } from "./faq-category-nav";
import { FaqEmpty } from "./faq-empty";
import { FaqItem } from "./faq-item";
import { HeroSearch } from "./hero-search";
import { HelpBanner } from "./help-banner";

type FaqCenterProps = {
  categories: FaqCategory[];
  entries: FaqEntry[];
};

export function FaqCenter({ categories, entries }: FaqCenterProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FaqFilter>("All");
  const [openId, setOpenId] = useState<number | null>(entries[0]?.id ?? null);
  const visible = filterFaqs(entries, filter, query);

  return (
    <>
      <PageHero kicker="Help centre" title="Questions? We’ve got answers." description="">
        <HeroSearch
          aria-label="Search help"
          placeholder={FAQ_SEARCH_PLACEHOLDER}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </PageHero>
      <div className="grid grid-cols-[240px_1fr] items-start gap-6 max-[900px]:grid-cols-1">
        <FaqCategoryNav categories={categories} entries={entries} active={filter} onSelect={setFilter} />
        <div className="flex min-w-0 flex-col gap-2.5">
          {visible.map((entry) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              open={openId === entry.id}
              onToggle={() => setOpenId((current) => (current === entry.id ? null : entry.id))}
            />
          ))}
          {visible.length === 0 && <FaqEmpty query={query} />}
          <HelpBanner title="Still need help?" text="Our team replies within minutes on WhatsApp." icon="chat" />
        </div>
      </div>
    </>
  );
}
