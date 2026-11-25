export function FaqsSkeleton() {
  return (
    <section aria-busy="true" className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-10.5 w-75 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="flex-1" />
        <span className="h-3.5 w-64 animate-pulse rounded-md bg-surface-2" />
        <span className="h-10 w-28 animate-pulse rounded-[10px] bg-surface-2" />
      </div>
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="flex items-center gap-2.5 rounded-[14px] bg-surface-2 px-4 py-3.5">
            <span className="h-13.5 w-7 animate-pulse rounded-md bg-surface-3" />
            <span className="flex flex-1 flex-col gap-2">
              <span className="h-4 w-2/5 animate-pulse rounded-md bg-surface-3" />
              <span className="h-3 w-3/5 animate-pulse rounded-md bg-surface-3" />
            </span>
            <span className="h-5.5 w-10 animate-pulse rounded-full bg-surface-3" />
            <span className="size-9 animate-pulse rounded-md bg-surface-3" />
            <span className="size-9 animate-pulse rounded-md bg-surface-3" />
          </div>
        ))}
      </div>
    </section>
  );
}
