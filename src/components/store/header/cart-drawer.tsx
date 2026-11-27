"use client";

import { CartEmpty } from "./cart-empty";
import { CartLineItem } from "./cart-line-item";
import { CartSummary } from "./cart-summary";
import { DrawerHeader } from "./drawer-header";
import { FreeDeliveryProgress } from "./free-delivery-progress";
import { useHeader } from "./header-provider";
import { Scrim } from "./scrim";
import { SideDrawer } from "./side-drawer";
import { useOverlay } from "./use-overlay";

export function CartDrawer() {
  const { panel, closePanel, lines, count, subtotal, changeQuantity, removeLine } = useHeader();
  const open = panel === "cart";
  const closeRef = useOverlay<HTMLButtonElement>(open, closePanel);

  if (!open) return null;

  return (
    <>
      <Scrim onClick={closePanel} />
      <SideDrawer side="right" aria-label="Your cart">
        <DrawerHeader closeLabel="Close cart" onClose={closePanel} closeRef={closeRef} className="px-5 py-[18px]">
          <b className="font-bold">
            Your cart <span className="text-xs font-medium text-ink-3">({count} items)</span>
          </b>
        </DrawerHeader>
        <FreeDeliveryProgress subtotal={subtotal} />
        <div className="flex-1 overflow-auto px-5 py-2">
          {lines.map((line) => (
            <CartLineItem
              key={line.product.id}
              line={line}
              onQuantityChange={(delta) => changeQuantity(line.product.id, delta)}
              onRemove={() => removeLine(line.product.id)}
            />
          ))}
          {lines.length === 0 && <CartEmpty onNavigate={closePanel} />}
        </div>
        {lines.length > 0 && <CartSummary subtotal={subtotal} onNavigate={closePanel} />}
      </SideDrawer>
    </>
  );
}
