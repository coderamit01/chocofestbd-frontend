export function ReviewsSkeleton() {
  return (
    <div className="flex flex-wrap items-start gap-6" aria-busy="true">
      <section className="flex max-w-95 min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-xl bg-card px-6 py-5.5">
        <span className="h-5 w-36 animate-pulse rounded-md bg-surface-2" />
        <span className="h-12 w-40 animate-pulse rounded-md bg-surface-2" />
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className="h-3 animate-pulse rounded-full bg-surface-2" />
        ))}
      </section>
      <section className="flex min-w-0 flex-[2_1_600px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5">
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }, (_, index) => (
            <span key={index} className="h-9.5 w-28 animate-pulse rounded-[10px] bg-surface-2" />
          ))}
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="h-36 animate-pulse rounded-xl bg-surface-2" />
        ))}
      </section>
    </div>
  );
}
