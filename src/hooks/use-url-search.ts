"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SEARCH_DEBOUNCE_MS } from "@/config/search";

export function useUrlSearch(param = "search") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get(param) ?? "";
  const [value, setValue] = useState(current);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const term = value.trim();
    if (term === current) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) params.set(param, term);
      else params.delete(param);
      params.delete("page");
      const search = params.toString();
      startTransition(() => router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false }));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, current, param, pathname, router, searchParams]);

  return { value, setValue, isPending };
}
