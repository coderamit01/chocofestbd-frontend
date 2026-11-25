import type { Metadata } from "next";
import { Suspense } from "react";
import { KpiGridSkeleton } from "@/components/admin/dashboard/kpi-card";
import { PaymentsOverview } from "@/components/admin/payments/payments-overview";
import { ListSkeleton } from "@/components/shared/list-skeleton";

export const metadata: Metadata = {
  title: "Payments | Chocofest BD",
};

type PaymentsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function PaymentsSection({ searchParams }: PaymentsPageProps) {
  return <PaymentsOverview params={await searchParams} />;
}

export default function PaymentsPage({ searchParams }: PaymentsPageProps) {
  return (
    <Suspense
      fallback={
        <>
          <KpiGridSkeleton />
          <ListSkeleton rows={8} />
        </>
      }
    >
      <PaymentsSection searchParams={searchParams} />
    </Suspense>
  );
}
