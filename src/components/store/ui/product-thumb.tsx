import Image from "next/image";
import { cn } from "cn";

type ProductThumbProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProductThumb({ src, alt, className }: ProductThumbProps) {
  return (
    <span
      className={cn(
        "relative flex size-14 flex-none items-center justify-center overflow-hidden rounded-[12px]",
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes="56px" loading="lazy" className="rounded-[inherit] object-contain p-[8%]" />
    </span>
  );
}
