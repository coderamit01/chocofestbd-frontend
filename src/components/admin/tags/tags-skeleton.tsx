export function TagsSkeleton() {
  return (
    <div className="flex flex-wrap items-start gap-6" aria-busy="true">
      <div className="flex max-w-105 flex-[1_1_340px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5">
        <span className="h-4.5 w-24 animate-pulse rounded-md bg-surface-2" />
        <span className="h-10.5 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-10.5 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-10 animate-pulse rounded-[10px] bg-surface-2" />
      </div>
      <div className="flex flex-[2_1_600px] flex-col gap-3 rounded-xl bg-card px-6 py-5.5">
        <span className="h-10.5 w-65 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-11 animate-pulse rounded-[10px] bg-surface-2" />
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} className="h-10 animate-pulse rounded-md bg-surface-2/60" />
        ))}
      </div>
    </div>
  );
}
