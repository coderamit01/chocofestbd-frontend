import { Icon } from "@/components/shared/icon";
import type { PolicyHighlight } from "@/types/store-policy";

export function PolicyHighlights({ items }: { items: PolicyHighlight[] }) {
  return (
    <div className="mb-2.5 grid grid-cols-3 gap-2.5 max-[900px]:grid-cols-1">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5 rounded-[14px] bg-[#faf7f5] p-3.5 text-brand">
          <Icon name={item.icon} size={18} strokeWidth={1.8} />
          <b className="mt-1.5 font-heading text-[20px] leading-[1.2] font-bold text-ink">{item.value}</b>
          <span className="text-[12.5px] text-[#8a7f79]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
