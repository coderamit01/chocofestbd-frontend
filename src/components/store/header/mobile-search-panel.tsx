"use client";

import { useHeader } from "./header-provider";
import { SearchForm } from "./search-form";

export function MobileSearchPanel() {
  const { mobileSearchOpen } = useHeader();
  if (!mobileSearchOpen) return null;
  return <SearchForm autoFocus className="hidden px-4 pb-3 max-[900px]:block" />;
}
