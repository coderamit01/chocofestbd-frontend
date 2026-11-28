import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type HeroSearchProps = ComponentProps<"input"> & {
  children?: ReactNode;
  wrapperClassName?: string;
};

export function HeroSearch({ children, wrapperClassName, className, type = "search", ...props }: HeroSearchProps) {
  return (
    <div
      className={cn(
        "relative flex h-14 w-full max-w-[560px] items-center gap-2.5 rounded-[16px] border-[1.5px] border-[#e7e0da] bg-white pr-1.5 pl-[18px] text-[#8a7f79] focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(238,86,21,0.12)]",
        wrapperClassName,
      )}
    >
      <Icon
        name="search"
        size={18}
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-3"
      />
      <input
        type={type}
        className={cn(
          "h-full min-w-0 flex-1 rounded-[10px] border-0 bg-transparent pr-3.5 pl-[42px] font-sans text-[15px] leading-none font-normal text-ink outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-ink-4 focus:shadow-[0_0_0_3px_rgba(238,86,21,0.2)]",
          className,
        )}
        {...props}
      />
      {children}
    </div>
  );
}
