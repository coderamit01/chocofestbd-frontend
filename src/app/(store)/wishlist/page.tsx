import type { Metadata } from "next";
import { AccountShell } from "@/components/store/account/account-shell";
import { WishlistView } from "@/components/store/account/wishlist-view";
import { WISHLIST_PRODUCT_IDS } from "@/config/store-account";
import { productsByIds } from "@/lib/store-account";

export const metadata: Metadata = {
  title: "Wishlist | Chocofest BD",
};

export default function WishlistPage() {
  return (
    <AccountShell>
      <WishlistView products={productsByIds(WISHLIST_PRODUCT_IDS)} />
    </AccountShell>
  );
}
