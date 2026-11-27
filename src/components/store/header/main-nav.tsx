import { Suspense } from "react";
import { Container } from "@/components/store/shared/container";
import { MAIN_NAV_LINKS, STORE_CATEGORIES } from "@/config/store-header";
import { ActiveNavLinks } from "./active-nav-links";
import { CategoryMegaMenu } from "./category-mega-menu";
import { NavLinks } from "./nav-links";

export function MainNav() {
  return (
    <nav
      aria-label="Shop"
      className="border-b border-[#f0ebe6] bg-white shadow-[0_6px_16px_-14px_rgba(61,17,4,0.35)] max-[900px]:hidden"
    >
      <Container className="relative flex h-14 items-center gap-6">
        <CategoryMegaMenu categories={STORE_CATEGORIES} />
        <Suspense fallback={<NavLinks links={MAIN_NAV_LINKS} pathname={null} />}>
          <ActiveNavLinks links={MAIN_NAV_LINKS} />
        </Suspense>
      </Container>
    </nav>
  );
}
