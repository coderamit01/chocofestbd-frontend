import Link from "next/link";
import type { ProductDetail } from "@/types/store-product-detail";
import { AddedToCartNotice } from "./added-to-cart-notice";
import { ProductBuyRow } from "./product-buy-row";
import { ProductMeta } from "./product-meta";
import { ProductPriceBlock } from "./product-price-block";
import { ProductQuantity } from "./product-quantity";
import { ProductTrust } from "./product-trust";
import { WhatsappOrderRow } from "./whatsapp-order-row";

export function ProductInfo({ detail }: { detail: ProductDetail }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-[24px] border border-[#f0ebe6] bg-white px-[30px] py-7 max-[900px]:-mx-3.5 max-[900px]:gap-3 max-[900px]:rounded-[0_0_26px_26px] max-[900px]:border-0 max-[900px]:px-4 max-[900px]:py-[22px]">
      <Link
        href={detail.categoryHref}
        className="self-start font-sans text-[13px] leading-none font-semibold tracking-[0.06em] text-brand-text uppercase no-underline hover:text-brand-text max-[900px]:pt-2.5"
      >
        {detail.brandLine}
      </Link>
      <div className="flex items-start justify-between gap-3 max-[900px]:items-center">
        <h1 className="m-0 min-w-0 flex-1 font-heading text-[34px] leading-[1.12] font-bold tracking-[-0.02em] text-ink max-[900px]:text-[21px] max-[900px]:leading-[1.2]">
          {detail.title}
        </h1>
        <ProductQuantity compact />
      </div>
      <ProductPriceBlock detail={detail} />
      <ProductBuyRow price={detail.product.price} />
      <WhatsappOrderRow detail={detail} />
      <AddedToCartNotice detail={detail} />
      <ProductMeta detail={detail} />
      <ProductTrust />
    </div>
  );
}
