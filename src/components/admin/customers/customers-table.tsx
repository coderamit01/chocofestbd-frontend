import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { customerPath } from "@/config/customers";
import { AVATAR_TONES } from "@/config/staff";
import { isBengali } from "@/lib/customer-query";
import { filterStyles } from "@/lib/filter-styles";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatDate, formatPhone, formatTaka, pickByHash } from "@/lib/utils";
import type { CustomerRow, CustomerSort } from "@/types/customer";

type CustomersTableProps = {
  customers: CustomerRow[];
  canBan: boolean;
  isPending: boolean;
  onSort: (sort: Exclude<CustomerSort, "newest">) => void;
  onBan: (customer: CustomerRow) => void;
};

export function CustomerAvatar({ customer, className }: { customer: Pick<CustomerRow, "id" | "name">; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 flex-none items-center justify-center rounded-full font-heading text-[13px] leading-none font-semibold",
        pickByHash(customer.id, AVATAR_TONES),
        isBengali(customer.name) && "font-bengali",
        className
      )}
    >
      {customer.name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

export function CustomersTable({ customers, canBan, isPending, onSort, onBan }: CustomersTableProps) {
  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className={tableStyles.head}>Customer</th>
            <th className={tableStyles.head}>Phone</th>
            <th className={cn(tableStyles.head, "text-right")}>
              <button type="button" onClick={() => onSort("orders")} className={filterStyles.sortButton}>
                Orders <Icon name="sort" size={12} strokeWidth={1.8} />
              </button>
            </th>
            <th className={cn(tableStyles.head, "text-right")}>
              <button type="button" onClick={() => onSort("spent")} className={filterStyles.sortButton}>
                Total spent <Icon name="sort" size={12} strokeWidth={1.8} />
              </button>
            </th>
            <th className={cn(tableStyles.head, "text-right")}>Points</th>
            <th className={tableStyles.head}>Joined</th>
            <th className={tableStyles.head}>Status</th>
            <th className={cn(tableStyles.head, "text-right")}>
                Actions
              </th>
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {customers.map((customer) => (
            <tr key={customer.id} className={tableStyles.row}>
              <td className={tableStyles.cell} data-label="Customer">
                <span className="flex items-center gap-3">
                  <CustomerAvatar customer={customer} />
                  <span className="flex flex-col text-left">
                    <Link
                      href={customerPath(customer.id)}
                      className={cn("font-medium text-ink hover:text-brand-text", isBengali(customer.name) && "font-bengali")}
                    >
                      {customer.name}
                    </Link>
                    <span className="text-xs text-ink-3">{customer.email || "No email"}</span>
                  </span>
                </span>
              </td>
              <td className={tableStyles.cell} data-label="Phone">
                <span className="flex items-center gap-1.5">
                  <span className="tabular-nums">{customer.phone ? formatPhone(customer.phone) : "—"}</span>
                  {customer.phone && customer.phoneVerified && (
                    <span title="Verified" aria-label="Verified" className="inline-flex text-success">
                      <Icon name="verified" size={16} strokeWidth={1.8} />
                    </span>
                  )}
                </span>
              </td>
              <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Orders">
                {customer.orderCount.toLocaleString("en-IN")}
              </td>
              <td className={cn(tableStyles.cell, "text-right font-semibold tabular-nums")} data-label="Total spent">
                {formatTaka(customer.totalSpent)}
              </td>
              <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Points">
                {customer.points.toLocaleString("en-IN")}
              </td>
              <td className={cn(tableStyles.cell, "text-caption whitespace-nowrap text-ink-3")} data-label="Joined">
                {formatDate(customer.createdAt)}
              </td>
              <td className={tableStyles.cell} data-label="Status">
                <StatusBadge kind="account" status={customer.isBanned ? "BANNED" : "ACTIVE"} />
              </td>
              <td className={tableStyles.bareCell}>
                <div className="flex justify-end gap-1.5">
                  <Link
                    href={customerPath(customer.id)}
                    aria-label={`View ${customer.name}`}
                    className={buttonVariants({ variant: "square", size: "icon-md" })}
                  >
                    <Icon name="eye" size={16} strokeWidth={1.8} />
                  </Link>
                  {canBan && (
                    <button
                      type="button"
                      disabled={isPending}
                      aria-label={`${customer.isBanned ? "Unban" : "Ban"} ${customer.name}`}
                      title={customer.isBanned ? "Unban" : "Ban"}
                      onClick={() => onBan(customer)}
                      className={buttonVariants({ variant: "square", size: "icon-md" })}
                    >
                      <Icon name="ban" size={16} strokeWidth={1.8} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
