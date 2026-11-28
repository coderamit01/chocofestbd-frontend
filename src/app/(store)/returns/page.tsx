import type { Metadata } from "next";
import { PolicyPage } from "@/components/store/policy/policy-page";
import { RETURNS_POLICY } from "@/config/store-policies";

export const metadata: Metadata = {
  title: `${RETURNS_POLICY.title} | Chocofest BD`,
  description: RETURNS_POLICY.description,
};

export default function ReturnsPage() {
  return <PolicyPage policy={RETURNS_POLICY} />;
}
