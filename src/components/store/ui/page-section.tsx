import { useId, type ReactNode } from "react";
import { cn } from "cn";
import { SectionHeader } from "./section-header";

type PageSectionProps = {
  children: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function PageSection({ children, title, action, className }: PageSectionProps) {
  const titleId = useId();
  return (
    <section aria-labelledby={title ? titleId : undefined} className={cn("mt-11 max-[900px]:mt-[30px]", className)}>
      {title && <SectionHeader id={titleId} title={title} action={action} />}
      {children}
    </section>
  );
}
