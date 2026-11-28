import { StoreCard } from "@/components/store/ui/store-card";
import { ProductThumb } from "@/components/store/ui/product-thumb";
import { orderItemsLabel, productsByIds } from "@/lib/store-account";
import { formatTaka } from "@/lib/utils";
import type { CustomerOrder, OrderTone } from "@/types/store-order";
import { OrderActions } from "./order-actions";
import { StatusPill, type StatusPillTone } from "./status-pill";

const PILL_TONES: Record<OrderTone, StatusPillTone> = {
  live: "on",
  ok: "ok",
  no: "no",
};

export function OrderCard({ order }: { order: CustomerOrder }) {
  return (
    <StoreCard as="article" className="px-5 py-[18px] max-[900px]:p-3.5">
      <div className="flex items-center justify-between gap-2.5 border-b border-dashed border-[#f0ebe6] pb-3.5">
        <span className="flex flex-col gap-0.5">
          <b className="text-[15px]">{order.number}</b>
          <small className="text-[12.5px] text-[#8a7f79]">
            {order.date} · {orderItemsLabel(order)} · {order.payment}
          </small>
        </span>
        <StatusPill tone={PILL_TONES[order.tone]}>{order.status}</StatusPill>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-3.5">
        <div className="flex gap-1.5">
          {productsByIds(order.productIds).map((product) => (
            <ProductThumb key={product.id} src={product.image} alt={product.name} className="bg-[#f6f1ed]" />
          ))}
        </div>
        <b className="mr-auto font-heading text-lg leading-none font-bold">{formatTaka(order.total)}</b>
        <OrderActions order={order} />
      </div>
    </StoreCard>
  );
}
