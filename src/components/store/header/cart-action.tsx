"use client";

import { Icon } from "@/components/shared/icon";
import { CountBadge } from "./count-badge";
import { HeaderActionButton } from "./header-action";
import { useHeader } from "./header-provider";
import { IconButton } from "./icon-button";

export function CartAction() {
  const { count, panel, openPanel } = useHeader();
  const label = `Cart, ${count} items`;

  return (
    <>
      <HeaderActionButton
        icon="cart"
        label="Cart"
        badge={count}
        aria-label={label}
        aria-expanded={panel === "cart"}
        onClick={() => openPanel("cart")}
      />
      <IconButton
        aria-label={label}
        aria-expanded={panel === "cart"}
        onClick={() => openPanel("cart")}
        className="hidden max-[900px]:inline-flex"
      >
        <Icon name="cart" size={22} strokeWidth={1.8} />
        <CountBadge count={count} className="-top-1 -right-1.5" />
      </IconButton>
    </>
  );
}
