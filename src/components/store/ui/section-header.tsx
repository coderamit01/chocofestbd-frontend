import type { ReactNode } from "react";
import { cn } from "cn";

type SectionHeaderProps = {
  title: ReactNode;
  id?: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({ title, id, action, className, titleClassName }: SectionHeaderProps) {
  return (
    <div className={cn("mb-[18px] flex flex-wrap items-center justify-between gap-4", className)}>
      <h2
        id={id}
        className={cn(
          "m-0 font-heading text-[26px] leading-[1.15] font-bold tracking-[-0.01em] text-ink max-[900px]:text-[21px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {action}
    </div>
  );
}
