import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomerActivity } from "@/components/admin/customers/customer-activity";
import { CustomerProfileCard } from "@/components/admin/customers/customer-profile-card";
import { CustomerProfileSkeleton } from "@/components/admin/customers/customer-profile-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { Icon } from "@/components/shared/icon";
import { LoadError } from "@/components/shared/load-error";
import { MetricGrid } from "@/components/shared/metric-card";
import { CUSTOMER_BAN_ROLES, CUSTOMER_EDIT_ROLES, CUSTOMER_VIEW_ROLES, CUSTOMERS_PATH } from "@/config/customers";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { customerProfileMetrics } from "@/lib/customer-metrics";
import { CustomerService } from "@/services/customer.service";

export const metadata: Metadata = {
  title: "Customer profile | Chocofest BD",
};

type CustomerPageProps = {
  params: Promise<{ customerId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadCustomer(customerId: string, page: number) {
  try {
    const [profile, orders] = await Promise.all([CustomerService.getProfile(customerId), CustomerService.getOrders(customerId, page)]);
    return { profile: profile.data ?? null, orders: orders.data ?? [], meta: orders.meta, now: Date.now(), notFound: !profile.data, error: null };
  } catch (error) {
    return {
      profile: null,
      orders: [],
      meta: undefined,
      now: Date.now(),
      notFound: error instanceof ApiError && error.status === 404,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading this customer. Please refresh the page.",
    };
  }
}

async function CustomerSection({ params, searchParams }: CustomerPageProps) {
  const [currentUser, { customerId }, query] = await Promise.all([getCurrentUser(), params, searchParams]);

  if (!currentUser?.role || !CUSTOMER_VIEW_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Customers are only for the sales team." />;
  }

  const pageValue = Number(Array.isArray(query.page) ? query.page[0] : query.page);
  const { profile, orders, meta, now, notFound: missing, error } = await loadCustomer(customerId, Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1);

  if (missing) notFound();
  if (error || !profile) return <LoadError title="Couldn’t load this customer" message={error ?? "Please refresh the page."} />;

  return (
    <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
      <CustomerProfileCard
        key={`${profile.isBanned}-${profile.points}`}
        customer={profile}
        now={now}
        canEdit={CUSTOMER_EDIT_ROLES.includes(currentUser.role)}
        canBan={CUSTOMER_BAN_ROLES.includes(currentUser.role)}
      />
      <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-6 max-[900px]:gap-4">
        <MetricGrid metrics={customerProfileMetrics(profile, now)} min={180} />
        <CustomerActivity customer={profile} orders={orders} ordersMeta={meta} now={now} />
      </div>
    </div>
  );
}

export default function CustomerPage({ params, searchParams }: CustomerPageProps) {
  return (
    <>
      <Link href={CUSTOMERS_PATH} className="-mb-2 flex items-center gap-1.5 self-start text-caption text-ink-3 hover:text-choco">
        <Icon name="arrowLeft" size={16} strokeWidth={1.8} />
        Back to customers
      </Link>
      <Suspense fallback={<CustomerProfileSkeleton />}>
        <CustomerSection params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}
