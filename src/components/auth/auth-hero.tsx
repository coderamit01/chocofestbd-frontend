import Image from "next/image";
import type { ReactNode } from "react";

type AuthHeroProps = {
  title: ReactNode;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
};

export function AuthHero({ title, description, image }: AuthHeroProps) {
  return (
    <section className="relative isolate hidden min-h-[560px] flex-col overflow-hidden rounded-[40px] bg-linear-165 from-secondary/85 via-secondary via-45% to-secondary/45 px-10 pt-14 lg:flex">
      <NoiseOverlay />
      <LogoWatermark />

      <h2 className="text-[40px] leading-[1.3] font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-8 max-w-sm text-base leading-relaxed font-medium text-white/95">{description}</p>

      {image && (
        <div className="relative mt-auto h-[280px] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 400px, 0px"
            className="object-contain object-bottom"
          />
        </div>
      )}
    </section>
  );
}

export function HighlightUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 210 10"
        fill="none"
        preserveAspectRatio="none"
        className="absolute -bottom-2.5 left-[-28%] h-2 w-[140%]"
      >
        <path d="M2 8C70 1.5 140 1.5 208 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function LogoWatermark() {
  return (
    <Image
      src="/Chocofestbd Logo.png"
      alt=""
      aria-hidden
      width={410}
      height={240}
      className="pointer-events-none absolute -right-12 -bottom-8 -z-10 w-[380px] max-w-none -rotate-12 opacity-10 brightness-0 invert select-none"
    />
  );
}

function NoiseOverlay() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full opacity-25 mix-blend-soft-light">
      <filter id="auth-hero-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#auth-hero-noise)" />
    </svg>
  );
}
