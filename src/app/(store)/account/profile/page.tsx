import type { Metadata } from "next";
import { AccountHeading } from "@/components/store/account/account-heading";
import { ProfileForm } from "@/components/store/account/profile-form";
import { ACCOUNT_CUSTOMER } from "@/config/store-account";

export const metadata: Metadata = {
  title: "Profile | Chocofest BD",
};

export default function AccountProfilePage() {
  return (
    <>
      <AccountHeading title="Profile" />
      <ProfileForm customer={ACCOUNT_CUSTOMER} />
    </>
  );
}
