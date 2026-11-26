import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";

type DataPaginationProps = {
  meta: PaginationMeta;
  pathname: string;
  query?: Record<string, string | undefined>;
  pageSizeControl?: ReactNode;
};

type PageItem = number | `ellipsis-${number}`;

function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = [1, current - 1, current, current + 1, total]
    .filter((page, index, list) => page >= 1 && page <= total && list.indexOf(page) === index)
    .sort((a, b) => a - b);

  return pages.flatMap((page, index): PageItem[] =>
    index > 0 && page - pages[index - 1] > 1 ? [`ellipsis-${page}`, page] : [page]
  );
}

export function DataPagination({ meta, pathname, query = {}, pageSizeControl }: DataPaginationProps) {
  const { page, limit, total, totalPages } = meta;

  if (total === 0) return null;

  const hrefFor = (target: number) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    if (target > 1) params.set("page", String(target));

    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
  };

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const pageClass = (on: boolean) =>
    cn(
      "inline-flex h-[38px] min-w-[38px] items-center justify-center rounded-[10px] border px-2.5 text-sm leading-none font-medium tabular-nums transition-colors",
      on ? "border-brand bg-brand text-white hover:text-white" : "border-line-2 bg-surface text-ink hover:bg-surface-2 hover:text-ink"
    );
  const disabledClass = cn(pageClass(false), "cursor-default text-ink-4 hover:bg-surface hover:text-ink-4");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink-3">
      <span className="flex items-center gap-2.5">
        Showing {pageSizeControl}
        <span>
          {from}–{to} of {total}
        </span>
      </span>

      <nav aria-label="Pagination" className="flex gap-2">
        {page > 1 ? (
          <Link href={hrefFor(page - 1)} scroll={false} aria-label="Previous page" className={pageClass(false)}>
            <Icon name="chevronLeft" size={16} strokeWidth={1.8} />
          </Link>
        ) : (
          <span aria-disabled className={disabledClass}>
            <Icon name="chevronLeft" size={16} strokeWidth={1.8} />
          </span>
        )}

        {getPageItems(page, Math.max(1, totalPages)).map((item) =>
          typeof item === "number" ? (
            <Link
              key={item}
              href={hrefFor(item)}
              scroll={false}
              aria-current={item === page ? "page" : undefined}
              className={pageClass(item === page)}
            >
              {item}
            </Link>
          ) : (
            <span key={item} className="inline-flex h-[38px] items-center px-1 text-ink-3">
              …
            </span>
          )
        )}

        {page < totalPages ? (
          <Link href={hrefFor(page + 1)} scroll={false} aria-label="Next page" className={pageClass(false)}>
            <Icon name="chevronRight" size={16} strokeWidth={1.8} />
          </Link>
        ) : (
          <span aria-disabled className={disabledClass}>
            <Icon name="chevronRight" size={16} strokeWidth={1.8} />
          </span>
        )}
      </nav>
    </div>
  );
}
