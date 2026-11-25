import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
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
  const navClassName = buttonVariants({ variant: "outline", size: "icon-sm", className: "size-[38px] rounded-lg" });

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        Showing {pageSizeControl}
        <span>
          <span className="font-medium text-foreground">{from}</span>–<span className="font-medium text-foreground">{to}</span>{" "}
          of <span className="font-medium text-foreground">{total}</span>
        </span>
      </div>

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center gap-2">
          {page > 1 ? (
            <Link href={hrefFor(page - 1)} scroll={false} aria-label="Previous page" className={navClassName}>
              <ChevronLeftIcon />
            </Link>
          ) : (
            <span aria-disabled className={cn(navClassName, "pointer-events-none opacity-50")}>
              <ChevronLeftIcon />
            </span>
          )}

          {getPageItems(page, totalPages).map((item) =>
            typeof item === "number" ? (
              <Link
                key={item}
                href={hrefFor(item)}
                scroll={false}
                aria-current={item === page ? "page" : undefined}
                className={buttonVariants({
                  variant: item === page ? "default" : "outline",
                  size: "icon-sm",
                  className: "size-auto h-[38px] min-w-[38px] rounded-lg px-2.5 text-sm font-medium tabular-nums",
                })}
              >
                {item}
              </Link>
            ) : (
              <span key={item} className="px-1 text-sm text-muted-foreground">
                …
              </span>
            )
          )}

          {page < totalPages ? (
            <Link href={hrefFor(page + 1)} scroll={false} aria-label="Next page" className={navClassName}>
              <ChevronRightIcon />
            </Link>
          ) : (
            <span aria-disabled className={cn(navClassName, "pointer-events-none opacity-50")}>
              <ChevronRightIcon />
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
