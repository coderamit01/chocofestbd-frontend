import Link from "next/link";
import type { HomeBrand } from "@/config/store-home";

export function BrandTile({ brand }: { brand: HomeBrand }) {
  return (
    <Link
      href={brand.href}
      className="flex h-24 flex-col items-center justify-center rounded-[10px] bg-white no-underline transition-all duration-200 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-18px_rgba(0,0,0,.35)] max-[900px]:h-16 max-[900px]:rounded-lg"
    >
      <b
        className="font-heading text-[24px] leading-none font-extrabold tracking-[-0.01em] max-[900px]:text-[15px]"
        style={{ color: brand.color }}
      >
        {brand.name}
      </b>
    </Link>
  );
}
