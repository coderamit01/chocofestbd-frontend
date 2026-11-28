import { HeroCarousel } from "@/components/store/home/hero-carousel";
import { HeroSideTiles } from "@/components/store/home/hero-side-tiles";
import { HomeSection } from "@/components/store/home/home-section";
import { HERO_AUTOPLAY_MS, HERO_SLIDES, HERO_TILES } from "@/config/store-home";

export function HeroBanner() {
  return (
    <HomeSection
      aria-label="Offers"
      className="mt-5 grid grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] gap-4 max-[1180px]:grid-cols-1 max-[900px]:mt-3 max-[900px]:gap-2.5"
    >
      <HeroCarousel slides={HERO_SLIDES} interval={HERO_AUTOPLAY_MS} />
      <HeroSideTiles tiles={HERO_TILES} />
    </HomeSection>
  );
}
