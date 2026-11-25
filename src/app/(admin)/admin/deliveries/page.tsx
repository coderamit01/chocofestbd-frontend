import type { Metadata } from "next";
import { Suspense } from "react";
import { DeliveriesBoard } from "@/components/admin/deliveries/deliveries-board";
import { DeliveriesSkeleton } from "@/components/admin/deliveries/deliveries-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { RIDER_ROLES } from "@/config/rider";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { formatDeliveryDay } from "@/lib/rider";
import { RiderService } from "@/services/rider.service";

export const metadata: Metadata = {
  title: "My deliveries | Chocofest BD",
};

async function loadDeliveries() {
  try {
    const stops = await RiderService.getMyDeliveries();
    return { stops, today: formatDeliveryDay(new Date()), error: null };
  } catch (error) {
    return {
      stops: [],
      today: "",
      error: error instanceof ApiError ? error.message : "Something went wrong while loading your deliveries. Please refresh the page.",
    };
  }
}

async function DeliveriesSection() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !RIDER_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="My deliveries is only for riders." />;
  }

  const { stops, today, error } = await loadDeliveries();

  if (error) return <LoadError title="Couldn’t load your deliveries" message={error} />;

  return <DeliveriesBoard stops={stops} riderName={currentUser.name} today={today} />;
}

export default function DeliveriesPage() {
  return (
    <Suspense fallback={<DeliveriesSkeleton />}>
      <DeliveriesSection />
    </Suspense>
  );
}
