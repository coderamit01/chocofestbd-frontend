import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/store/product/add-to-cart-button";
import { BuyNowLink } from "@/components/store/product/buy-now-link";
import { discountPercent, productHref } from "@/lib/store-product";
import { formatTaka } from "@/lib/utils";
import type { StoreProduct } from "@/types/store-product";

export function OfferCard({ product }: { product: StoreProduct }) {
  const href = productHref(product);

  return (
    <article className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-[20px] border border-[#f0ebe6] bg-white p-3 transition-[box-shadow,translate] duration-250 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-24px_rgba(61,17,4,.45)] max-[900px]:rounded-2xl">
      <Link href={href} className="block h-[84px] w-[84px] flex-[0_0_84px]">
        <Image
          src={product.image}
          alt={product.name}
          width={84}
          height={84}
          className="block h-full w-full object-contain drop-shadow-[0_10px_10px_rgba(61,17,4,.16)] transition-transform duration-400 ease-[ease] group-hover:scale-106"
        />
        <span className="absolute top-0 left-0 z-1 rounded-[20px_0_10px_0] bg-[#e8322b] px-2.5 py-1.5 font-sans text-[11.5px] leading-none font-semibold text-white max-[900px]:rounded-[16px_0_10px_0]">
          -{discountPercent(product)}%
        </span>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Link
          href={href}
          className="truncate font-sans text-[14.5px] leading-[1.3] font-medium text-ink no-underline hover:text-brand max-[900px]:text-[13px]"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <b className="font-sans text-base leading-none font-semibold text-brand">{formatTaka(product.price)}</b>
          {product.oldPrice ? (
            <s className="text-[13px] leading-normal text-[#8a7f79]">{formatTaka(product.oldPrice)}</s>
          ) : null}
        </div>
        <div className="mt-1 grid grid-cols-2 gap-1.5">
          <BuyNowLink className="h-[34px] px-1.5 text-[12.5px]" />
          <AddToCartButton productId={product.id} productName={product.name} price={product.price} className="h-[34px] px-1.5 text-[12.5px]" />
        </div>
      </div>
    </article>
  );
}
