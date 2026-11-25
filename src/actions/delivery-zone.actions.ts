"use server";

import { refresh } from "next/cache";
import { ApiError } from "@/lib/api-client";
import type { SortOrderChange } from "@/lib/sort-order";
import { DeliveryZoneService } from "@/services/delivery-zone.service";
import type { ActionResult } from "@/types/api";
import type { DeliveryZonePayload } from "@/types/delivery-zone";
import { runCatalogAction } from "./catalog-action";

export async function saveDeliveryZoneAction(zoneId: string | null, payload: DeliveryZonePayload) {
  return runCatalogAction(() => DeliveryZoneService.saveZone(zoneId, payload));
}

export async function setDeliveryZoneActiveAction(zoneId: string, isActive: boolean) {
  return runCatalogAction(() => DeliveryZoneService.updateZone(zoneId, { isActive }));
}

export async function deleteDeliveryZoneAction(zoneId: string) {
  return runCatalogAction(() => DeliveryZoneService.deleteZone(zoneId));
}

export async function reorderDeliveryZonesAction(changes: SortOrderChange[]): Promise<ActionResult> {
  try {
    await Promise.all(changes.map(({ id, sortOrder }) => DeliveryZoneService.updateZone(id, { sortOrder })));
    refresh();
    return { success: true, message: "Order saved" };
  } catch (error) {
    refresh();
    return { success: false, message: error instanceof ApiError ? error.message : "Something went wrong. Please try again." };
  }
}
