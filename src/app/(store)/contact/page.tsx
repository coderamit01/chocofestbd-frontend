import type { Metadata } from "next";
import { ContactLocation } from "@/components/store/contact/contact-location";
import { ContactMessageCard } from "@/components/store/contact/contact-message-card";
import { ContactWays } from "@/components/store/contact/contact-ways";
import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import { PageHero } from "@/components/store/ui/page-hero";
import { TextLink } from "@/components/store/ui/text-link";
import { CONTACT_STORE, CONTACT_WAYS } from "@/config/store-contact";

export const metadata: Metadata = {
  title: "Contact us | Chocofest BD",
  description: "Call, WhatsApp, Messenger or send us a message — we reply 10 AM to 10 PM, every day.",
};

export default function ContactPage() {
  return (
    <PageContainer page>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        kicker="We reply fast"
        title="How can we help?"
        description={
          <>
            Most questions are answered in our <TextLink href="/faq">FAQ</TextLink>. For anything else, reach us below
            — 10 AM to 10 PM, every day.
          </>
        }
      />
      <ContactWays ways={CONTACT_WAYS} />
      <div className="grid grid-cols-[1fr_400px] items-start gap-5 max-[900px]:grid-cols-1">
        <ContactMessageCard />
        <ContactLocation store={CONTACT_STORE} />
      </div>
    </PageContainer>
  );
}
