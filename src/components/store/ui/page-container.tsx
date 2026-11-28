import type { HTMLAttributes } from "react";
import { cn } from "cn";

type PageContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "header" | "article";
  page?: boolean;
};

export function PageContainer({ as: Tag = "div", page, className, ...props }: PageContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1320px] px-6 max-[900px]:px-3.5", page && "pb-10", className)}
      {...props}
    />
  );
}
