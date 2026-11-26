export function ReviewsSkeleton() {
  return (
    <div className="flex flex-wrap items-start gap-6" aria-busy="true">
      <section className="flex max-w-95 min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-xl bg-card px-6 py-5.5">
        <span className="h-5 w-36 rounded-[6px] skel" />
        <span className="h-12 w-40 rounded-[6px] skel" />
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className="h-3 rounded-full skel" />
        ))}
      </section>
      <section className="flex min-w-0 flex-[2_1_600px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5">
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }, (_, index) => (
            <span key={index} className="h-9.5 w-28 rounded-[10px] skel" />
          ))}
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="h-36 rounded-xl skel" />
        ))}
      </section>
    </div>
  );
}
