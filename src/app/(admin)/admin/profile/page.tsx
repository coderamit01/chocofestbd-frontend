import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileManager } from "@/components/admin/profile/profile-manager";
import { ProfileSkeleton } from "@/components/admin/profile/profile-skeleton";
import { LoadError } from "@/components/shared/load-error";
import { ApiError } from "@/lib/api-client";
import { relativeDhakaTime } from "@/lib/dhaka-time";
import { parseProfileTab, toProfileSessions } from "@/lib/profile";
import { ProfileService } from "@/services/profile.service";
import type { ProfileData } from "@/types/profile";

export const metadata: Metadata = {
  title: "My profile | Chocofest BD",
};

type ProfilePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadProfile(): Promise<{ data: ProfileData | null; error: string | null }> {
  try {
    const [profile, current, sessions, accounts] = await Promise.all([
      ProfileService.getProfile(),
      ProfileService.getCurrentSession(),
      ProfileService.listSessions(),
      ProfileService.listAccounts().catch(() => []),
    ]);

    if (!profile.data) throw new ApiError("Your profile couldn’t be found.", 404);

    const now = Date.now();
    const currentId = current?.session.id ?? null;
    const currentSession = sessions.find((session) => session.id === currentId);

    return {
      data: {
        profile: profile.data,
        sessions: toProfileSessions(sessions, currentId, now),
        passwordChangedAt: accounts.find((account) => account.providerId === "credential")?.updatedAt ?? null,
        lastSignIn: currentSession ? relativeDhakaTime(currentSession.createdAt, now) : null,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading your profile. Please refresh the page.",
    };
  }
}

async function ProfileSection({ searchParams }: ProfilePageProps) {
  const [{ data, error }, params] = await Promise.all([loadProfile(), searchParams]);

  if (!data) return <LoadError title="Couldn’t load your profile" message={error ?? ""} />;

  return <ProfileManager {...data} initialTab={parseProfileTab(params.tab)} />;
}

export default function ProfilePage({ searchParams }: ProfilePageProps) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileSection searchParams={searchParams} />
    </Suspense>
  );
}
