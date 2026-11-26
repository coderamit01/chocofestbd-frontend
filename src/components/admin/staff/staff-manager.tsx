"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { SelectMenu } from "@/components/shared/select-menu";
import { Button } from "@/components/ui/button";
import { STAFF_ROLE_ORDER, STAFF_TABS, type StaffRole, type StaffTab } from "@/config/staff";
import { cn } from "@/lib/utils";
import type { StaffRow } from "@/types/staff";
import { PermissionsMatrix } from "./permissions-matrix";
import { StaffFormDrawer, type StaffDrawerState } from "./staff-form-drawer";
import { StaffTable } from "./staff-table";

const roleRank = (role: StaffRow["role"]) => STAFF_ROLE_ORDER.indexOf(role as StaffRole);

export function StaffManager({ staff }: { staff: StaffRow[] }) {
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
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
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
            <SearchInput
              label="Name or email"
              wrapperClassName="flex-[0_1_240px]"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <SelectMenu<StaffRole | "">
              ariaLabel="Role"
              size="sm"
              value={roleFilter}
              onChange={setRoleFilter}
              options={[{ value: "", label: "All roles" }, ...STAFF_ROLE_ORDER.map((role) => ({ value: role, label: role }))]}
            />
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
