"use client";

import { useMemo } from "react";
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { ADMIN_NAV, type NavCounts } from "@/config/admin-nav";
import { authClient } from "@/lib/auth-client";
import { filterNavByRole } from "@/lib/nav";
import type { UserRole } from "@/types/auth";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarLogout } from "./sidebar-logout";
import { SidebarNav } from "./sidebar-nav";
import { SidebarNavSkeleton } from "./sidebar-nav-skeleton";
import { SidebarToggle } from "./sidebar-toggle";

type AdminSidebarViewProps = {
  role?: UserRole;
  isPending?: boolean;
  counts?: NavCounts;
};

export function AdminSidebarView({ role, isPending = false, counts }: AdminSidebarViewProps) {
  const { state, isMobile } = useSidebar();
  const expanded = state === "expanded" || isMobile;
  const sections = useMemo(() => (role ? filterNavByRole(ADMIN_NAV, role) : []), [role]);

  return (
    <Sidebar collapsible="icon" className="z-35">
      <div className="relative flex h-full flex-col px-4 pt-[22px] pb-[18px] font-sans">
        {!isMobile && <SidebarToggle collapsed={state === "collapsed"} />}
        <SidebarBrand expanded={expanded} />
        {isPending ? <SidebarNavSkeleton /> : <SidebarNav sections={sections} counts={counts} expanded={expanded} />}
        <SidebarLogout expanded={expanded} />
      </div>
    </Sidebar>
  );
}

export function AdminSidebar({ counts }: { counts?: NavCounts }) {
  const { data, isPending } = authClient.useSession();

  return <AdminSidebarView role={data?.user.role as UserRole | undefined} isPending={isPending} counts={counts} />;
}
