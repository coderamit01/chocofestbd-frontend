import type { ReactNode } from "react";
import { OrderLineItem } from "@/components/store/checkout/order-line-item";
import { StoreCard } from "@/components/store/ui/store-card";
import { StoreCardTitle } from "@/components/store/ui/store-card-title";
import type { CartLine } from "@/types/store-cart";

type DetailItem = {
  label: string;
  value: ReactNode;
};

type OrderDeliveryDetailsProps = {
  details: DetailItem[];
  lines: CartLine[];
};

export function OrderDeliveryDetails({ details, lines }: OrderDeliveryDetailsProps) {
  return (
    <StoreCard as="section">
      <StoreCardTitle>Delivery details</StoreCardTitle>
      <dl className="mt-0 mb-3.5 flex flex-col">
        {details.map((detail) => (
          <div key={detail.label} className="border-b border-dashed border-[#f0ebe6] py-[11px]">
            <dt className="mb-[3px] text-xs text-[#8a7f79]">{detail.label}</dt>
            <dd className="m-0 text-sm leading-[1.5]">{detail.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2.5">
        {lines.map((line) => (
          <OrderLineItem key={line.product.id} line={line} showSize={false} />
        ))}
      </div>
    </StoreCard>
  );
}
