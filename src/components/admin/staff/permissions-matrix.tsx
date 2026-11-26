"use client";

import { useState } from "react";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { PERMISSION_COLUMNS, PERMISSION_MODULES, ROLE_PERMISSIONS, STAFF_ROLE_ORDER, type StaffRole } from "@/config/staff";
import { STATUS_BADGES } from "@/config/status-badges";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";

export function PermissionsMatrix() {
  const [role, setRole] = useState<StaffRole>("MANAGER");
  const permissions = ROLE_PERMISSIONS[role];

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-ink-2">Permissions for</span>
        <div role="group" aria-label="Role" className="inline-flex flex-wrap gap-1 rounded-[12px] bg-surface-2 p-1">
          {STAFF_ROLE_ORDER.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={role === value}
              onClick={() => setRole(value)}
              className={cn(
                "h-8 rounded-[9px] px-3.5 text-[13px] leading-none font-medium whitespace-nowrap text-ink-2 hover:text-ink",
                role === value && "bg-surface text-ink shadow-seg"
              )}
            >
              {STATUS_BADGES.role[value].label}
            </button>
          ))}
        </div>
        <Badge variant="neutral">
          <Icon name="lock" size={13} strokeWidth={1.8} />
          Read-only
        </Badge>
      </div>

      <div className={tableStyles.wrapper}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th className={tableStyles.head}>Module</th>
              {PERMISSION_COLUMNS.map((column) => (
                <th key={column.value} className={cn(tableStyles.head, "text-center")}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={tableStyles.body}>
            {PERMISSION_MODULES.map((module) => (
              <tr key={module} className={tableStyles.row}>
                <td data-label="Module" className={cn(tableStyles.cell, "font-medium")}>
                  {module}
                </td>
                {PERMISSION_COLUMNS.map((column) => {
                  const allowed = permissions[module].includes(column.value);

                  return (
                    <td key={column.value} data-label={column.label} className={cn(tableStyles.cell, "text-center")}>
                      <span
                        aria-label={allowed ? "Allowed" : "Not allowed"}
                        className={cn(
                          "inline-flex size-7 items-center justify-center rounded-sm",
                          allowed ? "bg-success-soft text-success" : "bg-surface-2 text-ink-4"
                        )}
                      >
                        <Icon name={allowed ? "check" : "minus"} size={15} strokeWidth={2.4} />
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-3">Role permissions are fixed in code. Ask a developer to change them.</p>
    </>
  );
}
