"use client";

import { useEffect, useRef, useState } from "react";
import { LISTING_PRICE_DEBOUNCE_MS } from "@/config/store-listing";
import type { ListingPriceFilter } from "@/types/store-listing";
import { PriceBox } from "./price-box";
import { useListingNavigate } from "./use-listing-navigate";

const RANGE_INPUT =
  "pointer-events-none absolute top-0 left-0 m-0 h-7 w-full appearance-none border-0 bg-transparent p-0 focus-visible:shadow-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-brand [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(61,17,4,0.2)] [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-7 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-1 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(61,17,4,0.2)] focus-visible:[&::-webkit-slider-thumb]:outline-[3px] focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-[rgba(238,86,21,0.35)] focus-visible:[&::-webkit-slider-thumb]:outline-solid";

type PriceRangeProps = {
  price: ListingPriceFilter;
};

export function PriceRange({ price }: PriceRangeProps) {
  const { min, max, limit, step, basePath, baseQuery } = price;
  const { navigate } = useListingNavigate();
  const [range, setRange] = useState({ lo: min, hi: max });
  const [synced, setSynced] = useState({ min, max });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  if (synced.min !== min || synced.max !== max) {
    setSynced({ min, max });
    setRange({ lo: min, hi: max });
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  const snap = (value: number) => Math.max(0, Math.min(limit, Math.round(value / step) * step));

  const commit = (lo: number, hi: number, delay: number) => {
    clearTimeout(timer.current);
    if (lo === min && hi === max) return;
    timer.current = setTimeout(() => {
      const params = new URLSearchParams(baseQuery);
      if (lo > 0) params.set("min", String(lo));
      if (hi < limit) params.set("max", String(hi));
      const query = params.toString();
      navigate(query ? `${basePath}?${query}` : basePath);
    }, delay);
  };

  const setLo = (value: number, delay = LISTING_PRICE_DEBOUNCE_MS) => {
    const lo = Math.min(snap(value), range.hi - step);
    setRange({ lo, hi: range.hi });
    commit(lo, range.hi, delay);
  };

  const setHi = (value: number, delay = LISTING_PRICE_DEBOUNCE_MS) => {
    const hi = Math.max(snap(value), range.lo + step);
    setRange({ lo: range.lo, hi });
    commit(range.lo, hi, delay);
  };

  const fill = {
    left: `calc(10px + (100% - 20px) * ${range.lo / limit})`,
    right: `calc(10px + (100% - 20px) * ${1 - range.hi / limit})`,
  };

  return (
    <>
      <div className="relative mt-0.5 mb-3.5 block h-7 w-full">
        <span className="absolute top-3 right-2.5 left-2.5 h-1 rounded-full bg-[#efe5de]" />
        <span className="absolute top-3 h-1 rounded-full bg-brand" style={fill} />
        <input
          type="range"
          min={0}
          max={limit}
          step={step}
          value={range.lo}
          aria-label="Minimum price"
          onChange={(event) => setLo(Number(event.target.value))}
          className={RANGE_INPUT}
        />
        <input
          type="range"
          min={0}
          max={limit}
          step={step}
          value={range.hi}
          aria-label="Maximum price"
          onChange={(event) => setHi(Number(event.target.value))}
          className={RANGE_INPUT}
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <PriceBox
          key={`lo-${range.lo}`}
          label="Min"
          ariaLabel="Minimum price in taka"
          value={range.lo}
          limit={limit}
          step={step}
          onCommit={(value) => setLo(value, 0)}
        />
        <span className="h-0.5 w-2.5 flex-none bg-[#d9ccc4]" />
        <PriceBox
          key={`hi-${range.hi}`}
          label="Max"
          ariaLabel="Maximum price in taka"
          value={range.hi}
          limit={limit}
          step={step}
          onCommit={(value) => setHi(value, 0)}
        />
      </div>
    </>
  );
}
