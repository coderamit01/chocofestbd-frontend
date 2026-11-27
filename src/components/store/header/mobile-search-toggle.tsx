"use client";

import { Icon } from "@/components/shared/icon";
import { useHeader } from "./header-provider";
import { IconButton } from "./icon-button";

export function MobileSearchToggle() {
  const { mobileSearchOpen, toggleMobileSearch } = useHeader();
  return (
    <IconButton
      aria-label="Search"
      aria-expanded={mobileSearchOpen}
      onClick={toggleMobileSearch}
      className="hidden max-[900px]:inline-flex"
    >
      <Icon name="search" size={22} strokeWidth={1.8} />
    </IconButton>
  );
}
