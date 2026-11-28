import type { Metadata } from "next";
import { FaqCenter } from "@/components/store/faq/faq-center";
import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import { FAQ_CATEGORIES, FAQ_ENTRIES } from "@/config/store-faq";

export const metadata: Metadata = {
  title: "Help & FAQ | Chocofest BD",
  description: "Answers about delivery, payment, products, returns and gifting at ChocoFest BD.",
};

export default function FaqPage() {
  return (
    <PageContainer page>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Help & FAQ" }]} />
      <FaqCenter categories={FAQ_CATEGORIES} entries={FAQ_ENTRIES} />
    </PageContainer>
  );
}
