import { StatusPill } from "@/components/store/account/status-pill";
import { StoreCard } from "@/components/store/ui/store-card";
import type { TrackedOrder } from "@/types/store-order";
import { TrackItemsCard } from "./track-items-card";
import { TrackProgress } from "./track-progress";
import { TrackRiderCard } from "./track-rider-card";
import { TrackUpdates } from "./track-updates";

export function TrackResult({ order }: { order: TrackedOrder }) {
  return (
    <section aria-label={`Order ${order.number} status`} className="flex min-w-0 flex-col gap-4">
      <StoreCard>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <span className="text-[12.5px] text-[#8a7f79]">
              Order {order.number} · {order.placed}
            </span>
            <h2 className="my-1 font-heading text-[26px] leading-[1.15] font-bold text-ink max-[900px]:text-[21px]">
              {order.headline}
            </h2>
            <p className="m-0 text-sm text-ink-2">
              Arriving <b className="text-[#1f8a4c]">{order.eta}</b>
            </p>
          </div>
          <StatusPill tone="on">{order.status}</StatusPill>
        </div>
        <TrackProgress stages={order.stages} />
      </StoreCard>
      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <TrackRiderCard rider={order.rider} />
        <TrackUpdates updates={order.updates} />
        <TrackItemsCard title={order.itemsSummary} lines={order.lines} />
      </div>
    </section>
  );
}
