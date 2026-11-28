import type { HTMLAttributes } from "react";
import { cn } from "cn";

const OFFSETS = {
  nav: "bottom-[72px]",
  edge: "bottom-3",
};

type MobileStickyBarProps = HTMLAttributes<HTMLDivElement> & {
  offset?: keyof typeof OFFSETS;
};

export function MobileStickyBar({ offset = "nav", className, ...props }: MobileStickyBarProps) {
  return (
    <div
      className={cn(
        "sticky z-30 mx-3.5 mt-4 hidden items-center gap-2 rounded-[18px] border border-[#f0ebe6] bg-white py-2 pr-2 pl-4 shadow-[0_14px_34px_-10px_rgba(34,21,16,0.4)] max-[900px]:flex [&_b]:font-heading [&_b]:text-[19px] [&_b]:leading-none [&_b]:font-extrabold [&_s]:text-xs [&_s]:text-[#a69b95]",
        OFFSETS[offset],
        className,
      )}
      {...props}
    />
  );
}
