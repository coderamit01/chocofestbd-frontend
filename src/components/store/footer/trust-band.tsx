import { Container } from "@/components/store/shared/container";
import type { FooterTrustItem } from "@/types/store-footer";
import { TrustItem } from "./trust-item";

type TrustBandProps = { items: FooterTrustItem[] };

export function TrustBand({ items }: TrustBandProps) {
  return (
    <section className="relative border-y border-[#f6e3d6] bg-[#fff8f3] bg-[linear-gradient(rgba(238,86,21,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(238,86,21,.13)_1px,transparent_1px)] bg-size-[28px_28px] bg-position-[-1px_-1px] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(255,248,243,.7)_100%)] after:content-['']">
      <Container className="relative z-1">
        <div className="grid grid-cols-5 gap-5 py-[30px] max-[1180px]:grid-cols-3 max-[900px]:grid-cols-2 max-[900px]:gap-4 max-[900px]:py-[18px]">
          {items.map((item) => (
            <TrustItem key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
