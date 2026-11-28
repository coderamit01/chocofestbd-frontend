import { AccountShell } from "@/components/store/account/account-shell";

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return <AccountShell>{children}</AccountShell>;
}
