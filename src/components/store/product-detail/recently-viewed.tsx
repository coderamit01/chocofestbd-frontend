"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/shared/icon";
import { PageSection } from "@/components/store/ui/page-section";
import type { StoreProduct } from "@/types/store-product";
import { ProductRailRow } from "./product-rail-row";

export function RecentlyViewed({ products }: { products: StoreProduct[] }) {
  const [visible, setVisible] = useState(true);
  if (!visible || !products.length) return null;

  const clear = () => {
    setVisible(false);
    toast.success("History cleared", { description: "Recently viewed products removed" });
  };

  return (
    <PageSection
      title="Recently viewed"
      action={
        <button
          type="button"
          onClick={clear}
          className="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-sans text-sm font-semibold text-brand-text hover:text-brand"
        >
          Clear history
          <Icon name="chevronRight" size={16} strokeWidth={1.8} />
        </button>
      }
    >
      <ProductRailRow products={products} />
    </PageSection>
  );
}
