import type { Metadata } from "next";
import { Suspense } from "react";
import { KpiGridSkeleton } from "@/components/admin/dashboard/kpi-card";
import { OrdersOverview } from "@/components/admin/orders/orders-overview";
import { ListSkeleton } from "@/components/shared/list-skeleton";

export const metadata: Metadata = {
  title: "Orders | Chocofest BD",
};

type OrdersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function OrdersSection({ searchParams }: OrdersPageProps) {
  return <OrdersOverview params={await searchParams} />;
}

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  return (
    <Suspense
      fallback={
        <>
          <KpiGridSkeleton />
          <ListSkeleton rows={10} />
        </>
      }
    >
      <OrdersSection searchParams={searchParams} />
    </Suspense>
  );
}
