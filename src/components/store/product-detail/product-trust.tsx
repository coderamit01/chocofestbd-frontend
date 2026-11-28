import { Icon } from "@/components/shared/icon";
import { PRODUCT_TRUST_ITEMS } from "@/config/store-product-detail";

export function ProductTrust() {
  return (
    <div className="grid grid-cols-3 gap-2.5 max-[900px]:gap-2">
      {PRODUCT_TRUST_ITEMS.map((item) => (
        <span
          key={item.title}
          className="flex flex-col gap-0.5 rounded-[14px] border border-[#f0ebe6] bg-white p-3 text-[11.5px] text-[#8a7f79] max-[900px]:p-2.5 max-[900px]:text-[10.5px]"
        >
          <Icon name={item.icon} size={18} strokeWidth={1.8} className="mb-1 text-brand" />
          <b className="text-[13px] font-semibold text-ink max-[900px]:text-xs">{item.title}</b>
          {item.note}
        </span>
      ))}
    </div>
  );
}
