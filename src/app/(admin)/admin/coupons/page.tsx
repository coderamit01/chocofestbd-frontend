import type { Metadata } from "next";
import { Suspense } from "react";
import { CouponsManager } from "@/components/admin/coupons/coupons-manager";
import { AccessDenied } from "@/components/shared/access-denied";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { LoadError } from "@/components/shared/load-error";
import { MetricGrid, MetricGridSkeleton } from "@/components/shared/metric-card";
import { COUPON_DELETE_ROLES, COUPON_ROLES } from "@/config/coupons";
import { ApiError } from "@/lib/api-client";
import { todayInDhaka } from "@/lib/coupon";
import { couponStatsMetrics } from "@/lib/coupon-metrics";
import { parseCouponsQuery } from "@/lib/coupon-query";
import { getCurrentUser } from "@/lib/current-user";
import { CouponService } from "@/services/coupon.service";
import type { CouponsQuery } from "@/types/coupon";

export const metadata: Metadata = {
  title: "Coupons | Chocofest BD",
};

type CouponsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadCoupons(query: CouponsQuery) {
  try {
    const [list, stats, options] = await Promise.all([CouponService.getCoupons(query), CouponService.getStats(), CouponService.getOptions()]);
    return { coupons: list.data ?? [], meta: list.meta, stats: stats.data, options: options.data, now: Date.now(), error: null };
  } catch (error) {
    return {
      coupons: [],
      meta: undefined,
      stats: undefined,
      options: undefined,
      now: Date.now(),
      error: error instanceof ApiError ? error.message : "Something went wrong while loading coupons. Please refresh the page.",
    };
  }
}

async function CouponsSection({ searchParams }: CouponsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !COUPON_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Coupons are only for the marketing team." />;
  }

  const query = parseCouponsQuery(params);
  const { coupons, meta, stats, options, now, error } = await loadCoupons(query);

  if (error || !stats || !options) return <LoadError title="Couldn’t load coupons" message={error ?? "Please refresh the page."} />;

  return (
    <>
      <MetricGrid metrics={couponStatsMetrics(stats)} />
      <CouponsManager
        coupons={coupons}
        meta={meta}
        query={query}
        options={options}
        now={now}
        today={todayInDhaka(now)}
        canDelete={COUPON_DELETE_ROLES.includes(currentUser.role)}
      />
    </>
  );
}

export default function CouponsPage({ searchParams }: CouponsPageProps) {
  return (
    <Suspense
      fallback={
        <>
          <MetricGridSkeleton />
          <ListSkeleton rows={7} />
        </>
      }
    >
      <CouponsSection searchParams={searchParams} />
    </Suspense>
  );
}
