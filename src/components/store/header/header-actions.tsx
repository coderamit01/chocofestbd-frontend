import { STORE_ROUTES, WISHLIST_COUNT } from "@/config/store-header";
import { CartAction } from "./cart-action";
import { HeaderActionLink } from "./header-action";
import { MobileSearchToggle } from "./mobile-search-toggle";

export function HeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-1 max-[900px]:order-1">
      <MobileSearchToggle />
      <HeaderActionLink href={STORE_ROUTES.trackOrder} icon="truck" label="Track order" />
      <HeaderActionLink href={STORE_ROUTES.login} icon="user" label="Sign in" />
      <HeaderActionLink
        href={STORE_ROUTES.wishlist}
        icon="heart"
        label="Wishlist"
        badge={WISHLIST_COUNT}
        aria-label={`Wishlist, ${WISHLIST_COUNT} items`}
      />
      <CartAction />
    </div>
  );
}
