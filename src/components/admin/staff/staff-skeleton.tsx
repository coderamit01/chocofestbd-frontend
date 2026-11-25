const ROWS = ["68%", "54%", "62%", "48%", "58%", "64%", "52%"];

export function StaffSkeleton() {
  return (
    <section aria-hidden="true" className="flex flex-col gap-5 rounded-xl bg-card px-6 py-[22px]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-[38px] w-20 animate-pulse rounded-[10px] bg-surface-3" />
        <span className="h-[38px] w-40 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="flex-1" />
        <span className="h-[42px] w-60 animate-pulse rounded-[10px] bg-surface-2" />
        <span className="h-10 w-32 animate-pulse rounded-[10px] bg-surface-3" />
      </div>
      <div className="flex flex-col">
        <span className="h-[43px] rounded-[10px] bg-surface-2" />
        {ROWS.map((width) => (
          <div key={width} className="flex items-center gap-3 border-b border-line p-4 last:border-b-0">
            <span className="size-9 flex-none animate-pulse rounded-full bg-surface-3" />
            <span className="h-3 animate-pulse rounded-md bg-surface-3" style={{ width }} />
          </div>
        ))}
      </div>
    </section>
  );
}
