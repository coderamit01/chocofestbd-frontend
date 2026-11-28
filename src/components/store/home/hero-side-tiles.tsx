import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import type { HomeTile } from "@/config/store-home";

export function HeroSideTiles({ tiles }: { tiles: HomeTile[] }) {
  return (
    <div className="grid h-[440px] grid-cols-2 grid-rows-[1fr_1fr] gap-4 max-[1180px]:h-[200px] max-[1180px]:grid-cols-[2fr_1fr_1fr] max-[1180px]:grid-rows-[200px] max-[900px]:h-auto max-[900px]:grid-cols-2 max-[900px]:grid-rows-[auto] max-[900px]:gap-2.5">
      {tiles.map((tile) => (
        <Link
          key={tile.image}
          href={tile.href}
          className={cn(
            "group block min-h-0 overflow-hidden rounded-[22px] bg-[#efe7e1] max-[900px]:aspect-square max-[900px]:rounded-[20px]",
            tile.wide && "col-span-full max-[1180px]:col-auto max-[900px]:hidden",
          )}
        >
          <Image
            src={tile.image}
            alt={tile.alt}
            width={tile.wide ? 1040 : 520}
            height={440}
            sizes={tile.wide ? "(max-width: 1180px) 50vw, 480px" : "(max-width: 900px) 50vw, (max-width: 1180px) 25vw, 240px"}
            className="block h-full w-full object-cover transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
          />
        </Link>
      ))}
    </div>
  );
}
