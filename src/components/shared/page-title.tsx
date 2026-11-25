import type { ReactNode } from "react";

type PageTitleProps = {
  title: string;
  actions?: ReactNode;
};

export function PageTitle({ title, actions }: PageTitleProps) {
  return (
    <header className="flex flex-wrap items-center gap-4 pt-[22px] pb-0.5 max-[900px]:pt-2">
      <h1 className="min-w-[180px] flex-1 font-heading text-title text-ink max-[900px]:text-2xl">{title}</h1>
      {actions}
    </header>
  );
}
