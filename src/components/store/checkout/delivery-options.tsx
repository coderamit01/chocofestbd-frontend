import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { ChoiceOption } from "@/components/store/checkout/choice-option";
import { activeDeliveryZones } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";
import type { DeliveryZoneId } from "@/types/store-cart";

type DeliveryOptionsProps = {
  value: DeliveryZoneId;
  onChange: (zone: DeliveryZoneId) => void;
};

export function DeliveryOptions({ value, onChange }: DeliveryOptionsProps) {
  return (
    <div role="radiogroup" aria-label="Delivery option" className="flex flex-col gap-2.5">
      {activeDeliveryZones().map((zone) => {
        const selected = zone.id === value;
        return (
          <ChoiceOption
            key={zone.id}
            selected={selected}
            title={zone.name}
            description={`${zone.areas} · ${zone.days}`}
            onSelect={() => onChange(zone.id)}
            leading={
              <span
                className={cn(
                  "flex size-[42px] flex-none items-center justify-center rounded-[12px] max-[900px]:size-9",
                  selected ? "bg-white text-brand" : "bg-[#f6f3f0] text-ink-2",
                )}
              >
                <Icon name={zone.icon} size={20} strokeWidth={1.8} />
              </span>
            }
            trailing={
              <span className="font-heading text-[15px] leading-none font-bold">
                {zone.charge ? formatTaka(zone.charge) : "FREE"}
              </span>
            }
          />
        );
      })}
    </div>
  );
}
