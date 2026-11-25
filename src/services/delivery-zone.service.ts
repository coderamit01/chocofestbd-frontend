import { ZONE_LIST_LIMIT } from "@/config/delivery-zones";
import { serverApiRequest } from "@/lib/server-api";
import type { DeliveryZone, DeliveryZonePayload, FreeDeliveryOffer } from "@/types/delivery-zone";

const fetchZonesPage = (page: number) => serverApiRequest<DeliveryZone[]>(`/delivery-zones/admin?page=${page}&limit=${ZONE_LIST_LIMIT}`);

export const DeliveryZoneService = {
  getAllZones: async () => {
    const first = await fetchZonesPage(1);
    const totalPages = first.meta?.totalPages ?? 1;
    const rest = await Promise.all(Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => fetchZonesPage(index + 2)));
    return [first, ...rest].flatMap((response) => response.data ?? []);
  },

  getFreeDeliveryOffer: async () => (await serverApiRequest<FreeDeliveryOffer | null>("/delivery-zones/admin/free-delivery")).data ?? null,

  saveZone: (zoneId: string | null, payload: DeliveryZonePayload) =>
    serverApiRequest<DeliveryZone>(zoneId ? `/delivery-zones/${zoneId}` : "/delivery-zones", {
      method: zoneId ? "PUT" : "POST",
      body: JSON.stringify(payload),
    }),

  updateZone: (zoneId: string, body: Partial<DeliveryZonePayload>) =>
    serverApiRequest<DeliveryZone>(`/delivery-zones/${zoneId}`, { method: "PUT", body: JSON.stringify(body) }),

  deleteZone: (zoneId: string) => serverApiRequest(`/delivery-zones/${zoneId}`, { method: "DELETE" }),
};
