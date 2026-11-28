import Link from "next/link";
import { cn } from "cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("pt-[18px] pb-1.5 font-sans text-[13px] text-[#8a7f79]", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {current || !item.href ? (
                <b aria-current={current ? "page" : undefined} className="font-medium text-ink">
                  {item.label}
                </b>
              ) : (
                <Link href={item.href} className="text-[#8a7f79] no-underline hover:text-brand">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
