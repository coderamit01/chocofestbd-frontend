import { StoreCard } from "@/components/store/ui/store-card";
import { StoreCardTitle } from "@/components/store/ui/store-card-title";
import { ProductThumb } from "@/components/store/ui/product-thumb";
import { TextLink } from "@/components/store/ui/text-link";
import { trackLineProducts } from "@/lib/store-track";
import type { TrackLine } from "@/types/store-order";

type TrackItemsCardProps = {
  title: string;
  lines: TrackLine[];
};

export function TrackItemsCard({ title, lines }: TrackItemsCardProps) {
  return (
    <StoreCard as="section">
      <StoreCardTitle as="h3" size="sm">
        {title}
      </StoreCardTitle>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {trackLineProducts(lines).map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex items-center gap-3 border-b border-dashed border-[#e2d6cd] py-2.5 first:pt-1"
          >
            <span className="relative">
              <ProductThumb src={product.image} alt={product.name} className="bg-[#f6f1ed]" />
              <b
                aria-label={`Quantity ${quantity}`}
                className="absolute -top-1.5 -right-1.5 box-border h-5 min-w-5 rounded-full bg-choco px-[5px] text-center font-sans text-[11px] leading-5 font-semibold text-white"
              >
                {quantity}
              </b>
            </span>
            <span className="flex-1 text-[13.5px] leading-[1.3] font-medium">{product.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3.5 flex gap-[18px] border-t border-dashed border-[#f0ebe6] pt-3.5">
        <TextLink href="/contact">Problem with this order?</TextLink>
        <TextLink href="/returns">Return policy</TextLink>
      </div>
    </StoreCard>
  );
}
