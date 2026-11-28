"use client";

import { useState } from "react";
import { CategoryArrow } from "@/components/store/home/category-arrow";
import { CategoryTile } from "@/components/store/home/category-tile";
import type { HomeCategory } from "@/config/store-home";

export function CategoryRail({ categories }: { categories: HomeCategory[] }) {
  const [start, setStart] = useState(0);
  const count = categories.length;
  const tiles = categories.map((category, index) => ({ category, shape: index }));
  const ordered = [...tiles.slice(start), ...tiles.slice(0, start)];
  const rotate = (delta: number) => setStart((index) => (index + delta + count) % count);

  return (
    <div className="relative">
      <CategoryArrow direction="left" onClick={() => rotate(-1)} />
      <div className="grid auto-cols-[calc((100%-140px)/6)] grid-flow-col gap-7 overflow-hidden max-[1180px]:auto-cols-[calc((100%-60px)/4)] max-[1180px]:gap-5 max-[900px]:-mx-3.5 max-[900px]:snap-x max-[900px]:snap-mandatory max-[900px]:overflow-x-auto max-[900px]:px-3.5 max-[900px]:pb-1.5">
        {ordered.map(({ category, shape }) => (
          <CategoryTile key={category.name} category={category} shape={shape} />
        ))}
      </div>
      <CategoryArrow direction="right" onClick={() => rotate(1)} />
    </div>
  );
}
