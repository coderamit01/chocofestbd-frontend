import type { Metadata } from "next";
import { PolicyPage } from "@/components/store/policy/policy-page";
import { PRIVACY_POLICY } from "@/config/store-policies";

export const metadata: Metadata = {
  title: `${PRIVACY_POLICY.title} | Chocofest BD`,
  description: PRIVACY_POLICY.description,
};

export default function PrivacyPage() {
  return <PolicyPage policy={PRIVACY_POLICY} />;
}
