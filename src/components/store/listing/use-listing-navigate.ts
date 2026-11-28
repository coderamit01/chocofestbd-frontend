"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

export function useListingNavigate() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string, { replace = false } = {}) =>
      startTransition(() => (replace ? router.replace(href, { scroll: false }) : router.push(href, { scroll: false }))),
    [router],
  );

  return { navigate, pending };
}
