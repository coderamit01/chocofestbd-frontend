import Image from "next/image";
import Link from "next/link";
import { HomeSection } from "@/components/store/home/home-section";
import { OfferCard } from "@/components/store/home/offer-card";
import { SectionTitle } from "@/components/store/home/section-heading";
import { OFFER_FOR_YOU } from "@/config/store-home";
import { offerProducts } from "@/lib/store-home-products";

export function OfferForYou() {
  const { id, title, subtitle, hero } = OFFER_FOR_YOU;

  return (
    <HomeSection aria-labelledby={id}>
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-5">
        <div>
          <SectionTitle id={id} className="mt-2 mb-1 text-[30px] tracking-normal max-[900px]:text-[23px]">
            {title}
          </SectionTitle>
          <p className="m-0 font-sans text-sm leading-normal text-ink-2">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[18px]">
        <Link
          href={hero.href}
          className="group relative block overflow-hidden rounded-[24px] bg-choco max-[1180px]:aspect-[16/10] max-[900px]:rounded-[20px]"
        >
          <Image
            src={hero.image}
            alt={hero.alt}
            width={1280}
            height={800}
            sizes="(max-width: 1320px) 50vw, 640px"
            className="block h-full w-full object-cover transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-104"
          />
        </Link>
        <div className="grid grid-cols-2 gap-3.5 max-[900px]:grid-cols-1 max-[900px]:gap-2.5">
          {offerProducts().map((product) => (
            <OfferCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
