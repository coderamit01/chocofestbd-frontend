import Link from "next/link";
import type { ReactNode } from "react";
import type { ProductDetail } from "@/types/store-product-detail";
import { ProductActionToggles } from "./product-action-toggles";
import { ShareButtons } from "./share-buttons";

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="m-0 flex items-baseline gap-2 p-0 font-sans text-[13.5px] leading-[1.3]">
      <dt className="text-[#8a7f79]">{label}</dt>
      <dd className="m-0 font-semibold text-ink">{children}</dd>
    </div>
  );
}

export function ProductMeta({ detail }: { detail: ProductDetail }) {
  return (
    <div className="flex w-full flex-col items-stretch gap-3.5 border-t border-[#f0ebe6] pt-4 pb-0.5 text-[13.5px] text-ink-2">
      <dl className="m-0 flex w-full flex-wrap justify-start gap-x-7 gap-y-2 p-0 text-left">
        <MetaItem label="Brand">
          <Link href={detail.brandHref} className="text-brand-text no-underline hover:text-brand-text hover:underline">
            {detail.product.brand}
          </Link>
        </MetaItem>
        <MetaItem label="SKU">{detail.sku}</MetaItem>
      </dl>
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <ShareButtons url={detail.shareUrl} />
        <ProductActionToggles />
      </div>
    </div>
  );
}
