import type { Metadata } from "next";
import { Suspense } from "react";
import { UsersTableSkeleton, UsersToolbarSkeleton } from "@/components/admin/users/users-skeletons";
import { UsersTable } from "@/components/admin/users/users-table";
import { UsersToolbar } from "@/components/admin/users/users-toolbar";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Users | Chocofest BD",
};

export default function UsersPage({ searchParams }: PageProps<"/admin/users">) {
  return (
    <div className="flex flex-col gap-6 py-2">
      <PageHeader title="Users" description="Manage customer and staff accounts, roles and access." />

      <Suspense fallback={<UsersToolbarSkeleton />}>
        <UsersToolbar />
      </Suspense>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
