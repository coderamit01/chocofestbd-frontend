import { notFound } from "next/navigation";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { ORDER_ROLES, ORDERS_PATH, orderPath } from "@/config/orders";
import { getCurrentUser } from "@/lib/current-user";
import { loadInvoices } from "@/lib/order-page-data";
import { InvoiceSheet } from "./invoice-sheet";
import { InvoiceToolbar } from "./invoice-toolbar";

export async function InvoicePage({ orderIds }: { orderIds: string[] }) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !ORDER_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Invoices are only for the order team." />;
  }

  if (!orderIds.length) notFound();

  const { data, now, notFound: missing, error } = await loadInvoices(orderIds);

  if (missing) notFound();
  if (error) return <LoadError title="Couldn’t load the invoice" message={error} />;

  const single = orderIds.length === 1;

  return (
    <>
      <InvoiceToolbar
        backHref={single ? orderPath(orderIds[0]) : ORDERS_PATH}
        backLabel={single ? "Back to order" : "Back to orders"}
        count={data.length}
      />
      <div data-print-root className="flex flex-col gap-6 overflow-x-auto pb-2">
        {data.map((invoice) => (
          <InvoiceSheet key={invoice.id} invoice={invoice} printedAt={now} page={1} pages={1} />
        ))}
      </div>
    </>
  );
}
