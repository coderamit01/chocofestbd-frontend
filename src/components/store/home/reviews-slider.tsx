"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { CarouselDots } from "@/components/store/home/carousel-dots";
import { RailButton } from "@/components/store/home/rail-button";
import { ReviewCard } from "@/components/store/home/review-card";
import { SectionHeading } from "@/components/store/home/section-heading";
import type { HomeReview } from "@/types/store-home-rail";

type ReviewsSliderProps = {
  title: string;
  rating: string;
  prevLabel: string;
  nextLabel: string;
  reviews: HomeReview[];
  interval: number;
};

const LOOP_TAIL = 2;

export function ReviewsSlider({ title, rating, prevLabel, nextLabel, reviews, interval }: ReviewsSliderProps) {
  const [active, setActive] = useState(0);
  const count = reviews.length;
  const slides = reviews.concat(reviews.slice(0, LOOP_TAIL));
  const go = (index: number) => setActive((index + count) % count);

  useEffect(() => {
    const timer = setInterval(() => setActive((index) => (index + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return (
    <>
      <SectionHeading
        title={title}
        actions={
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink-2">
              <span className="text-[#f5a524]">★★★★★</span> {rating}
            </span>
            <div className="flex items-center gap-2">
              <RailButton direction="prev" label={prevLabel} onClick={() => go(active - 1)} />
              <RailButton direction="next" label={nextLabel} onClick={() => go(active + 1)} />
            </div>
          </div>
        }
      />
      <div aria-roledescription="carousel" className="-mx-0.5 -mt-1 overflow-hidden px-0.5 pt-1 pb-2">
        <div
          style={{ "--i": active } as CSSProperties}
          className="flex gap-4.5 [transform:translateX(calc(var(--i)*-1*(100%+18px)/3))] transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] max-[900px]:gap-3 max-[900px]:[transform:translateX(calc(var(--i)*-1*(100%+12px)))]"
        >
          {slides.map((review, index) => (
            <ReviewCard key={index} review={review} hidden={index >= count} />
          ))}
        </div>
      </div>
      <CarouselDots count={count} active={active} label={(index) => `Review ${index + 1}`} onSelect={go} />
    </>
  );
}
