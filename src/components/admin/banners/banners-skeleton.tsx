export function BannersSkeleton() {
  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5" aria-busy="true">
      <div className="flex flex-wrap items-center gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="h-9.5 w-32 rounded-[10px] skel" />
        ))}
        <span className="flex-1" />
        <span className="h-10 w-32 rounded-[10px] skel" />
      </div>
      <span className="h-4 w-96 max-w-full rounded-[6px] skel" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(380px,100%),1fr))] gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex flex-col overflow-hidden rounded-xl bg-surface-2">
            <span className="h-47.5 skel" />
            <div className="flex flex-col gap-2 px-4 py-3.5">
              <span className="h-4 w-1/2 rounded-[6px] skel" />
              <span className="h-3 w-1/3 rounded-[6px] skel" />
            </div>
            <span className="mx-4 mb-4 h-9 rounded-[9px] skel" />
          </div>
        ))}
      </div>
    </section>
  );
}
