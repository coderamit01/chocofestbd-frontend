import Image from "next/image";
import Link from "next/link";

type ProductImageLinkProps = {
  href: string;
  src: string;
  alt: string;
  sizes: string;
  outOfStock: boolean;
};

export function ProductImageLink({ href, src, alt, sizes, outOfStock }: ProductImageLinkProps) {
  return (
    <Link href={href} className="relative block aspect-square overflow-hidden rounded-[12px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-contain p-[9%] drop-shadow-[0_10px_12px_rgba(61,17,4,0.16)] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover/card:scale-105"
      />
      {outOfStock && (
        <span className="absolute inset-0 flex items-center justify-center bg-white/60 font-sans text-[13px] leading-none font-semibold text-[#3f3531] backdrop-grayscale">
          Out of stock
        </span>
      )}
    </Link>
  );
}
