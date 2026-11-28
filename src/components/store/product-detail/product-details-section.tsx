import { Icon } from "@/components/shared/icon";
import type { ProductDetail } from "@/types/store-product-detail";
import { ProductDetailCard, ProductDetailCardTitle } from "./product-detail-card";

export function ProductDetailsSection({ detail }: { detail: ProductDetail }) {
  return (
    <ProductDetailCard id="details">
      <ProductDetailCardTitle>Product details</ProductDetailCardTitle>
      <p className="m-0 mb-3 text-sm leading-[1.7] text-[#3f3531]">{detail.description}</p>
      <ul className="m-0 mb-4 grid list-none gap-2 p-0">
        {detail.highlights.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[13.5px] text-ink">
            <Icon name="check" size={16} strokeWidth={1.8} className="flex-none text-[#1f8a4c]" />
            {item}
          </li>
        ))}
      </ul>
      <dl className="m-0 grid grid-cols-2 border-t border-[#f0ebe6] max-[900px]:grid-cols-1">
        {detail.specs.map((spec) => (
          <div key={spec.label} className="flex flex-col gap-[3px] border-b border-[#f0ebe6] py-[11px]">
            <dt className="text-xs text-[#8a7f79]">{spec.label}</dt>
            <dd className="m-0 text-[13.5px] font-medium text-ink">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </ProductDetailCard>
  );
}
