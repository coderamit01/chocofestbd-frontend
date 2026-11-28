import { Icon } from "@/components/shared/icon";
import { InitialsAvatar } from "@/components/store/account/initials-avatar";
import { storeButtonClass } from "@/components/store/ui/store-button";
import { StoreCard } from "@/components/store/ui/store-card";
import type { TrackRider } from "@/types/store-order";

export function TrackRiderCard({ rider }: { rider: TrackRider }) {
  return (
    <StoreCard className="col-span-full flex items-center gap-3.5">
      <InitialsAvatar initials={rider.initials} className="size-[52px] bg-choco" />
      <span className="flex flex-1 flex-col gap-0.5">
        <b className="text-[15px]">{rider.name}</b>
        <small className="text-[12.5px] text-[#8a7f79]">{rider.vehicle}</small>
        <small className="text-[12.5px] text-[#8a7f79]">{rider.rating}</small>
      </span>
      <a href={`tel:${rider.phone}`} className={storeButtonClass({ size: "md" })}>
        <Icon name="phone" size={16} strokeWidth={1.8} />
        Call
      </a>
    </StoreCard>
  );
}
