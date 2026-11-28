import { Container } from "@/components/store/shared/container";
import type { FooterTrustItem } from "@/types/store-footer";
import { TrustItem } from "./trust-item";

type TrustBandProps = { items: FooterTrustItem[] };

export function TrustBand({ items }: TrustBandProps) {
  return (
    <section className="border-y border-[#efe8e3] bg-white">
      <Container>
        <div className="grid grid-cols-5 gap-5 py-6 max-[1180px]:grid-cols-3 max-[900px]:grid-cols-2 max-[900px]:gap-4">
          {items.map((item) => (
            <TrustItem key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
