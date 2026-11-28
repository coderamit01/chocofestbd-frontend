import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import { ACCOUNT_CUSTOMER, ACCOUNT_TABS } from "@/config/store-account";
import { AccountNav } from "./account-nav";
import { AccountProfileCard } from "./account-profile-card";

export function AccountShell({ children }: { children: ReactNode }) {
  return (
    <PageContainer page>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My account" }]} />
      <div className="grid grid-cols-[280px_1fr] items-start gap-6 pt-2.5 max-[900px]:grid-cols-1">
        <aside className="sticky top-4 flex flex-col gap-2.5 max-[900px]:static">
          <AccountProfileCard customer={ACCOUNT_CUSTOMER} />
          <AccountNav tabs={ACCOUNT_TABS} />
        </aside>
        <section className="flex min-w-0 flex-col gap-4">{children}</section>
      </div>
    </PageContainer>
  );
}
