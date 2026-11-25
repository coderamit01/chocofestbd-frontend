"use server";

import { RiderService } from "@/services/rider.service";
import { runCatalogAction } from "./catalog-action";

export async function markDeliveredAction(orderId: string, cashCollected: boolean) {
  return runCatalogAction(() => RiderService.markDelivered(orderId, cashCollected));
}

export async function markFailedAction(orderId: string, reason: string) {
  return runCatalogAction(() => RiderService.markFailed(orderId, reason));
}
