export function ProductEditorSkeleton() {
  const card = (height: string) => <div className={`animate-pulse rounded-xl bg-card ${height}`} />;

  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="h-3 w-28 rounded-[6px] skel" />
          <span className="h-6 w-64 rounded-[6px] skel" />
        </div>
        <span className="h-10 w-48 rounded-[10px] skel" />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-[2_1_600px] flex-col gap-6">
          {card("h-96")}
          {card("h-64")}
          {card("h-56")}
        </div>
        <div className="flex flex-[1_1_320px] flex-col gap-6">
          {card("h-60")}
          {card("h-80")}
        </div>
      </div>
    </div>
  );
}
