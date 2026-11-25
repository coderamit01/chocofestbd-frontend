import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DELIVERY_BADGES, PHONE_COUNTRY_PREFIX } from "@/config/rider";
import { hasBengali } from "@/lib/bengali";
import { cashAmount } from "@/lib/rider";
import { cn, formatTaka } from "@/lib/utils";
import type { DeliveryStop } from "@/types/rider";

type DeliveryCardProps = {
  stop: DeliveryStop;
  sequence: number;
  onDeliver: () => void;
  onFail: () => void;
};

export function DeliveryCard({ stop, sequence, onDeliver, onFail }: DeliveryCardProps) {
  const badge = DELIVERY_BADGES[stop.result ?? "OPEN"];
  const cash = cashAmount(stop);

  return (
    <article className="flex flex-col gap-3.5 rounded-[18px] bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="font-heading text-[15px] leading-none font-semibold text-ink">{stop.orderNumber}</span>
          <Badge variant="neutral" size="sm">
            Stop {sequence}
          </Badge>
        </span>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className={cn("text-base font-semibold text-ink", hasBengali(stop.recipientName) && "font-bengali")}>{stop.recipientName}</span>
          <span className="font-bengali text-[14.5px] leading-normal text-ink-2">{stop.address}</span>
          {stop.note && (
            <Badge variant="warning" className="h-auto self-start px-2.5 py-1.5 font-bengali leading-[1.4] whitespace-normal">
              {stop.note}
            </Badge>
          )}
          {stop.failReason && (
            <Badge variant="danger" className="h-auto self-start px-2.5 py-1.5 leading-[1.4] whitespace-normal">
              {stop.failReason}
            </Badge>
          )}
        </div>
        <a
          href={`tel:${PHONE_COUNTRY_PREFIX}${stop.recipientPhone}`}
          aria-label={`Call ${stop.recipientName}`}
          className="flex size-13 flex-none items-center justify-center rounded-xl bg-success-soft text-success"
        >
          <Icon name="phone" size={22} strokeWidth={1.8} />
        </a>
      </div>

      <div className="flex items-center justify-between rounded-[12px] bg-surface-2 px-3.5 py-3">
        <span className="text-[12.5px] text-ink-3">{cash ? "Collect cash (COD)" : "Prepaid — collect nothing"}</span>
        <span className="font-heading text-xl leading-none font-bold text-ink tabular-nums">{formatTaka(cash)}</span>
      </div>

      {!stop.result && (
        <div className="grid grid-cols-[1fr_2fr] gap-2">
          <Button variant="destructive-soft" className="h-13" onClick={onFail}>
            Failed
          </Button>
          <Button className="h-13 text-[15px]" onClick={onDeliver}>
            <Icon name="check" size={18} strokeWidth={1.8} />
            Mark delivered
          </Button>
        </div>
      )}
    </article>
  );
}
