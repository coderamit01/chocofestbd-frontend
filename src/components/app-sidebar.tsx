"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { ADMIN_NAV, ADMIN_NAV_SECONDARY } from "@/config/admin-nav";
import { authClient } from "@/lib/auth-client";
import { filterNavByRole } from "@/lib/nav";
import type { UserRole } from "@/types/auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const role = user?.role as UserRole | undefined;

  const sections = React.useMemo(() => (role ? filterNavByRole(ADMIN_NAV, role) : []), [role]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin" />}>
              <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary/10">
                <Image src="/Chocofestbd Logo.webp" alt="" width={32} height={32} className="size-8 object-contain" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Chocofest BD</span>
                <span className="truncate text-xs">Admin Panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {isPending ? (
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 6 }, (_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          sections.map((section) => (
            <NavMain key={section.label} label={section.label} items={section.items} />
          ))
        )}
        <NavSecondary items={ADMIN_NAV_SECONDARY} className="mt-auto" />
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <NavUser user={{ name: user.name, email: user.email, avatar: user.image ?? "" }} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
