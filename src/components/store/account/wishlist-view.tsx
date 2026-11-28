import { ProductGrid } from "@/components/store/ui/product-grid";
import type { StoreProduct } from "@/types/store-product";
import { AccountEmpty } from "./account-empty";
import { AccountHeading } from "./account-heading";
import { AddAllToCartButton } from "./add-all-to-cart-button";
import { WishlistNote } from "./wishlist-note";

export function WishlistView({ products }: { products: StoreProduct[] }) {
  return (
    <>
      <AccountHeading
        title={
          <>
            Wishlist <span className="font-sans text-base text-[#8a7f79]">({products.length})</span>
          </>
        }
      >
        {products.length > 0 && <AddAllToCartButton />}
      </AccountHeading>
      <WishlistNote>We’ll SMS you when a saved item drops in price or comes back in stock.</WishlistNote>
      {products.length ? (
        <ProductGrid products={products} columns={3} wishlisted />
      ) : (
        <AccountEmpty
          icon="heart"
          title="Your wishlist is empty"
          description="Tap the heart on any chocolate to save it here for later."
          actionLabel="Browse chocolates"
          actionHref="/shop"
        />
      )}
    </>
  );
}
