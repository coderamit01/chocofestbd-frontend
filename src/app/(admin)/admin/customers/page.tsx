import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomersManager } from "@/components/admin/customers/customers-manager";
import { AccessDenied } from "@/components/shared/access-denied";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { LoadError } from "@/components/shared/load-error";
import { MetricGrid, MetricGridSkeleton } from "@/components/shared/metric-card";
import { CUSTOMER_BAN_ROLES, CUSTOMER_VIEW_ROLES } from "@/config/customers";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { customerSummaryMetrics } from "@/lib/customer-metrics";
import { parseCustomersQuery } from "@/lib/customer-query";
import { CustomerService } from "@/services/customer.service";
import type { CustomersQuery } from "@/types/customer";

export const metadata: Metadata = {
  title: "Customers | Chocofest BD",
};

type CustomersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadCustomers(query: CustomersQuery) {
  try {
    const [list, summary] = await Promise.all([CustomerService.getCustomers(query), CustomerService.getSummary()]);
    return { customers: list.data ?? [], meta: list.meta, summary: summary.data, error: null };
  } catch (error) {
    return {
      customers: [],
      meta: undefined,
      summary: undefined,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading customers. Please refresh the page.",
    };
  }
}

async function CustomersSection({ searchParams }: CustomersPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !CUSTOMER_VIEW_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Customers are only for the sales team." />;
  }

  const query = parseCustomersQuery(params);
  const { customers, meta, summary, error } = await loadCustomers(query);

  if (error || !summary) return <LoadError title="Couldn’t load customers" message={error ?? "Please refresh the page."} />;

  return (
    <>
      <MetricGrid metrics={customerSummaryMetrics(summary)} />
      <CustomersManager customers={customers} meta={meta} query={query} canBan={CUSTOMER_BAN_ROLES.includes(currentUser.role)} />
    </>
  );
}

export default function CustomersPage({ searchParams }: CustomersPageProps) {
  return (
    <Suspense
      fallback={
        <>
          <MetricGridSkeleton />
          <ListSkeleton />
        </>
      }
    >
      <CustomersSection searchParams={searchParams} />
    </Suspense>
  );
}
