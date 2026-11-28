import type { Metadata } from "next";
import { PolicyPage } from "@/components/store/policy/policy-page";
import { TERMS_POLICY } from "@/config/store-policies";

export const metadata: Metadata = {
  title: `${TERMS_POLICY.title} | Chocofest BD`,
  description: TERMS_POLICY.description,
};

export default function TermsPage() {
  return <PolicyPage policy={TERMS_POLICY} />;
}
