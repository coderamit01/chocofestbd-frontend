import { Suspense } from "react";
import { BOTTOM_NAV_ITEMS } from "@/config/store-header";
import { ActiveBottomNav } from "./active-bottom-nav";
import { AnnouncementBar } from "./announcement-bar";
import { BottomNav } from "./bottom-nav";
import { CartDrawer } from "./cart-drawer";
import { HeaderProvider } from "./header-provider";
import { MainBar } from "./main-bar";
import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";
import { SideCart } from "./side-cart";

export function StoreHeader() {
  return (
    <HeaderProvider>
      <header className="relative z-40 font-sans text-ink">
        <AnnouncementBar />
        <MainBar />
        <MainNav />
        <SideCart />
        <CartDrawer />
        <MobileMenu />
        <Suspense fallback={<BottomNav items={BOTTOM_NAV_ITEMS} pathname={null} />}>
          <ActiveBottomNav items={BOTTOM_NAV_ITEMS} />
        </Suspense>
      </header>
    </HeaderProvider>
  );
}
