import { StoreButton } from "@/components/store/ui/store-button";

type LoadMoreProps = {
  shown: number;
  total: number;
  href?: string;
};

export function LoadMore({ shown, total, href }: LoadMoreProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 pt-[18px] pb-1 font-sans text-[13px] text-[#8a7f79]">
      <span>
        Showing {shown} of {total}
      </span>
      <span
        role="progressbar"
        aria-label="Products shown"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={shown}
        className="h-1 w-[220px] overflow-hidden rounded-[9px] bg-[#ebe4de]"
      >
        <i className="block h-full rounded-[9px] bg-brand" style={{ width: `${total ? (shown / total) * 100 : 0}%` }} />
      </span>
      {href && (
        <StoreButton href={href} scroll={false} variant="ghost">
          Load more products
        </StoreButton>
      )}
    </div>
  );
}
