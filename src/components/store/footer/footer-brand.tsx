import Image from "next/image";
import type { FooterPaymentMethod, FooterSocial } from "@/types/store-footer";
import { PaymentBadges } from "./payment-badges";
import { SocialLinks } from "./social-links";

type FooterBrandProps = {
  tagline: string;
  socials: FooterSocial[];
  paymentMethods: FooterPaymentMethod[];
};

export function FooterBrand({ tagline, socials, paymentMethods }: FooterBrandProps) {
  return (
    <div className="flex flex-col gap-3.5 max-[1180px]:col-span-full max-[900px]:pb-5">
      <Image src="/brand/logo.png" alt="ChocoFest BD" width={641} height={360} className="h-16 w-auto self-start" />
      <p className="m-0 max-w-[260px] text-[13.5px] leading-[1.6] text-ink-3">{tagline}</p>
      <SocialLinks socials={socials} />
      <PaymentBadges label="We accept" methods={paymentMethods} />
    </div>
  );
}
