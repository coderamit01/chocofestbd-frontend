const ROWS = ["68%", "54%", "62%", "48%", "58%", "64%", "52%"];

export function StaffSkeleton() {
  return (
    <section aria-hidden="true" className="flex flex-col gap-5 rounded-xl bg-card px-6 py-[22px]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-[38px] w-20 rounded-[10px] skel" />
        <span className="h-[38px] w-40 rounded-[10px] skel" />
        <span className="flex-1" />
        <span className="h-[42px] w-60 rounded-[10px] skel" />
        <span className="h-10 w-32 rounded-[10px] skel" />
      </div>
      <div className="flex flex-col">
        <span className="h-[43px] rounded-[10px] bg-surface-2" />
        {ROWS.map((width) => (
          <div key={width} className="flex items-center gap-3 border-b border-line p-4 last:border-b-0">
            <span className="size-9 flex-none rounded-full skel" />
            <span className="h-3 rounded-[6px] skel" style={{ width }} />
          </div>
        ))}
      </div>
    </section>
  );
}
