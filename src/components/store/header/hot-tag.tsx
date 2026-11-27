export function HotTag({ label }: { label: string }) {
  return (
    <span className="rounded-[6px] bg-brand px-1.5 py-1 font-sans text-[10px] leading-none font-semibold tracking-[0.04em] text-white uppercase">
      {label}
    </span>
  );
}
