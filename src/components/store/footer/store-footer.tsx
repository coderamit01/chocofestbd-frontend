import { Container } from "@/components/store/shared/container";
import {
  FOOTER_CONTACT_ITEMS,
  FOOTER_COPYRIGHT,
  FOOTER_DEVELOPER,
  FOOTER_LEGAL_LINKS,
  FOOTER_LINK_GROUPS,
  FOOTER_PAYMENT_METHODS,
  FOOTER_SOCIALS,
  FOOTER_TAGLINE,
  FOOTER_TRUST_ITEMS,
} from "@/config/store-footer";
import { FooterBottomBar } from "./footer-bottom-bar";
import { FooterBrand } from "./footer-brand";
import { FooterContact } from "./footer-contact";
import { FooterLinkColumns } from "./footer-link-columns";
import { TrustBand } from "./trust-band";

type StoreFooterProps = { showTrustBand?: boolean };

export function StoreFooter({ showTrustBand = false }: StoreFooterProps) {
  return (
    <footer className="font-sans">
      {showTrustBand && <TrustBand items={FOOTER_TRUST_ITEMS} />}
      <div className="bg-white text-ink-2">
        <Container>
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] gap-10 pt-11 pb-10 max-[1180px]:grid-cols-3 max-[900px]:grid-cols-1 max-[900px]:gap-0 max-[900px]:pt-6 max-[900px]:pb-2">
            <FooterBrand tagline={FOOTER_TAGLINE} socials={FOOTER_SOCIALS} paymentMethods={FOOTER_PAYMENT_METHODS} />
            <FooterLinkColumns groups={FOOTER_LINK_GROUPS} />
            <FooterContact heading="Contact" items={FOOTER_CONTACT_ITEMS} />
          </div>
        </Container>
      </div>
      <FooterBottomBar copyright={FOOTER_COPYRIGHT} links={FOOTER_LEGAL_LINKS} developer={FOOTER_DEVELOPER} />
    </footer>
  );
}
