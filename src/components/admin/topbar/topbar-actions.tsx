"use client";

import { useCallback, useState } from "react";
import { NOTIFICATION_PAGE_ROLES, type TopbarPanel } from "@/config/topbar";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/types/auth";
import { TopbarAccount } from "./topbar-account";
import { TopbarNotifications } from "./topbar-notifications";
import { TopbarSearch } from "./topbar-search";

export function TopbarActions() {
  const { data } = authClient.useSession();
  const [panel, setPanel] = useState<TopbarPanel | null>(null);

  const user = data?.user;
  const role = user?.role as UserRole | undefined;
  const close = useCallback(() => setPanel(null), []);
  const toggle = (next: TopbarPanel) => () => setPanel((current) => (current === next ? null : next));

  return (
    <div className="flex items-center gap-3">
      <TopbarSearch role={role} open={panel === "search"} onToggle={toggle("search")} onClose={close} />
      <TopbarNotifications
        open={panel === "notifications"}
        canViewAll={!!role && NOTIFICATION_PAGE_ROLES.includes(role)}
        onToggle={toggle("notifications")}
        onClose={close}
      />
      <TopbarAccount
        user={user && { name: user.name, email: user.email, role }}
        open={panel === "account"}
        onToggle={toggle("account")}
        onClose={close}
      />
    </div>
  );
}
