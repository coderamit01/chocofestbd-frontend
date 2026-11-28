"use client";

import { RailButton } from "@/components/store/home/rail-button";

type RailScrollButtonsProps = {
  targetId: string;
  prevLabel: string;
  nextLabel: string;
};

const scrollRail = (targetId: string, direction: 1 | -1) => {
  const rail = document.getElementById(targetId);
  const card = rail?.firstElementChild;
  if (!rail || !card) return;

  const max = rail.scrollWidth - rail.clientWidth;
  const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap);
  const atEnd = direction > 0 ? rail.scrollLeft >= max - 1 : rail.scrollLeft <= 1;
  const wrapTo = direction > 0 ? 0 : max;

  rail.scrollTo({ left: atEnd ? wrapTo : rail.scrollLeft + direction * step, behavior: "smooth" });
};

export function RailScrollButtons({ targetId, prevLabel, nextLabel }: RailScrollButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <RailButton direction="prev" label={prevLabel} onClick={() => scrollRail(targetId, -1)} />
      <RailButton direction="next" label={nextLabel} onClick={() => scrollRail(targetId, 1)} />
    </div>
  );
}
