import { Icon } from "@/components/shared/icon";

const MAP_CLASS =
  "relative h-[260px] overflow-hidden rounded-[22px] [background:linear-gradient(90deg,rgba(61,17,4,.05)_1px,transparent_1px)_0_0/28px_28px,linear-gradient(rgba(61,17,4,.05)_1px,transparent_1px)_0_0/28px_28px,linear-gradient(160deg,#f7efe8,#efe4da)] max-[900px]:h-[200px]";

const ROAD_CLASS =
  "before:absolute before:top-[52%] before:-right-[10%] before:-left-[10%] before:h-[18px] before:-rotate-12 before:bg-white before:shadow-[0_0_0_2px_#e9ddd3] before:content-[''] after:absolute after:-top-[10%] after:-bottom-[10%] after:left-[38%] after:w-3.5 after:rotate-[18deg] after:bg-white after:shadow-[0_0_0_2px_#e9ddd3] after:content-['']";

export function ContactMap({ label }: { label: string }) {
  return (
    <div className={`${MAP_CLASS} ${ROAD_CLASS}`}>
      <span className="absolute top-[42%] left-1/2 z-2 -m-6 flex size-12 -rotate-45 items-center justify-center rounded-[50%_50%_50%_0] bg-brand text-white shadow-[0_10px_20px_rgba(238,86,21,0.4)]">
        <Icon name="deliveries" size={22} strokeWidth={1.8} className="rotate-45" />
      </span>
      <span className="absolute top-[calc(42%+34px)] left-1/2 z-2 -translate-x-1/2 rounded-[9px] bg-white px-2.5 py-1.5 text-[12px] leading-[normal] font-semibold whitespace-nowrap text-ink shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        {label}
      </span>
    </div>
  );
}
