import type { ComponentProps } from "react";
import { cn } from "cn";

export function ProductDetailCard({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "scroll-mt-[84px] rounded-[22px] border border-[#f0ebe6] bg-white p-[26px] max-[900px]:rounded-[18px] max-[900px]:p-[18px]",
        className,
      )}
      {...props}
    />
  );
}

export function ProductDetailCardTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "m-0 mb-3 font-heading text-[21px] leading-[1.2] font-bold tracking-normal text-ink max-[900px]:text-lg",
        className,
      )}
      {...props}
    />
  );
}
