import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import type { HomeCategory } from "@/config/store-home";

const BLOB_SHAPES = [
  "rounded-[62%_38%_54%_46%/48%_60%_40%_52%] group-hover:rounded-[44%_56%_40%_60%/58%_42%_58%_42%]",
  "rounded-[44%_56%_40%_60%/58%_42%_58%_42%] group-hover:rounded-[62%_38%_54%_46%/48%_60%_40%_52%]",
  "rounded-[55%_45%_62%_38%/42%_55%_45%_58%] group-hover:rounded-[40%_60%_50%_50%/55%_40%_60%_45%]",
  "rounded-[40%_60%_50%_50%/55%_40%_60%_45%] group-hover:rounded-[55%_45%_62%_38%/42%_55%_45%_58%]",
];

type CategoryTileProps = { category: HomeCategory; shape: number };

export function CategoryTile({ category, shape }: CategoryTileProps) {
  return (
    <Link
      href={category.href}
      className="group flex flex-col items-center gap-3.5 text-center text-ink no-underline max-[900px]:snap-start"
    >
      <span
        className={cn(
          "relative flex aspect-square w-full items-center justify-center overflow-visible bg-[#ece3dc] [transition:border-radius_.7s_cubic-bezier(.2,.8,.2,1),background-color_.3s,transform_.3s] group-hover:bg-[#ffdcc7]",
          BLOB_SHAPES[shape % BLOB_SHAPES.length],
        )}
      >
        <span className="block aspect-square w-[74%] -rotate-4 drop-shadow-[0_14px_14px_rgba(61,17,4,.22)] transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:rotate-0 group-hover:scale-108 max-[900px]:w-[60%]">
          <Image
            src={category.image}
            alt=""
            width={640}
            height={640}
            sizes="(max-width: 900px) 60px, (max-width: 1180px) 20vw, 140px"
            className="block h-full w-full object-contain"
          />
        </span>
      </span>
      <b className="mt-0 font-sans text-base leading-[1.3] font-medium text-ink group-hover:text-brand-text max-[900px]:text-[13.5px]">
        {category.name}
      </b>
    </Link>
  );
}
