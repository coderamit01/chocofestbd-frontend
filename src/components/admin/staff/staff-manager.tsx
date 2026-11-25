"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { STAFF_ROLE_ORDER, STAFF_TABS, type StaffRole, type StaffTab } from "@/config/staff";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";
import { PermissionsMatrix } from "./permissions-matrix";
import { StaffFormDrawer, type StaffDrawerState } from "./staff-form-drawer";
import { StaffTable } from "./staff-table";

const roleRank = (role: User["role"]) => STAFF_ROLE_ORDER.indexOf(role as StaffRole);

export function StaffManager({ staff }: { staff: User[] }) {
  const [tab, setTab] = useState<StaffTab>("staff");
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<StaffRole | "">("");
  const [drawer, setDrawer] = useState<StaffDrawerState>(null);

  const rows = useMemo(() => {
    const search = query.trim().toLowerCase();

    return staff
      .filter((user) => !search || `${user.name}${user.email}`.toLowerCase().includes(search))
      .filter((user) => !roleFilter || user.role === roleFilter)
      .sort((a, b) => roleRank(a.role) - roleRank(b.role) || a.name.localeCompare(b.name));
  }, [staff, query, roleFilter]);

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5]">
      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Staff" className="flex gap-1.5 overflow-x-auto [scrollbar-none]">
          {STAFF_TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={tab === item.value}
              onClick={() => setTab(item.value)}
              className={cn(
                "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap",
                tab === item.value ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <span className="min-w-0 flex-1" />

        {tab === "staff" && (
          <>
            <div className="relative flex flex-[0_1_240px] items-center">
              <Icon name="search" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 text-ink-3" />
              <input
                type="search"
                aria-label="Name or email"
                placeholder="Name or email"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-transparent bg-surface-2 pr-3.5 pl-10.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-[0_0_0_3px_rgb(238_86_21/20%)]"
              />
            </div>
            <select
              aria-label="Role"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value as StaffRole | "")}
              className="select-chevron h-9 w-auto cursor-pointer rounded-[10px] border border-transparent bg-surface-2 pr-9.5 pl-3 text-[13px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgb(238_86_21/20%)]"
            >
              <option value="">All roles</option>
              {STAFF_ROLE_ORDER.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <Button onClick={() => setDrawer({ mode: "invite" })}>
              <Icon name="userAdd" size={18} strokeWidth={1.8} />
              Invite staff
            </Button>
          </>
        )}
      </div>

      {tab === "staff" ? (
        <StaffTable staff={rows} onEdit={(user) => setDrawer({ mode: "edit", user })} />
      ) : (
        <PermissionsMatrix />
      )}

      <StaffFormDrawer state={drawer} onClose={() => setDrawer(null)} />
    </section>
  );
}
