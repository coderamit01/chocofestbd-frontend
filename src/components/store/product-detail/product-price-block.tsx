import { formatTaka } from "@/lib/utils";
import type { ProductDetail } from "@/types/store-product-detail";

export function ProductPriceBlock({ detail }: { detail: ProductDetail }) {
  const { price, oldPrice } = detail.product;

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-3 pt-1">
        <b className="font-heading text-[36px] leading-none font-extrabold text-ink max-[900px]:text-[30px]">
          {formatTaka(price)}
        </b>
        {oldPrice ? <s className="text-[17px] text-[#a69b95]">{formatTaka(oldPrice)}</s> : null}
        {detail.savings > 0 && (
          <span className="rounded-lg bg-[#e6f6ec] px-2.5 py-[5px] font-sans text-[13px] leading-none font-semibold text-[#1f8a4c]">
            Save {formatTaka(detail.savings)}
          </span>
        )}
      </div>
      <p className="m-0 -mt-1.5 text-[12.5px] text-[#8a7f79]">
        VAT included{detail.unitPriceNote && ` · ${detail.unitPriceNote}`}
      </p>
    </>
  );
}
