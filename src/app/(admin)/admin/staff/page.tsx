import type { Metadata } from "next";
import { Suspense } from "react";
import { StaffManager } from "@/components/admin/staff/staff-manager";
import { StaffSkeleton } from "@/components/admin/staff/staff-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { toStaffRow } from "@/lib/staff";
import { StaffService } from "@/services/staff.service";

export const metadata: Metadata = {
  title: "Staff & roles | Chocofest BD",
};

async function loadStaff() {
  try {
    const staff = await StaffService.getStaff();
    const now = Date.now();
    return { staff: staff.map((member) => toStaffRow(member, now)), error: null };
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

  if (error) return <LoadError title="Couldn’t load staff" message={error} />;

  return <StaffManager staff={staff} />;
}

export default function StaffPage() {
  return (
    <Suspense fallback={<StaffSkeleton />}>
      <StaffSection />
    </Suspense>
  );
}
