"use client";

import { useState } from "react";
import { SelectMenu } from "@/components/shared/select-menu";
import { DEFAULT_CALCULATOR_SUBTOTAL } from "@/config/delivery-zones";
import { formStyles } from "@/lib/form-styles";
import { cn, formatTaka } from "@/lib/utils";
import type { DeliveryZone, FreeDeliveryOffer } from "@/types/delivery-zone";

type ZoneCalculatorProps = {
  zones: DeliveryZone[];
  offer: FreeDeliveryOffer | null;
};

export function ZoneCalculator({ zones, offer }: ZoneCalculatorProps) {
  const [zoneId, setZoneId] = useState("");
  const [subtotal, setSubtotal] = useState(DEFAULT_CALCULATOR_SUBTOTAL);

  const zone = zones.find((item) => item.id === zoneId) ?? zones[0];
  const charge = zone ? Number(zone.charge) : 0;
  const amount = Number(subtotal) || 0;
  const minimum = offer?.minOrderAmount ? Number(offer.minOrderAmount) : 0;
  const isFree = !!offer && amount >= minimum;

  const freeLabel = offer ? `${offer.code} applies` : "Free delivery coupon";
  const freeValue = !offer ? "None active" : isFree ? "Yes — ৳0 delivery" : `No (needs ${formatTaka(minimum)})`;

  return (
    <section className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <h3 className="font-heading text-lg leading-[1.3] font-semibold text-ink">Charge calculator</h3>
      <p className="text-[12.5px] text-ink-3">Check what a customer pays before you change a charge.</p>

      <div className={formStyles.field}>
        <label htmlFor="cz" className={formStyles.label}>
          Zone
        </label>
        <SelectMenu id="cz" value={zone?.id ?? ""} onChange={setZoneId} options={zones.map((item) => ({ value: item.id, label: item.name }))} />
      </div>

      <div className={formStyles.field}>
        <label htmlFor="cs" className={formStyles.label}>
          Order subtotal
        </label>
        <div className={formStyles.inputGroup}>
          <span className={formStyles.groupAddon}>৳</span>
          <input
            id="cs"
            inputMode="numeric"
            value={subtotal}
            onChange={(event) => setSubtotal(event.target.value.replace(/\D/g, ""))}
            className={cn(formStyles.groupInput, "tabular-nums")}
          />
        </div>
      </div>

      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 rounded-[14px] bg-surface-2 p-4 text-sm">
        <dt className="text-ink-3">Delivery</dt>
        <dd className="text-right text-ink tabular-nums">{formatTaka(charge)}</dd>
        <dt className="text-ink-3">{freeLabel}</dt>
        <dd className="text-right text-ink">{freeValue}</dd>
        <dt className="font-semibold text-ink">Customer pays</dt>
        <dd className="text-right font-heading text-lg leading-none font-semibold text-ink tabular-nums">{formatTaka(amount + (isFree ? 0 : charge))}</dd>
      </dl>
    </section>
  );
}
