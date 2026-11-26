import { MetricGridSkeleton } from "@/components/shared/metric-card";

export function CustomerProfileSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-start gap-6" aria-busy="true">
        <section className="flex max-w-100 min-w-0 flex-[1_1_320px] flex-col items-center gap-4 rounded-xl bg-card px-6 py-7">
          <span className="size-22 rounded-full skel" />
          <span className="h-5 w-40 rounded-[6px] skel" />
          <span className="h-3.5 w-32 rounded-[6px] skel" />
          <div className="mt-2 flex w-full flex-col gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className="h-4 rounded-[6px] skel" />
            ))}
          </div>
          <span className="h-10 w-full rounded-[10px] skel" />
        </section>
        <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-6">
          <MetricGridSkeleton min={180} />
          <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5">
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="h-9.5 w-24 rounded-[10px] skel" />
              ))}
            </div>
            <span className="h-11 rounded-[10px] skel" />
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="h-10 rounded-[6px] skel" />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
