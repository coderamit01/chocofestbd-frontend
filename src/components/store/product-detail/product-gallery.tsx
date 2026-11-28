"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { GalleryArrow } from "./gallery-arrow";
import { GalleryBadges } from "./gallery-badges";
import { GalleryThumb } from "./gallery-thumb";
import { GalleryWishlistButton } from "./gallery-wishlist-button";
import type { ProductGalleryView } from "@/types/store-product-detail";

type ProductGalleryProps = {
  views: ProductGalleryView[];
  discount: number;
  tag?: string;
  backHref: string;
};

export function ProductGallery({ views, discount, tag, backHref }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const view = views[active];
  const step = (delta: number) => setActive((active + delta + views.length) % views.length);

  return (
    <div className="sticky top-4 grid grid-cols-[84px_1fr] gap-3.5 rounded-[24px] border border-[#f0ebe6] bg-white p-3.5 max-[900px]:relative max-[900px]:top-auto max-[900px]:-mx-3.5 max-[900px]:block max-[900px]:rounded-none max-[900px]:border-0 max-[900px]:px-3 max-[900px]:pt-3 max-[900px]:pb-0">
      <div className="flex flex-col gap-2.5 max-[900px]:absolute max-[900px]:top-[82px] max-[900px]:right-6 max-[900px]:z-3 max-[900px]:gap-2">
        {views.map((item, index) => (
          <GalleryThumb
            key={item.label}
            view={item}
            active={index === active}
            onSelect={() => setActive(index)}
          />
        ))}
      </div>
      <div
        className={cn(
          "group/main relative flex aspect-square items-center justify-center overflow-hidden rounded-[18px]",
          "max-[900px]:w-full max-[900px]:rounded-[24px] max-[900px]:bg-[radial-gradient(circle_at_50%_42%,#fdf8f4_0%,#f3e6dc_80%)]",
        )}
      >
        <Link
          href={backHref}
          aria-label="Back to products"
          className="absolute top-3.5 left-3.5 z-3 hidden size-[42px] items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(34,21,16,0.14)] hover:text-ink max-[900px]:flex"
        >
          <Icon name="arrowLeft" size={20} strokeWidth={1.8} />
        </Link>
        <Image
          key={view.image}
          src={view.image}
          alt={view.label}
          fill
          preload
          sizes="(max-width: 900px) 100vw, 640px"
          className="object-contain p-[12%] drop-shadow-[0_10px_12px_rgba(61,17,4,0.16)] max-[900px]:pt-[12%] max-[900px]:pr-[22%] max-[900px]:pb-[12%] max-[900px]:pl-[8%]"
        />
        <GalleryBadges discount={discount} tag={tag} />
        <GalleryWishlistButton />
        <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-[7px] font-sans text-xs text-ink-2 backdrop-blur-[6px] max-[900px]:hidden">
          {view.label} · {active + 1}/{views.length}
        </span>
        <GalleryArrow direction="prev" onClick={() => step(-1)} />
        <GalleryArrow direction="next" onClick={() => step(1)} />
      </div>
    </div>
  );
}
