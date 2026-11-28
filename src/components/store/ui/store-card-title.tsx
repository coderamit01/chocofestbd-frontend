import type { HTMLAttributes } from "react";
import { cn } from "cn";

const SIZES = {
  md: "mb-4 text-[19px]",
  sm: "mb-2.5 text-base",
};

type StoreCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3";
  size?: keyof typeof SIZES;
};

export function StoreCardTitle({ as: Tag = "h2", size = "md", className, ...props }: StoreCardTitleProps) {
  return (
    <Tag
      className={cn("mt-0 font-heading leading-[1.2] font-bold tracking-normal text-ink", SIZES[size], className)}
      {...props}
    />
  );
}
