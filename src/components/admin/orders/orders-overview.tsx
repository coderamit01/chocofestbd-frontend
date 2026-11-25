import { KpiGrid, type Kpi } from "@/components/admin/dashboard/kpi-card";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { ORDER_ROLES } from "@/config/orders";
import { getCurrentUser } from "@/lib/current-user";
import { loadOrdersPage } from "@/lib/order-page-data";
import { parseOrdersQuery } from "@/lib/order-query";
import type { OrderSummary } from "@/types/order";
import { OrdersManager } from "./orders-manager";

const orderKpis = (summary: OrderSummary): Kpi[] => [
  { label: "Total orders", value: summary.total.value.toLocaleString("en-IN"), icon: "orders", tone: "solid", change: summary.total.change },
  { label: "Pending", value: summary.pending.value.toLocaleString("en-IN"), icon: "clock", tone: "amber", change: summary.pending.change },
  { label: "Shipped", value: summary.shipped.value.toLocaleString("en-IN"), icon: "zones", tone: "sky", change: summary.shipped.change },
  { label: "Delivered", value: summary.delivered.value.toLocaleString("en-IN"), icon: "check", tone: "mint", change: summary.delivered.change },
];

export async function OrdersOverview({ params }: { params: Record<string, string | string[] | undefined> }) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !ORDER_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Orders are only for the order team." />;
  }

  const query = parseOrdersQuery(params);
  const { data, error } = await loadOrdersPage(query);

  if (!data) return <LoadError title="Couldn’t load orders" message={error} />;

  return (
    <>
      <KpiGrid kpis={orderKpis(data.summary)} />
      <OrdersManager orders={data.orders} meta={data.meta} counts={data.counts} filterOptions={data.filters} query={query} />
    </>
  );
}
