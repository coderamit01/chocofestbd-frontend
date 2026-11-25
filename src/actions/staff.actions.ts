"use server";

import { StaffService } from "@/services/staff.service";
import type { InviteStaffPayload } from "@/types/staff";
import { runCatalogAction } from "./catalog-action";

export async function inviteStaffAction(payload: InviteStaffPayload) {
  return runCatalogAction(() => StaffService.inviteStaff(payload));
}
