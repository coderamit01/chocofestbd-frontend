export function ListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5" aria-busy="true">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-10.5 w-70 rounded-[10px] skel" />
        <span className="h-9 w-36 rounded-[10px] skel" />
        <span className="flex-1" />
        <span className="h-10 w-32 rounded-[10px] skel" />
      </div>
      <div className="flex flex-col">
        <span className="h-11 rounded-[10px] skel" />
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center gap-3 border-b border-dashed border-line-dash p-4">
            <span className="size-11 rounded-full skel" />
            <span className="flex flex-1 flex-col gap-2">
              <span className="h-3.5 w-1/4 rounded-[6px] skel" />
              <span className="h-3 w-20 rounded-[6px] skel" />
            </span>
            <span className="h-5.5 w-10 rounded-full skel" />
          </div>
        ))}
      </div>
    </section>
  );
}
