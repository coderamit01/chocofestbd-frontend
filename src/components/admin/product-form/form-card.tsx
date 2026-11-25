import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProductFormValues } from "@/types/product";

export type SectionProps = {
  values: ProductFormValues;
  set: (patch: Partial<ProductFormValues>) => void;
  errors: Record<string, string>;
};

type FormCardProps = {
  title: string;
  description?: string;
  aside?: ReactNode;
  titleId?: string;
  className?: string;
  children: ReactNode;
};

export function FormCard({ title, description, aside, titleId, className, children }: FormCardProps) {
  return (
    <section className={cn("rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5", className)} aria-labelledby={titleId}>
      <div className="mb-4.5 flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 id={titleId} className="font-heading text-lg leading-[1.3] font-semibold text-ink">
            {title}
          </h3>
          {description && <p className="text-[12.5px] text-ink-3">{description}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
