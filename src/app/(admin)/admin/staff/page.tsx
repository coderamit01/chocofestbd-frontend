import type { Metadata } from "next";
import { Suspense } from "react";
import { StaffManager } from "@/components/admin/staff/staff-manager";
import { StaffSkeleton } from "@/components/admin/staff/staff-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { Icon } from "@/components/shared/icon";
import { PageTitle } from "@/components/shared/page-title";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { UserService } from "@/services/user.service";

export const metadata: Metadata = {
  title: "Staff & roles | Chocofest BD",
};

async function loadStaff() {
  try {
    return { staff: await UserService.getStaff(), error: null };
  } catch (error) {
    return {
      staff: [],
      error: error instanceof ApiError ? error.message : "Something went wrong while loading staff. Please refresh the page.",
    };
  }
}

async function StaffSection() {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "SUPER_ADMIN") {
    return <AccessDenied message="Staff & roles is only for Super Admins." />;
  }

  const { staff, error } = await loadStaff();

  if (error) {
    return (
      <section className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
          <Icon name="ban" size={22} strokeWidth={1.8} />
        </span>
        <p className="font-medium text-ink">Couldn’t load staff</p>
        <p className="max-w-sm text-caption text-ink-3">{error}</p>
      </section>
    );
  }

  return <StaffManager staff={staff} />;
}

export default function StaffPage() {
  return (
    <>
      <PageTitle title="Staff & roles" />
      <Suspense fallback={<StaffSkeleton />}>
        <StaffSection />
      </Suspense>
    </>
  );
}
