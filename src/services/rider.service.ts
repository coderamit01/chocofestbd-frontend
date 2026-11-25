import { serverApiRequest } from "@/lib/server-api";
import type { DeliveryStop } from "@/types/rider";

export const RiderService = {
  getMyDeliveries: async () => (await serverApiRequest<DeliveryStop[]>("/rider/deliveries")).data ?? [],

  markDelivered: (orderId: string, cashCollected: boolean) =>
    serverApiRequest(`/rider/deliveries/${orderId}/delivered`, { method: "PATCH", body: JSON.stringify({ cashCollected }) }),

  markFailed: (orderId: string, reason: string) =>
    serverApiRequest(`/rider/deliveries/${orderId}/failed`, { method: "PATCH", body: JSON.stringify({ reason }) }),
};
