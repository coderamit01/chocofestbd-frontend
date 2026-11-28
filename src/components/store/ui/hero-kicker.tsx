import type { HTMLAttributes } from "react";
import { cn } from "cn";

export function HeroKicker({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex self-start rounded-full bg-brand-50 px-[11px] py-[7px] font-sans text-xs leading-none font-semibold tracking-[0.08em] text-brand-text uppercase",
        className,
      )}
      {...props}
    />
  );
}
