import type { ReactNode } from "react";
import { cn } from "cn";

type SectionHeadingProps = {
  title: ReactNode;
  id?: string;
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({ title, id, actions, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-[18px] flex flex-wrap items-center justify-between gap-4", className)}>
      <SectionTitle id={id}>{title}</SectionTitle>
      {actions}
    </div>
  );
}

export function SectionTitle({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className={cn(
        "relative m-0 inline-flex items-center gap-3 font-heading text-[26px] leading-[1.15] font-bold tracking-[-0.01em] text-ink before:h-[1.05em] before:w-[5px] before:flex-none before:rounded-full before:bg-brand before:content-[''] max-[900px]:text-[21px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
