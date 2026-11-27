"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { MOBILE_MENU_LINKS, STORE_CATEGORIES, STORE_HOTLINE, STORE_ROUTES } from "@/config/store-header";
import { CategoryTile } from "./category-tile";
import { DrawerHeader } from "./drawer-header";
import { useHeader } from "./header-provider";
import { HotTag } from "./hot-tag";
import { MobileCategoryAccordion } from "./mobile-category-accordion";
import { Scrim } from "./scrim";
import { SectionLabel } from "./section-label";
import { SideDrawer } from "./side-drawer";
import { storeButtonClass } from "./store-button";
import { useOverlay } from "./use-overlay";

export function MobileMenu() {
  const { panel, closePanel } = useHeader();
  const open = panel === "menu";
  const closeRef = useOverlay<HTMLButtonElement>(open, closePanel);

  if (!open) return null;

  return (
    <>
      <Scrim onClick={closePanel} />
      <SideDrawer side="left" aria-label="Menu" className="gap-4 overflow-auto p-4">
        <DrawerHeader closeLabel="Close menu" onClose={closePanel} closeRef={closeRef} className="pb-3.5">
          <Image src="/brand/logo.png" alt="ChocoFest BD" width={641} height={360} className="h-11 w-auto" />
        </DrawerHeader>

        <Link
          href={STORE_ROUTES.login}
          onClick={closePanel}
          className="flex items-center gap-3 rounded-xl bg-[#fff8f3] p-3 text-ink hover:text-ink"
        >
          <CategoryTile icon="user" tone="brand" size={44} />
          <span className="flex flex-col gap-0.5">
            <b className="font-semibold">Sign in or create account</b>
            <span className="text-xs text-ink-3">Track orders &amp; save addresses</span>
          </span>
        </Link>

        <SectionLabel className="px-1 py-0">Categories</SectionLabel>
        <MobileCategoryAccordion categories={STORE_CATEGORIES} onNavigate={closePanel} />

        <div className="flex flex-col gap-0.5">
          {MOBILE_MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closePanel}
              className="flex items-center gap-3 border-t border-[#f4efeb] px-1 py-3 font-sans text-[14.5px] leading-none font-medium text-ink hover:text-ink"
            >
              <Icon name={link.icon} size={18} strokeWidth={1.8} />
              {link.label}
              {link.tag && <HotTag label={link.tag} />}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-[#f0ebe6] pt-3">
          <Link
            href={STORE_ROUTES.trackOrder}
            onClick={closePanel}
            className={storeButtonClass("ghost", "h-[42px] flex-1")}
          >
            <Icon name="truck" size={16} strokeWidth={1.8} />
            Track order
          </Link>
          <a href={STORE_HOTLINE.href} className={storeButtonClass("ghost", "h-[42px] flex-1")}>
            <Icon name="phone" size={16} strokeWidth={1.8} />
            Call us
          </a>
        </div>
      </SideDrawer>
    </>
  );
}
