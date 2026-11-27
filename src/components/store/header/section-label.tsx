import type { ComponentProps } from "react";
import { cn } from "cn";

export function SectionLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "px-1 pt-1 pb-1.5 font-sans text-[11.5px] leading-none font-semibold tracking-[0.06em] text-[#9b908a] uppercase",
        className,
      )}
      {...props}
    />
  );
}
