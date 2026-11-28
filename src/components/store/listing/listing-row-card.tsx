import Link from "next/link";
import { AddToCartButton } from "@/components/store/product/add-to-cart-button";
import { BuyNowLink } from "@/components/store/product/buy-now-link";
import { NotifyMeButton } from "@/components/store/product/notify-me-button";
import { ProductBadges } from "@/components/store/product/product-badges";
import { ProductImageLink } from "@/components/store/product/product-image-link";
import { ProductPrice } from "@/components/store/product/product-price";
import { WishlistButton } from "@/components/store/product/wishlist-button";
import { discountPercent, isInStock, isLowStock, productHref } from "@/lib/store-product";
import type { StoreProduct } from "@/types/store-product";

const ROW_IMAGE_SIZES = "(max-width: 700px) 120px, 170px";

export function ListingRowCard({ product }: { product: StoreProduct }) {
  const href = productHref(product);
  const inStock = isInStock(product);

  return (
    <article className="group/card @container relative flex min-w-0 flex-row flex-nowrap items-center gap-4 rounded-[16px] border border-[#f0ebe6] bg-white py-3.5 pr-4 pl-3.5 transition-[box-shadow,translate] duration-250 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-24px_rgba(61,17,4,0.45)] max-[700px]:gap-3 max-[700px]:py-2.5 max-[700px]:pr-3 max-[700px]:pl-2.5">
      <div className="m-0 w-[38%] max-w-[170px] flex-none max-[700px]:w-[120px]">
        <ProductImageLink href={href} src={product.image} alt={product.name} sizes={ROW_IMAGE_SIZES} outOfStock={!inStock} />
        <div className="pointer-events-none absolute top-0 left-0 z-[2] flex w-full items-start justify-between gap-2 *:pointer-events-auto">
          <ProductBadges discount={discountPercent(product)} tag={product.tag} />
          <WishlistButton productName={product.name} className="mt-2 ml-auto" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 self-stretch pt-[22px]">
        <Link
          href={href}
          title={product.name}
          className="line-clamp-2 font-sans text-[15px] leading-[1.3] font-medium text-ink no-underline hover:text-brand max-[700px]:text-[14px]"
        >
          {product.name}
        </Link>
        <ProductPrice price={product.price} oldPrice={product.oldPrice} />
        {isLowStock(product) && (
          <em className="w-full font-sans text-[11.5px] font-medium text-brand-text not-italic">
            Only {product.stock} left
          </em>
        )}
        {inStock ? (
          <div className="mt-1.5 grid grid-cols-2 gap-2 pt-1.5">
            <BuyNowLink />
            <AddToCartButton productId={product.id} productName={product.name} price={product.price} className="px-2.5" />
          </div>
        ) : (
          <NotifyMeButton productName={product.name} />
        )}
      </div>
    </article>
  );
}
