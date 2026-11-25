import type { Metadata } from "next";
import { Suspense } from "react";
import { ZonesManager } from "@/components/admin/delivery-zones/zones-manager";
import { ZonesSkeleton } from "@/components/admin/delivery-zones/zones-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { DELIVERY_ZONE_ROLES } from "@/config/delivery-zones";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { DeliveryZoneService } from "@/services/delivery-zone.service";

export const metadata: Metadata = {
  title: "Delivery zones | Chocofest BD",
};

async function loadZones() {
  try {
    const [zones, offer] = await Promise.all([DeliveryZoneService.getAllZones(), DeliveryZoneService.getFreeDeliveryOffer()]);
    return { zones, offer, error: null };
  } catch (error) {
    return {
      zones: [],
      offer: null,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading delivery zones. Please refresh the page.",
    };
  }
}

async function ZonesSection() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !DELIVERY_ZONE_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Delivery zones are only for admins." />;
  }

  const { zones, offer, error } = await loadZones();

  if (error) return <LoadError title="Couldn’t load delivery zones" message={error} />;

  return <ZonesManager zones={zones} offer={offer} />;
}

export default function DeliveryZonesPage() {
  return (
    <Suspense fallback={<ZonesSkeleton />}>
      <ZonesSection />
    </Suspense>
  );
}
