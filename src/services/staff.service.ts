import { serverApiRequest } from "@/lib/server-api";
import type { InviteStaffPayload, StaffMember } from "@/types/staff";

export const StaffService = {
  getStaff: async () => (await serverApiRequest<StaffMember[]>("/staff")).data ?? [],

  inviteStaff: ({ phone, ...payload }: InviteStaffPayload) =>
    serverApiRequest<StaffMember>("/staff", { method: "POST", body: JSON.stringify({ ...payload, ...(phone && { phone }) }) }),
};
