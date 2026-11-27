import { cn } from "cn";

const BASE =
  "inline-flex h-[50px] items-center justify-center gap-2 whitespace-nowrap rounded-[14px] px-5 font-sans text-[14.5px] leading-none font-semibold transition-[transform,filter,border-color,color] duration-150 hover:-translate-y-px hover:brightness-[1.04]";

const VARIANTS = {
  primary: "bg-[linear-gradient(180deg,#ff7a2f,#ee5615)] text-white shadow-[0_10px_20px_-10px_rgba(238,86,21,0.7)] hover:text-white",
  ghost: "border-[1.5px] border-[#ece5df] bg-white text-ink hover:border-brand hover:text-brand-text",
};

export function storeButtonClass(variant: keyof typeof VARIANTS = "primary", className?: string) {
  return cn(BASE, VARIANTS[variant], className);
}
