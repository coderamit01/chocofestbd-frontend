import type { Metadata } from "next";
import { Suspense } from "react";
import { SettingsManager } from "@/components/admin/settings/settings-manager";
import { SettingsSkeleton } from "@/components/admin/settings/settings-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { Icon } from "@/components/shared/icon";
import { SETTINGS_ROLES } from "@/config/topbar";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { orderDateCode, parseSettingsTab, toSettingsState } from "@/lib/settings";
import { SettingService } from "@/services/setting.service";

export const metadata: Metadata = {
  title: "Settings | Chocofest BD",
};

type SettingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadSettings() {
  try {
    const [settings, telegram] = await Promise.all([
      SettingService.getAll(),
      SettingService.getTelegramStatus().catch(() => null),
    ]);
    return { ...toSettingsState(settings.data ?? []), telegramStatus: telegram?.data ?? null, dateCode: orderDateCode(Date.now()), error: null };
  } catch (error) {
    return {
      error: error instanceof ApiError ? error.message : "Something went wrong while loading settings. Please refresh the page.",
    };
  }
}

async function SettingsSection({ searchParams }: SettingsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !SETTINGS_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Store settings are only for Super Admins and Admins." />;
  }

  const result = await loadSettings();

  if (result.error !== null) {
    return (
      <section className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
          <Icon name="ban" size={22} strokeWidth={1.8} />
        </span>
        <p className="font-medium text-ink">Couldn’t load settings</p>
        <p className="max-w-sm text-caption text-ink-3">{result.error}</p>
      </section>
    );
  }

  return (
    <SettingsManager
      initialValues={result.values}
      images={result.images}
      telegramStatus={result.telegramStatus}
      initialTab={parseSettingsTab(params.tab)}
      dateCode={result.dateCode}
    />
  );
}

export default function SettingsPage({ searchParams }: SettingsPageProps) {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsSection searchParams={searchParams} />
    </Suspense>
  );
}
