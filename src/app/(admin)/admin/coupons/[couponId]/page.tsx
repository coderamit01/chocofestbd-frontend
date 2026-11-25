import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CouponDetailSkeleton } from "@/components/admin/coupons/coupon-detail-skeleton";
import { CouponHeader } from "@/components/admin/coupons/coupon-header";
import { CouponOrders } from "@/components/admin/coupons/coupon-orders";
import { CouponUsesChart } from "@/components/admin/coupons/coupon-uses-chart";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { MetricGrid } from "@/components/shared/metric-card";
import { COUPON_CHART_DAYS, COUPON_ROLES } from "@/config/coupons";
import { ApiError } from "@/lib/api-client";
import { couponRules, todayInDhaka } from "@/lib/coupon";
import { couponInsightMetrics } from "@/lib/coupon-metrics";
import { parseCouponOrdersQuery, type CouponOrdersQuery } from "@/lib/coupon-query";
import { getCurrentUser } from "@/lib/current-user";
import { CouponService } from "@/services/coupon.service";

export const metadata: Metadata = {
  title: "Coupon details | Chocofest BD",
};

type CouponPageProps = {
  params: Promise<{ couponId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadCoupon(couponId: string, query: CouponOrdersQuery) {
  try {
    const [coupon, insights, orders, options] = await Promise.all([
      CouponService.getCoupon(couponId),
      CouponService.getInsights(couponId),
      CouponService.getOrders(couponId, query),
      CouponService.getOptions(),
    ]);
    return {
      coupon: coupon.data ?? null,
      insights: insights.data ?? null,
      orders: orders.data ?? [],
      meta: orders.meta,
      options: options.data ?? null,
      now: Date.now(),
      notFound: !coupon.data,
      error: null,
    };
  } catch (error) {
    return {
      coupon: null,
      insights: null,
      orders: [],
      meta: undefined,
      options: null,
      now: Date.now(),
      notFound: error instanceof ApiError && error.status === 404,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading this coupon. Please refresh the page.",
    };
  }
}

async function CouponSection({ params, searchParams }: CouponPageProps) {
  const [currentUser, { couponId }, search] = await Promise.all([getCurrentUser(), params, searchParams]);

  if (!currentUser?.role || !COUPON_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Coupons are only for the marketing team." />;
  }

  const query = parseCouponOrdersQuery(search);
  const data = await loadCoupon(couponId, query);

  if (data.notFound || data.coupon?.deletedAt) notFound();
  if (data.error || !data.coupon || !data.insights || !data.options) {
    return <LoadError title="Couldn’t load this coupon" message={data.error ?? "Please refresh the page."} />;
  }

  const { coupon, insights, orders, meta, options, now } = data;

  return (
    <>
      <CouponHeader coupon={coupon} options={options} now={now} today={todayInDhaka(now)} />
      <MetricGrid metrics={couponInsightMetrics(insights)} />
      <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
        <section className="min-w-0 flex-[2_1_600px] rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
          <div className="mb-4.5 flex items-center justify-between gap-3">
            <h3 className="font-heading text-heading text-ink">Uses per day</h3>
            <span className="text-caption text-ink-3">last {COUPON_CHART_DAYS} days</span>
          </div>
          <CouponUsesChart days={insights.usesPerDay} />
        </section>
        <section className="min-w-0 flex-[1_1_320px] rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
          <div className="mb-4.5 flex items-center justify-between gap-3">
            <h3 className="font-heading text-heading text-ink">Rules</h3>
          </div>
          <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm max-[900px]:grid-cols-[100px_1fr]">
            {couponRules(coupon).map((rule) => (
              <div key={rule.label} className="contents">
                <dt className="text-ink-3">{rule.label}</dt>
                <dd className="text-ink">{rule.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <CouponOrders code={coupon.code} orders={orders} meta={meta} query={query} />
    </>
  );
}

export default function CouponPage({ params, searchParams }: CouponPageProps) {
  return (
    <Suspense fallback={<CouponDetailSkeleton />}>
      <CouponSection params={params} searchParams={searchParams} />
    </Suspense>
  );
}
