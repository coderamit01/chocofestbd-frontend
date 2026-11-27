"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CART_MAX_QUANTITY, SAMPLE_CART } from "@/config/store-header";
import type { CartLine } from "@/types/store";

type Panel = "cart" | "menu" | null;

type HeaderContextValue = {
  panel: Panel;
  openPanel: (panel: Exclude<Panel, null>) => void;
  closePanel: () => void;
  mobileSearchOpen: boolean;
  toggleMobileSearch: () => void;
  lines: CartLine[];
  count: number;
  subtotal: number;
  changeQuantity: (productId: number, delta: number) => void;
  removeLine: (productId: number) => void;
};

const HeaderContext = createContext<HeaderContextValue | null>(null);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>(SAMPLE_CART);

  const value = useMemo<HeaderContextValue>(() => {
    const clamp = (quantity: number) => Math.max(1, Math.min(CART_MAX_QUANTITY, quantity));
    return {
      panel,
      openPanel: setPanel,
      closePanel: () => setPanel(null),
      mobileSearchOpen,
      toggleMobileSearch: () => setMobileSearchOpen((open) => !open),
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
      changeQuantity: (productId, delta) =>
        setLines((current) =>
          current.map((line) =>
            line.product.id === productId ? { ...line, quantity: clamp(line.quantity + delta) } : line,
          ),
        ),
      removeLine: (productId) => setLines((current) => current.filter((line) => line.product.id !== productId)),
    };
  }, [panel, mobileSearchOpen, lines]);

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useHeader must be used inside HeaderProvider");
  return context;
}
