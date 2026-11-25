"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { markDeliveredAction, markFailedAction } from "@/actions/rider.actions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { FAILED_DELIVERY_REASONS } from "@/config/rider";
import { cashAmount } from "@/lib/rider";
import { cn, formatTaka } from "@/lib/utils";
import type { DeliverySheetState } from "@/types/rider";

type DeliverySheetProps = {
  state: DeliverySheetState;
  onClose: () => void;
};

export function DeliverySheet({ state, onClose }: DeliverySheetProps) {
  return (
    <Sheet open={!!state} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        overlayClassName="bg-[rgb(34_21_16/40%)] supports-backdrop-filter:backdrop-blur-none"
        className="mx-auto w-full max-w-97.5 gap-4 rounded-t-3xl border-0 bg-surface px-4.5 pt-3 pb-5.5 shadow-none data-[side=bottom]:border-t-0"
      >
        {state && <SheetBody key={`${state.mode}-${state.stop.id}`} state={state} onClose={onClose} />}
      </SheetContent>
    </Sheet>
  );
}

function SheetBody({ state, onClose }: { state: NonNullable<DeliverySheetState>; onClose: () => void }) {
  const { mode, stop } = state;
  const amount = cashAmount(stop);
  const [cash, setCash] = useState(amount === 0);
  const [reason, setReason] = useState("");
  const [isPending, startTransition] = useTransition();

  const confirmDeliver = () => {
    if (!cash) return;
    startTransition(async () => {
      const result = await markDeliveredAction(stop.id, amount > 0);
      if (!result.success) {
        toast.error("Couldn’t mark delivered", { description: result.message });
        return;
      }
      toast.success("Delivered", { description: stop.orderNumber });
      onClose();
    });
  };

  const confirmFail = () => {
    if (!reason) return;
    startTransition(async () => {
      const result = await markFailedAction(stop.id, reason);
      if (!result.success) {
        toast.error("Couldn’t report delivery", { description: result.message });
        return;
      }
      toast.error("Reported", { description: reason });
      onClose();
    });
  };

  return (
    <>
      <span className="h-1 w-10 self-center rounded-xs bg-line-2" />
      <div className="flex flex-col gap-1">
        <SheetTitle className="font-heading text-lg leading-[1.3] font-semibold text-ink">
          {mode === "deliver" ? "Confirm delivery" : "Why did it fail?"}
        </SheetTitle>
        <SheetDescription className="text-[12.5px] text-ink-3">
          {stop.orderNumber} · {stop.recipientName}
        </SheetDescription>
      </div>

      {mode === "deliver" ? (
        <>
          {amount > 0 && (
            <label
              className={cn(
                "inline-flex cursor-pointer items-center gap-2.5 rounded-[14px] p-4 text-[15px] text-ink",
                cash ? "bg-success-soft" : "bg-surface-2"
              )}
            >
              <input type="checkbox" checked={cash} onChange={(event) => setCash(event.target.checked)} className="m-0 size-5.5 cursor-pointer accent-brand" />
              <span>
                I collected <b className="font-semibold tabular-nums">{formatTaka(amount)}</b> in cash
              </span>
            </label>
          )}
          <Button className="h-13.5 text-[15px]" disabled={!cash} aria-busy={isPending || undefined} onClick={confirmDeliver}>
            {isPending ? "Saving…" : "Confirm delivery"}
          </Button>
        </>
      ) : (
        <>
          <div role="radiogroup" aria-label="Why did it fail?" className="flex flex-col gap-2">
            {FAILED_DELIVERY_REASONS.map((item) => {
              const selected = reason === item;
              return (
                <label
                  key={item}
                  className={cn(
                    "flex min-h-13 cursor-pointer items-center gap-3 rounded-[14px] px-3.5 text-[14.5px] text-ink",
                    selected ? "bg-brand-50 shadow-[inset_0_0_0_1.5px_var(--brand)]" : "bg-surface-2"
                  )}
                >
                  <input type="radio" name="fail-reason" checked={selected} onChange={() => setReason(item)} className="m-0 size-5 accent-brand" />
                  {item}
                </label>
              );
            })}
          </div>
          <Button variant="destructive" className="h-13.5 text-[15px]" disabled={!reason} aria-busy={isPending || undefined} onClick={confirmFail}>
            {isPending ? "Saving…" : "Report failed delivery"}
          </Button>
        </>
      )}

      <Button variant="ghost" className="h-11.5" onClick={onClose} disabled={isPending}>
        Cancel
      </Button>
    </>
  );
}
