export function ProductsSkeleton() {
  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5" aria-busy="true">
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-10.5 w-70 rounded-[10px] skel" />
        <span className="h-9 w-36 rounded-[10px] skel" />
        <span className="h-9 w-32 rounded-[10px] skel" />
        <span className="flex-1" />
        <span className="h-10 w-36 rounded-[10px] skel" />
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} className="h-9.5 w-24 rounded-[10px] skel" />
        ))}
      </div>
      <div className="flex flex-col">
        <span className="h-11 rounded-[10px] skel" />
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex items-center gap-3 border-b border-line p-4">
            <span className="size-11 rounded-[10px] skel" />
            <span className="flex flex-1 flex-col gap-2">
              <span className="h-3.5 w-1/3 rounded-[6px] skel" />
              <span className="h-3 w-24 rounded-[6px] skel" />
            </span>
            <span className="h-6.5 w-24 rounded-[7px] skel" />
          </div>
        ))}
      </div>
    </section>
  );
}
