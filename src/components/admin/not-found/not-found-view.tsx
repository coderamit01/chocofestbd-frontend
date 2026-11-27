"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/shared/icon";
import { NOT_FOUND_HINTS, NOT_FOUND_TITLES, POPULAR_PLACE_LIMIT, POPULAR_PLACES } from "@/config/not-found";
import { authClient } from "@/lib/auth-client";
import { canAccessPath } from "@/lib/nav";
import type { UserRole } from "@/types/auth";
import { ChocolateCookie } from "./chocolate-cookie";
import { PopularPlaces } from "./popular-places";

const MAX_BITES = NOT_FOUND_TITLES.length - 1;

export function NotFoundView() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const [bites, setBites] = useState(0);

  const role = data?.user.role as UserRole | undefined;
  const places = useMemo(
    () => (role ? POPULAR_PLACES.filter((place) => canAccessPath(role, place.href)).slice(0, POPULAR_PLACE_LIMIT) : []),
    [role]
  );

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(places[0]?.href ?? "/admin");
  };

  return (
    <section className="flex min-h-155 items-center justify-center rounded-xl bg-card px-6 py-10">
      <div className="flex w-full max-w-215 flex-col gap-11">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex h-8 items-center gap-[7px] rounded-full bg-brand-50 px-3.5 text-[12.5px] leading-none font-semibold tracking-[0.02em] text-brand-press shadow-[inset_0_0_0_1px_#ffdcc8]">
            <Icon name="alert" size={14} strokeWidth={1.8} />
            Error 404 · Page not found
          </span>

          <div className="mt-1.5 mb-3.5 flex items-center gap-3.5 leading-none" aria-label="404">
            <span className="choco-digit" data-t="4" aria-hidden="true">
              4
            </span>
            <ChocolateCookie
              bites={bites}
              label={bites < MAX_BITES ? "Take a bite" : "Get a fresh one"}
              onBite={() => setBites((count) => (count >= MAX_BITES ? 0 : count + 1))}
            />
            <span className="choco-digit" data-t="4" aria-hidden="true">
              4
            </span>
          </div>

          <span className="mt-1 rounded-full bg-brand-50 px-3 py-[7px] text-[12.5px] leading-none font-medium text-brand-press">
            {NOT_FOUND_HINTS[bites]}
          </span>
          <h1 className="mt-2.5 font-heading text-4xl leading-[1.15] font-bold tracking-[-0.02em] text-ink max-[900px]:text-[26px]" aria-live="polite">
            {NOT_FOUND_TITLES[bites]}
          </h1>
          <p className="m-0 max-w-130 text-[15.5px] leading-[1.6] text-[#6b605a]">
            The page you tried to open isn’t here. It may have been moved, renamed or deleted — or the link has a small typo.
          </p>
          <button
            type="button"
            onClick={goBack}
            className="mt-1.5 inline-flex h-13 cursor-pointer items-center gap-2.5 rounded-[14px] border-0 bg-[linear-gradient(180deg,#ff7a2f,#ee5615)] px-6.5 font-sans text-[15px] leading-none font-semibold text-white shadow-[0_12px_24px_-8px_rgb(238_86_21/60%)] outline-none transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:shadow-[0_16px_28px_-8px_rgb(238_86_21/65%)] focus-visible:shadow-[0_0_0_4px_rgb(238_86_21/30%)]"
          >
            <Icon name="arrowLeft" size={18} strokeWidth={1.8} />
            Go back
          </button>
        </div>

        <PopularPlaces places={places} />
      </div>
    </section>
  );
}
