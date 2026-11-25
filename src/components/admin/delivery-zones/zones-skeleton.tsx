export function ZonesSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
      <section className="flex min-w-0 flex-[2_1_600px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="h-4 flex-1 animate-pulse rounded-md bg-surface-2" />
          <span className="h-10 w-28 animate-pulse rounded-[10px] bg-surface-2" />
        </div>
        <div className="flex flex-col">
          <span className="h-11 animate-pulse rounded-[10px] bg-surface-2" />
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-3 border-b border-line p-4 last:border-b-0">
              <span className="h-8 w-17 animate-pulse rounded-md bg-surface-2" />
              <span className="size-10 animate-pulse rounded-[10px] bg-surface-2" />
              <span className="flex flex-1 flex-col gap-2">
                <span className="h-3.5 w-1/4 animate-pulse rounded-md bg-surface-2" />
                <span className="h-3 w-2/5 animate-pulse rounded-md bg-surface-2" />
              </span>
              <span className="h-5.5 w-10 animate-pulse rounded-full bg-surface-2" />
            </div>
          ))}
        </div>
      </section>
      <section className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
        <span className="h-5 w-40 animate-pulse rounded-md bg-surface-2" />
        <span className="h-3 w-3/4 animate-pulse rounded-md bg-surface-2" />
        <span className="h-10.5 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-10.5 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-32 animate-pulse rounded-[14px] bg-surface-2" />
      </section>
    </div>
  );
}
