"use client";

import { useRef, useState, useTransition, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/profile.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { Icon } from "@/components/shared/icon";
import { PROFILE_PHOTO_TYPES, PROFILE_TABS } from "@/config/profile";
import { validatePassword, validateProfileInfo } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { ProfileClient } from "@/services/profile.client";
import type {
  PasswordErrors,
  PasswordValues,
  ProfileData,
  ProfileInfoErrors,
  ProfileInfoValues,
  ProfileSession,
  ProfileTab,
} from "@/types/profile";
import { ProfileHero } from "./profile-hero";
import { ProfileInfoCard } from "./profile-info-card";
import { ProfilePasswordCard } from "./profile-password-card";
import { ProfileSessionsCard } from "./profile-sessions-card";
import { ProfileAccountCard, ProfileRoleCard, ProfileStrengthCard } from "./profile-side-cards";

type ProfileManagerProps = ProfileData & { initialTab: ProfileTab };

const EMPTY_PASSWORD: PasswordValues = { current: "", next: "", confirm: "" };

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : "Please try again.");

export function ProfileManager({ profile, sessions, passwordChangedAt, lastSignIn, initialTab }: ProfileManagerProps) {
  const router = useRouter();
  const photoInput = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<ProfileTab>(initialTab);

  const [saved, setSaved] = useState<ProfileInfoValues>({ name: profile.name, phone: profile.phone ?? "" });
  const [info, setInfo] = useState<ProfileInfoValues>(saved);
  const [infoErrors, setInfoErrors] = useState<ProfileInfoErrors>({});
  const [isSavingInfo, startSavingInfo] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const [password, setPassword] = useState<PasswordValues>(EMPTY_PASSWORD);
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [isConfirmingSignOut, setIsConfirmingSignOut] = useState(false);
  const [isSigningOutOthers, setIsSigningOutOthers] = useState(false);

  const isDirty = info.name !== saved.name || info.phone !== saved.phone;
  const others = sessions.filter((session) => !session.current).length;

  const selectTab = (next: ProfileTab) => {
    setTab(next);
    const url = new URL(window.location.href);
    if (next === "info") url.searchParams.delete("tab");
    else url.searchParams.set("tab", next);
    window.history.replaceState(null, "", url);
  };

  const changeInfo = (patch: Partial<ProfileInfoValues>) => {
    setInfo((current) => ({ ...current, ...patch }));
    setInfoErrors((current) => ({ ...current, ...Object.fromEntries(Object.keys(patch).map((key) => [key, false])) }));
  };

  const discardInfo = () => {
    setInfo(saved);
    setInfoErrors({});
  };

  const saveInfo = () => {
    const errors = validateProfileInfo(info);
    if (errors.name || errors.phone) {
      setInfoErrors(errors);
      toast.error("Check the highlighted fields", { description: "Your profile wasn’t saved" });
      return;
    }

    startSavingInfo(async () => {
      const next = { name: info.name.trim(), phone: info.phone };
      const result = await updateProfileAction(next);
      if (!result.success) {
        toast.error("Couldn’t save your profile", { description: result.message });
        return;
      }
      setSaved(next);
      setInfo(next);
      setInfoErrors({});
      ProfileClient.syncSession();
      toast.success("Profile saved", { description: "Other staff now see your updated details" });
    });
  };

  const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsUploading(true);
    try {
      await ProfileClient.uploadPhoto(profile.id, file);
      ProfileClient.syncSession();
      toast.success("Photo updated", { description: "Your new photo shows on orders and the activity log" });
      router.refresh();
    } catch (error) {
      toast.error("Couldn’t update your photo", { description: errorMessage(error) });
    } finally {
      setIsUploading(false);
    }
  };

  const changePassword = (patch: Partial<PasswordValues>) => {
    setPassword((current) => ({ ...current, ...patch }));
    setPasswordErrors((current) => ({ ...current, ...Object.fromEntries(Object.keys(patch).map((key) => [key, false])) }));
  };

  const clearPassword = () => {
    setPassword(EMPTY_PASSWORD);
    setPasswordErrors({});
  };

  const savePassword = async () => {
    const errors = validatePassword(password);
    if (errors.current || errors.next || errors.confirm) {
      setPasswordErrors(errors);
      return;
    }

    setIsSavingPassword(true);
    try {
      await ProfileClient.changePassword(password.current, password.next);
      clearPassword();
      toast.success("Password updated", { description: "Other devices were signed out" });
      router.refresh();
    } catch (error) {
      toast.error("Couldn’t update your password", { description: errorMessage(error) });
    } finally {
      setIsSavingPassword(false);
    }
  };

  const signOutSession = async (session: ProfileSession) => {
    setPendingToken(session.token);
    try {
      await ProfileClient.revokeSession(session.token);
      toast.success("Signed out", { description: `${session.device} can no longer use your account` });
      router.refresh();
    } catch (error) {
      toast.error("Couldn’t sign out that device", { description: errorMessage(error) });
    } finally {
      setPendingToken(null);
    }
  };

  const signOutOthers = async () => {
    setIsSigningOutOthers(true);
    try {
      await ProfileClient.revokeOtherSessions();
      setIsConfirmingSignOut(false);
      toast.success(`Signed out of ${others} ${others === 1 ? "device" : "devices"}`, {
        description: "Only this device is signed in now",
      });
      router.refresh();
    } catch (error) {
      toast.error("Couldn’t sign out other devices", { description: errorMessage(error) });
    } finally {
      setIsSigningOutOthers(false);
    }
  };

  const pickPhoto = () => photoInput.current?.click();

  return (
    <>
      <ProfileHero
        profile={profile}
        name={saved.name}
        phone={saved.phone || null}
        isUploading={isUploading}
        onChangePhoto={pickPhoto}
        onEdit={() => selectTab("info")}
      />
      <input ref={photoInput} type="file" accept={PROFILE_PHOTO_TYPES} hidden onChange={uploadPhoto} />

      <div
        role="tablist"
        aria-label="Profile sections"
        className="flex max-w-full gap-1.5 self-start overflow-x-auto rounded-[14px] bg-card p-1.5 [scrollbar-width:none]"
      >
        {PROFILE_TABS.map((item) => {
          const on = item.value === tab;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => selectTab(item.value)}
              className={cn(
                "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap outline-none focus-visible:shadow-focus",
                on ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              <Icon name={item.icon} size={17} strokeWidth={1.8} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-6">
          {tab === "info" && (
            <ProfileInfoCard
              email={profile.email}
              values={info}
              errors={infoErrors}
              isDirty={isDirty}
              isSaving={isSavingInfo}
              onChange={changeInfo}
              onDiscard={discardInfo}
              onSave={saveInfo}
            />
          )}
          {tab === "security" && (
            <>
              <ProfilePasswordCard
                changedAt={passwordChangedAt}
                values={password}
                errors={passwordErrors}
                isVisible={isPasswordVisible}
                isSaving={isSavingPassword}
                onChange={changePassword}
                onToggleVisible={() => setIsPasswordVisible((current) => !current)}
                onCancel={clearPassword}
                onSave={savePassword}
              />
              <ProfileSessionsCard
                sessions={sessions}
                pendingToken={pendingToken}
                onSignOut={signOutSession}
                onSignOutOthers={() => setIsConfirmingSignOut(true)}
              />
            </>
          )}
        </div>

        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          <ProfileStrengthCard items={[{ label: "Add a profile photo", done: !!profile.image, onSelect: pickPhoto }]} />
          <ProfileRoleCard role={profile.role} />
          <ProfileAccountCard lastSignIn={lastSignIn} />
        </aside>
      </div>

      <DangerDialog
        open={isConfirmingSignOut}
        title="Sign out of all other devices?"
        description="Everyone using your account on another device is signed out right away. This device stays signed in."
        confirmLabel="Sign out others"
        pendingLabel="Signing out…"
        isPending={isSigningOutOthers}
        onOpenChange={setIsConfirmingSignOut}
        onConfirm={signOutOthers}
      />
    </>
  );
}
