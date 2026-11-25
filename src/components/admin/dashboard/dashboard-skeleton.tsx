import { KpiGridSkeleton } from "./kpi-card";

const block = "animate-pulse rounded-md bg-surface-2";

function Card({ className = "", height = "h-64" }: { className?: string; height?: string }) {
  return (
    <div className={`flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5 ${className}`}>
      <span className={`${block} h-5 w-40`} />
      <span className={`${block} ${height} w-full`} />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={`${block} h-5 w-80`} />
        <span className={`${block} h-10 w-[480px] max-w-full rounded-xl`} />
      </div>
      <KpiGridSkeleton count={8} />
      <div className="flex flex-wrap items-start gap-6">
        <Card className="min-w-0 flex-[2_1_600px]" height="h-80" />
        <Card className="min-w-0 flex-[1_1_320px]" height="h-80" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
