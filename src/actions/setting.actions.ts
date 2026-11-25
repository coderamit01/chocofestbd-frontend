"use server";

import { refresh } from "next/cache";
import { ApiError, type ApiFieldError } from "@/lib/api-client";
import { markdownToHtml } from "@/lib/markdown";
import { SettingService } from "@/services/setting.service";
import type { ActionResult } from "@/types/api";
import type { EditableSettingGroup, SettingValues } from "@/types/setting";

export type SaveSettingsResult = ActionResult & {
  savedGroups: EditableSettingGroup[];
  fieldErrors: ApiFieldError[];
};

const prepare = <G extends EditableSettingGroup>(group: G, value: SettingValues[G]): SettingValues[G] =>
  group === "legal"
    ? (Object.fromEntries(Object.entries(value).map(([key, text]) => [key, markdownToHtml(String(text))])) as SettingValues[G])
    : value;

export async function saveSettingsAction(changes: Partial<SettingValues>): Promise<SaveSettingsResult> {
  const savedGroups: EditableSettingGroup[] = [];
  const fieldErrors: ApiFieldError[] = [];
  let message = "";

  for (const group of Object.keys(changes) as EditableSettingGroup[]) {
    try {
      await SettingService.updateGroup(group, prepare(group, changes[group] as SettingValues[typeof group]));
      savedGroups.push(group);
    } catch (error) {
      const apiError = error instanceof ApiError ? error : null;
      message ||= apiError?.message ?? "Something went wrong. Please try again.";
      fieldErrors.push(
        ...(apiError?.fieldErrors.length
          ? apiError.fieldErrors.map((item) => ({ field: item.field ? `${group}.${item.field}` : group, message: item.message }))
          : [{ field: group, message: apiError?.message ?? "Couldn’t save" }])
      );
    }
  }

  if (savedGroups.length) refresh();

  const success = fieldErrors.length === 0;
  return { success, message: success ? "Changes are live on chocofestbd.com" : message, savedGroups, fieldErrors };
}

export async function removeSettingImageAction(group: string, field: string): Promise<ActionResult> {
  try {
    const { message } = await SettingService.removeImage(group, field);
    refresh();
    return { success: true, message };
  } catch (error) {
    return { success: false, message: error instanceof ApiError ? error.message : "Something went wrong. Please try again." };
  }
}

export async function sendTelegramTestAction(): Promise<ActionResult> {
  try {
    const { message } = await SettingService.sendTelegramTest();
    return { success: true, message };
  } catch (error) {
    return { success: false, message: error instanceof ApiError ? error.message : "Something went wrong. Please try again." };
  }
}

export async function refreshSettingsAction() {
  refresh();
}
