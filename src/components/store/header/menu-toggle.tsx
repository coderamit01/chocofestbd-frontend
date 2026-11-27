"use client";

import { Icon } from "@/components/shared/icon";
import { useHeader } from "./header-provider";
import { IconButton } from "./icon-button";

export function MenuToggle() {
  const { panel, openPanel } = useHeader();
  return (
    <IconButton
      aria-label="Open menu"
      aria-expanded={panel === "menu"}
      onClick={() => openPanel("menu")}
      className="order-2 -mr-1.5 hidden max-[900px]:inline-flex"
    >
      <Icon name="menu" size={22} strokeWidth={1.8} />
    </IconButton>
  );
}
