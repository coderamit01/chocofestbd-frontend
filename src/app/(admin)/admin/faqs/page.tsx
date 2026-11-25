import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqsManager } from "@/components/admin/faqs/faqs-manager";
import { FaqsSkeleton } from "@/components/admin/faqs/faqs-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { FAQ_DELETE_ROLES, FAQ_ROLES } from "@/config/faqs";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { FaqService } from "@/services/faq.service";

export const metadata: Metadata = {
  title: "FAQs | Chocofest BD",
};

async function loadFaqs() {
  try {
    return { faqs: await FaqService.getAllFaqs(), error: null };
  } catch (error) {
    return {
      faqs: [],
      error: error instanceof ApiError ? error.message : "Something went wrong while loading FAQs. Please refresh the page.",
    };
  }
}

async function FaqsSection() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !FAQ_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="FAQs are only for the content team." />;
  }

  const { faqs, error } = await loadFaqs();

  if (error) return <LoadError title="Couldn’t load FAQs" message={error} />;

  return <FaqsManager faqs={faqs} canDelete={FAQ_DELETE_ROLES.includes(currentUser.role)} />;
}

export default function FaqsPage() {
  return (
    <Suspense fallback={<FaqsSkeleton />}>
      <FaqsSection />
    </Suspense>
  );
}
