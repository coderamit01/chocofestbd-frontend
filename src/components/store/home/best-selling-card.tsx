import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { AddToCartButton } from "@/components/store/product/add-to-cart-button";
import { BuyNowLink } from "@/components/store/product/buy-now-link";
import { productHref } from "@/lib/store-product";
import { formatTaka } from "@/lib/utils";
import type { StoreProduct } from "@/types/store-product";

type BestSellingCardProps = { product: StoreProduct; ribbon?: string };

export function BestSellingCard({ product, ribbon }: BestSellingCardProps) {
  const href = productHref(product);
  const { oldPrice } = product;

  return (
    <article className="group @container relative grid min-h-[220px] grid-cols-[42%_1fr] items-center gap-3.5 rounded-xl bg-white pt-7 pr-[18px] pb-[18px] pl-2.5 shadow-[0_1px_2px_rgba(34,21,16,.04)] transition-[box-shadow,translate] duration-250 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-24px_rgba(61,17,4,.45)] max-[1280px]:grid-cols-[38%_1fr] max-[700px]:min-h-0 max-[700px]:grid-cols-[120px_1fr] max-[700px]:px-3 max-[700px]:pb-3.5">
      {ribbon && (
        <span className="absolute top-0 left-0 z-1 inline-flex items-center gap-1 rounded-[12px_0_8px_0] bg-[#e8322b] px-[9px] py-[5px] font-sans text-[11.5px] leading-none font-semibold text-white">
          <Icon name="flame" size={12} strokeWidth={2.4} />
          {ribbon}
        </span>
      )}
      <Link href={href} className="relative block aspect-square overflow-hidden rounded-[14px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 700px) 120px, 180px"
          className="block object-contain p-[8%] drop-shadow-[0_10px_12px_rgba(61,17,4,.16)] transition-transform duration-500 ease-[ease] group-hover:scale-106"
        />
      </Link>
      <div className="flex min-w-0 flex-col items-start gap-2">
        <Link
          href={href}
          className="line-clamp-2 max-w-full font-sans text-[17px] leading-[1.35] font-medium text-ink no-underline hover:text-brand max-[700px]:text-[15px] @max-[440px]:text-base"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-3">
          <b className="font-sans text-[18px] leading-none font-semibold text-brand max-[700px]:text-base">
            {formatTaka(product.price)}
          </b>
          {oldPrice ? (
            <s className="font-sans text-base leading-none font-normal text-[#8a7f79] max-[700px]:text-sm">
              {formatTaka(oldPrice)}
            </s>
          ) : null}
        </div>
        {oldPrice ? (
          <span className="rounded-full bg-[#b8d72a] px-[9px] py-1 font-sans text-[11.5px] leading-none font-medium text-[#2c3a00]">
            Save {formatTaka(oldPrice - product.price)}
          </span>
        ) : null}
        <div className="mt-2.5 grid w-full max-w-[280px] grid-cols-2 gap-2 max-[700px]:mt-1">
          <BuyNowLink className="h-[38px] px-2 text-[13.5px]" />
          <AddToCartButton productId={product.id} productName={product.name} price={product.price} className="h-[38px] px-2 text-[13.5px]" />
        </div>
      </div>
    </article>
  );
}
