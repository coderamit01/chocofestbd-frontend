import { formatTaka } from "@/lib/utils";

type ProductPriceProps = { price: number; oldPrice?: number };

export function ProductPrice({ price, oldPrice }: ProductPriceProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-1.5">
      {oldPrice ? (
        <s className="font-sans text-[15px] leading-none font-normal text-ink-4 @max-[200px]:text-[12.5px]">
          {formatTaka(oldPrice)}
        </s>
      ) : null}
      <b className="font-sans text-[17px] leading-none font-semibold text-brand @max-[200px]:text-[15px]">
        {formatTaka(price)}
      </b>
    </div>
  );
}
