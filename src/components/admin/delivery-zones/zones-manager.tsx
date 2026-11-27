"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteDeliveryZoneAction, reorderDeliveryZonesAction, setDeliveryZoneActiveAction } from "@/actions/delivery-zone.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button, buttonVariants } from "@/components/ui/button";
import { moveInSortOrder, nextSortOrder } from "@/lib/sort-order";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatTaka } from "@/lib/utils";
import type { DeliveryZone, FreeDeliveryOffer } from "@/types/delivery-zone";
import { ZoneCalculator } from "./zone-calculator";
import { ZoneFormDialog, type ZoneDialogState } from "./zone-form-dialog";

const squareButton = buttonVariants({ variant: "square", size: "icon-md" });
const ghostIcon = buttonVariants({ variant: "ghost", size: "icon-sm" });

const estimateLabel = (days: string | null) => {
  if (!days) return "—";
  return /^[\d\s–-]+$/.test(days) ? `${days} days` : days;
};

type ZonesManagerProps = {
  zones: DeliveryZone[];
  offer: FreeDeliveryOffer | null;
};

export function ZonesManager({ zones, offer }: ZonesManagerProps) {
  const [dialog, setDialog] = useState<ZoneDialogState>(null);
  const [toDelete, setToDelete] = useState<DeliveryZone | null>(null);
  const [isSaving, startSaving] = useTransition();

  const move = (index: number, direction: -1 | 1) => {
    const changes = moveInSortOrder(zones, index, direction);
    if (!changes.length) return;
    startSaving(async () => {
      const result = await reorderDeliveryZonesAction(changes);
      if (!result.success) toast.error("Couldn’t reorder zones", { description: result.message });
    });
  };

  const toggleActive = (zone: DeliveryZone, isActive: boolean) =>
    startSaving(async () => {
      const result = await setDeliveryZoneActiveAction(zone.id, isActive);
      if (!result.success) toast.error("Couldn’t update zone", { description: result.message });
    });

  const confirmDelete = () => {
    if (!toDelete) return;
    const zone = toDelete;
    startSaving(async () => {
      const result = await deleteDeliveryZoneAction(zone.id);
      if (result.success) {
        toast.error("Zone deleted", { description: zone.name });
        setToDelete(null);
      } else {
        toast.error("Couldn’t delete zone", { description: result.message });
      }
    });
  };

  return (
    <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
      <section className="flex min-w-0 flex-[2_1_600px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="min-w-0 flex-1 text-sm text-ink-2">
            Charges fill in automatically at checkout and in phone orders. Customers choose from the active zones, in this order.
          </p>
          <Button onClick={() => setDialog({ mode: "new", nextSortOrder: nextSortOrder(zones) })}>
            <Icon name="plus" size={18} strokeWidth={1.8} />
            Add zone
          </Button>
        </div>

        {zones.length === 0 ? (
          <EmptyState title="No delivery zones yet" description="Add a zone so customers can check out." />
        ) : (
          <div className={cn(tableStyles.wrapper, isSaving && "opacity-80")}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th className={cn(tableStyles.head, "w-22.5")}>Order</th>
                  <th className={tableStyles.head}>Zone</th>
                  <th className={cn(tableStyles.head, "text-right")}>Charge</th>
                  <th className={tableStyles.head}>Estimated delivery</th>
                  <th className={cn(tableStyles.head, "text-right")}>Orders (30 d)</th>
                  <th className={tableStyles.head}>Active</th>
                  <th className={cn(tableStyles.head, "text-right")}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={tableStyles.body}>
                {zones.map((zone, index) => (
                  <tr key={zone.id} className={tableStyles.row}>
                    <td className={tableStyles.bareCell}>
                      <div className="flex items-center gap-1">
                        <button type="button" aria-label={`Move ${zone.name} up`} disabled={index === 0 || isSaving} onClick={() => move(index, -1)} className={ghostIcon}>
                          <Icon name="arrowUp" size={16} strokeWidth={1.8} className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Move ${zone.name} down`}
                          disabled={index === zones.length - 1 || isSaving}
                          onClick={() => move(index, 1)}
                          className={ghostIcon}
                        >
                          <Icon name="arrowDown" size={16} strokeWidth={1.8} className="size-4" />
                        </button>
                      </div>
                    </td>
                    <td className={tableStyles.cell} data-label="Zone">
                      <span className="flex items-center gap-3">
                        <span className="flex size-14 flex-none items-center justify-center rounded-[36%] bg-brand-50 text-brand">
                          <Icon name="zones" size={24} strokeWidth={1.8} />
                        </span>
                        <span className="flex flex-col text-left">
                          <span className="font-medium text-ink">{zone.name}</span>
                          {zone.areas && <span className="text-xs text-ink-3">{zone.areas}</span>}
                        </span>
                      </span>
                    </td>
                    <td className={cn(tableStyles.cell, "text-right font-heading text-base leading-none font-semibold tabular-nums")} data-label="Charge">
                      {formatTaka(zone.charge)}
                    </td>
                    <td className={tableStyles.cell} data-label="Estimated delivery">
                      {estimateLabel(zone.estimatedDays)}
                    </td>
                    <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Orders">
                      {zone.recentOrders}
                    </td>
                    <td className={tableStyles.cell} data-label="Active">
                      <ToggleSwitch
                        ariaLabel={`Active: ${zone.name}`}
                        checked={zone.isActive}
                        disabled={isSaving}
                        onChange={(isActive) => toggleActive(zone, isActive)}
                      />
                    </td>
                    <td className={tableStyles.bareCell}>
                      <div className="flex justify-end gap-1.5">
                        <button type="button" aria-label={`Edit ${zone.name}`} onClick={() => setDialog({ mode: "edit", zone })} className={squareButton}>
                          <Icon name="edit" size={16} strokeWidth={1.8} className="size-4" />
                        </button>
                        <button type="button" aria-label={`Delete ${zone.name}`} onClick={() => setToDelete(zone)} className={squareButton}>
                          <Icon name="trash" size={16} strokeWidth={1.8} className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ZoneCalculator zones={zones} offer={offer} />

      <ZoneFormDialog state={dialog} onClose={() => setDialog(null)} />

      <DangerDialog
        open={!!toDelete}
        title={`Delete ${toDelete?.name ?? ""}?`}
        description="Customers in these areas won’t be able to check out until another zone covers them."
        confirmLabel="Delete zone"
        pendingLabel="Deleting…"
        isPending={isSaving}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
