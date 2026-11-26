import { MetricGridSkeleton } from "@/components/shared/metric-card";

export function CouponDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2" aria-busy="true">
        <span className="h-4 w-32 rounded-[6px] skel" />
        <span className="h-11.5 w-44 rounded-[12px] skel" />
        <span className="h-4 w-80 max-w-full rounded-[6px] skel" />
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
