import type { HTMLAttributes } from "react";
import { cn } from "cn";

export function storeCardClass(className?: string) {
  return cn(
    "rounded-[22px] border border-[#f0ebe6] bg-white p-6 max-[900px]:rounded-[18px] max-[900px]:px-4 max-[900px]:py-[18px]",
    className,
  );
}

type StoreCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "aside";
};

export function StoreCard({ as: Tag = "div", className, ...props }: StoreCardProps) {
  return <Tag className={storeCardClass(className)} {...props} />;
}
