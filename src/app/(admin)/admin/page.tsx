import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardPage } from "@/components/admin/dashboard/dashboard-page";
import { DashboardSkeleton } from "@/components/admin/dashboard/dashboard-skeleton";

export const metadata: Metadata = {
  title: "Dashboard | Chocofest BD",
};

type AdminDashboardProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function DashboardSection({ searchParams }: AdminDashboardProps) {
  return <DashboardPage params={await searchParams} />;
}

export default function AdminDashboard({ searchParams }: AdminDashboardProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardSection searchParams={searchParams} />
    </Suspense>
  );
}
