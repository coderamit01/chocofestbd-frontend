import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import type { HomeBanner } from "@/config/store-home";

type HeroSlideProps = { slide: HomeBanner; active: boolean; preload?: boolean };

export function HeroSlide({ slide, active, preload }: HeroSlideProps) {
  return (
    <Link
      href={slide.href}
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600 ease-[ease]",
        active && "pointer-events-auto opacity-100",
      )}
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        preload={preload}
        sizes="(max-width: 1180px) 100vw, 780px"
        className={cn(
          "block object-cover transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)]",
          active && "animate-hb-zoom",
        )}
      />
    </Link>
  );
}
