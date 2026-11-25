import { apiRequest } from "@/lib/api-client";
import type { ImageSettingGroup, SettingGroupView } from "@/types/setting";

export const SettingClient = {
  uploadImage: (group: ImageSettingGroup, field: string, file: File) => {
    const formData = new FormData();
    formData.append(field, file);
    return apiRequest<SettingGroupView>(`/settings/admin/${group}/images`, { method: "PUT", body: formData });
  },
};
