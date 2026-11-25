import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DetailCardProps = {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function DetailCard({ title, action, className, children }: DetailCardProps) {
  return (
    <section className={cn("min-w-0 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5", className)}>
      <div className="mb-4.5 flex items-center justify-between gap-3">
        <h3 className="font-heading text-lg leading-[1.3] font-semibold text-ink">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function KeyValues({ rows }: { rows: { label: string; value: ReactNode; className?: string }[] }) {
  return (
    <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm max-[900px]:grid-cols-[100px_1fr]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-ink-3">{row.label}</dt>
          <dd className={cn("m-0 min-w-0 text-ink", row.className)}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
