import { cn } from "cn";
import { CART_ZONES } from "@/config/store-cart";
import type { CartZone } from "@/types/store-cart";

type DeliveryAreaPickerProps = {
  value: CartZone;
  fees: Record<CartZone, string>;
  onChange: (zone: CartZone) => void;
};

export function DeliveryAreaPicker({ value, fees, onChange }: DeliveryAreaPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-xs leading-none font-semibold tracking-[0.06em] text-[#8a7a72] uppercase">
        Delivery area
      </span>
      <div role="radiogroup" aria-label="Delivery area" className="flex flex-col gap-2">
        {CART_ZONES.map((zone) => {
          const on = zone.id === value;
          const free = fees[zone.id] === "FREE";
          return (
            <button
              key={zone.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(zone.id)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-[14px] border-[1.5px] px-3.5 py-3 text-left transition-[border-color,background-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(238,86,21,0.3)]",
                on ? "border-brand bg-[#fffaf7]" : "border-[#ece4de] bg-white hover:border-[#ffd0b5]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-[18px] flex-none rounded-full border-2 bg-white transition-[border-color,box-shadow] duration-150",
                  on ? "border-brand shadow-[inset_0_0_0_3px_#fff,inset_0_0_0_9px_#ee5615]" : "border-[#cfc4bd]",
                )}
              />
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <b className="font-sans text-sm leading-[1.2] font-semibold text-ink">{zone.label}</b>
                <small className="font-sans text-xs leading-[1.3] font-normal text-[#8a7a72]">{zone.description}</small>
              </span>
              <span
                className={cn("font-sans text-sm leading-none font-semibold", free ? "text-[#1f8a4c]" : "text-ink")}
              >
                {fees[zone.id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
