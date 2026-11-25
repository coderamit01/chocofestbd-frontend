import { MetricGridSkeleton } from "@/components/shared/metric-card";

export function CouponDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2" aria-busy="true">
        <span className="h-4 w-32 animate-pulse rounded-md bg-surface-3" />
        <span className="h-11.5 w-44 animate-pulse rounded-[12px] bg-surface-3" />
        <span className="h-4 w-80 max-w-full animate-pulse rounded-md bg-surface-3" />
      </div>
      <MetricGridSkeleton />
      <div className="flex flex-wrap items-start gap-6">
        <span className="h-70 min-w-0 flex-[2_1_600px] animate-pulse rounded-xl bg-card" />
        <span className="h-70 min-w-0 flex-[1_1_320px] animate-pulse rounded-xl bg-card" />
      </div>
      <span className="h-80 animate-pulse rounded-xl bg-card" />
    </>
  );
}
