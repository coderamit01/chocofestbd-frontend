import { FREE_DELIVERY_THRESHOLD } from "@/config/store-header";
import { formatTaka } from "@/lib/utils";

export function FreeDeliveryProgress({ subtotal }: { subtotal: number }) {
  const unlocked = subtotal >= FREE_DELIVERY_THRESHOLD;
  const percent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="flex flex-col gap-2 bg-[#fff8f3] px-5 py-3.5 text-[13px] text-[#7a2c0a]">
      <span>
        {unlocked
          ? "You’ve unlocked free delivery inside Dhaka"
          : `Add ${formatTaka(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery in Dhaka`}
      </span>
      <div
        role="progressbar"
        aria-label="Free delivery progress"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 overflow-hidden rounded-[6px] bg-[#ffe1cf]"
      >
        <i
          style={{ width: `${percent}%` }}
          className="block h-full rounded-[6px] bg-[linear-gradient(90deg,#ff7a2f,#ee5615)] transition-[width] duration-300"
        />
      </div>
    </div>
  );
}
