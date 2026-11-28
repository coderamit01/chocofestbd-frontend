import type { ReactNode } from "react";

type AccountHeadingProps = {
  title: ReactNode;
  children?: ReactNode;
};

export function AccountHeading({ title, children }: AccountHeadingProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="m-0 font-heading text-[28px] leading-[1.15] font-bold text-ink max-[900px]:text-[22px]">{title}</h1>
      {children}
    </div>
  );
}
