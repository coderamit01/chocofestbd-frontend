import { serverApiRequest } from "@/lib/server-api";
import type { EditableSettingGroup, SettingGroupView, SettingValues, TelegramStatus } from "@/types/setting";

export const SettingService = {
  getAll: () => serverApiRequest<SettingGroupView[]>("/settings/admin"),

  updateGroup: <G extends EditableSettingGroup>(group: G, value: SettingValues[G]) =>
    serverApiRequest<SettingGroupView>(`/settings/admin/${group}`, { method: "PUT", body: JSON.stringify(value) }),

  removeImage: (group: string, field: string) =>
    serverApiRequest<SettingGroupView>(`/settings/admin/${group}/images/${field}`, { method: "DELETE" }),

  getTelegramStatus: () => serverApiRequest<TelegramStatus>("/notifications/telegram/status"),

  sendTelegramTest: () => serverApiRequest("/notifications/telegram/test", { method: "POST" }),
};
