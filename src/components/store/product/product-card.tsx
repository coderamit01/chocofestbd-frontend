import Link from "next/link";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { AddToCartButton } from "@/components/store/product/add-to-cart-button";
import { BuyNowLink } from "@/components/store/product/buy-now-link";
import { NotifyMeButton } from "@/components/store/product/notify-me-button";
import { ProductBadges } from "@/components/store/product/product-badges";
import { ProductImageLink } from "@/components/store/product/product-image-link";
import { ProductPrice } from "@/components/store/product/product-price";
import { WishlistButton } from "@/components/store/product/wishlist-button";
import { discountPercent, isInStock, isLowStock, productHref } from "@/lib/store-product";
import type { StoreProduct } from "@/types/store-product";

type ProductCardProps = {
  product: StoreProduct;
  sizes?: string;
  className?: string;
};

const DEFAULT_SIZES = "(max-width: 900px) 40vw, (max-width: 1180px) 30vw, 240px";

export function ProductCard({ product, sizes = DEFAULT_SIZES, className }: ProductCardProps) {
  const href = productHref(product);
  const inStock = isInStock(product);

  return (
    <article
      className={cn(
        "group/card @container relative flex min-w-0 flex-col rounded-xl border border-[#f0ebe6] bg-white px-2 pt-2 pb-3 transition-[box-shadow,translate] duration-250 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-24px_rgba(61,17,4,0.45)]",
        className,
      )}
    >
      <div className="mb-1">
        <ProductImageLink href={href} src={product.image} alt={product.name} sizes={sizes} outOfStock={!inStock} />
        <div className="pointer-events-none absolute top-0 right-2 left-0 z-[2] flex items-start justify-between gap-2 *:pointer-events-auto">
          <ProductBadges discount={discountPercent(product)} tag={product.tag} />
          <WishlistButton className="mt-2 ml-auto" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1 pt-2.5">
        <Link
          href={href}
          title={product.name}
          className="truncate font-sans text-[16px] leading-[1.3] font-medium text-ink no-underline hover:text-brand @max-[200px]:text-[14px]"
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
          <div className="mt-auto grid grid-cols-2 gap-2 pt-1.5 @max-[200px]:grid-cols-[1fr_40px] @max-[200px]:gap-1.5">
            <BuyNowLink className="@max-[200px]:h-9" />
            <AddToCartButton
              productName={product.name}
              icon={<Icon name="cart" size={16} strokeWidth={1.8} className="hidden @max-[200px]:block" />}
              className="@max-[200px]:h-9 @max-[200px]:w-10 @max-[200px]:px-0"
              labelClassName="@max-[200px]:hidden"
            />
          </div>
        ) : (
          <NotifyMeButton productName={product.name} />
        )}
      </div>
    </article>
  );
}
