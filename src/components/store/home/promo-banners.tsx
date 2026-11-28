import Image from "next/image";
import Link from "next/link";
import { HomeSection } from "@/components/store/home/home-section";
import { PROMO_BANNERS } from "@/config/store-home";

export function PromoBanners() {
  return (
    <HomeSection
      aria-label="Promotions"
      className="grid grid-cols-3 gap-[18px] max-[900px]:-mx-3.5 max-[900px]:flex max-[900px]:snap-x max-[900px]:snap-mandatory max-[900px]:gap-2.5 max-[900px]:overflow-x-auto max-[900px]:px-3.5 max-[900px]:pb-1.5"
    >
      {PROMO_BANNERS.map((banner) => (
        <Link
          key={banner.image}
          href={banner.href}
          className="group block aspect-[860/520] overflow-hidden rounded-[20px] bg-[#efe7e1] max-[900px]:flex-[0_0_84%] max-[900px]:snap-start max-[900px]:rounded-2xl"
        >
          <Image
            src={banner.image}
            alt={banner.alt}
            width={860}
            height={520}
            sizes="(max-width: 900px) 84vw, 430px"
            className="block h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
          />
        </Link>
      ))}
    </HomeSection>
  );
}
