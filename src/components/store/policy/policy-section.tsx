import type { PolicySection as PolicySectionData } from "@/types/store-policy";
import { POLICY_PARAGRAPH_CLASS } from "./policy-styles";

type PolicySectionProps = {
  section: PolicySectionData;
  index: number;
};

export function PolicySection({ section, index }: PolicySectionProps) {
  return (
    <>
      <h2
        id={section.id}
        className="mt-[26px] mb-2 scroll-mt-5 font-heading text-[19px] leading-[1.3] font-bold tracking-normal text-ink"
      >
        {index}. {section.title}
      </h2>
      <p className={POLICY_PARAGRAPH_CLASS}>{section.body}</p>
    </>
  );
}
