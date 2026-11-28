"use client";

import { useEffect, useState } from "react";
import { HeroCarouselArrow } from "@/components/store/home/hero-carousel-arrow";
import { HeroSlide } from "@/components/store/home/hero-slide";
import { HeroSlideDots } from "@/components/store/home/hero-slide-dots";
import type { HomeBanner } from "@/config/store-home";

type HeroCarouselProps = { slides: HomeBanner[]; interval: number };

export function HeroCarousel({ slides, interval }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const count = slides.length;
  const step = (delta: number) => setActive((index) => (index + delta + count) % count);

  useEffect(() => {
    const timer = setInterval(() => setActive((index) => (index + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return (
    <div className="group/hero relative h-[440px] overflow-hidden rounded-[22px] bg-[#efe7e1] max-[1180px]:aspect-[16/8.4] max-[1180px]:h-auto max-[900px]:aspect-video max-[900px]:rounded-[20px]">
      {slides.map((slide, index) => (
        <HeroSlide key={slide.image} slide={slide} active={index === active} preload={index === 0} />
      ))}
      <HeroCarouselArrow direction="prev" onClick={() => step(-1)} />
      <HeroCarouselArrow direction="next" onClick={() => step(1)} />
      <HeroSlideDots count={count} active={active} onSelect={setActive} />
    </div>
  );
}
