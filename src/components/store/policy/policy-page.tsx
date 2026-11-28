import { HelpBanner } from "@/components/store/faq/help-banner";
import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { HeroKicker } from "@/components/store/ui/hero-kicker";
import { PageContainer } from "@/components/store/ui/page-container";
import { StoreCard } from "@/components/store/ui/store-card";
import type { StorePolicy } from "@/types/store-policy";
import { PolicyHighlights } from "./policy-highlights";
import { PolicySection } from "./policy-section";
import { POLICY_PARAGRAPH_CLASS } from "./policy-styles";
import { PolicyToc } from "./policy-toc";

export function PolicyPage({ policy }: { policy: StorePolicy }) {
  return (
    <PageContainer page>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: policy.title }]} />
      <div className="grid grid-cols-[240px_1fr] items-start gap-7 pt-2.5 max-[900px]:grid-cols-1">
        <PolicyToc sections={policy.sections} updated={policy.updated} />
        <StoreCard
          as="article"
          className="max-w-[760px] px-10 py-9 text-base leading-[normal] max-[900px]:px-[18px] max-[900px]:py-[22px]"
        >
          <HeroKicker>{policy.kicker}</HeroKicker>
          <h1 className="mt-3 mb-2 font-heading text-[34px] leading-[1.15] font-bold tracking-normal text-ink max-[900px]:text-[26px]">
            {policy.title}
          </h1>
          <p className={POLICY_PARAGRAPH_CLASS}>{policy.lead}</p>
          {policy.highlights && <PolicyHighlights items={policy.highlights} />}
          {policy.sections.map((section, index) => (
            <PolicySection key={section.id} section={section} index={index + 1} />
          ))}
          <HelpBanner className="mt-5" title={policy.help.title} text={policy.help.text} />
        </StoreCard>
      </div>
    </PageContainer>
  );
}
