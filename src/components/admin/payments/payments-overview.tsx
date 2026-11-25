import { KpiGrid, type Kpi } from "@/components/admin/dashboard/kpi-card";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { ORDER_ROLES } from "@/config/orders";
import { getCurrentUser } from "@/lib/current-user";
import { loadPaymentsPage } from "@/lib/order-page-data";
import { parsePaymentsQuery } from "@/lib/payment-query";
import { formatTaka } from "@/lib/utils";
import type { PaymentSummary } from "@/types/payment";
import { PaymentsManager } from "./payments-manager";

const paymentKpis = (summary: PaymentSummary): Kpi[] => [
  { label: "Awaiting", value: summary.awaiting.toLocaleString("en-IN"), icon: "clock", tone: "amber" },
  { label: "Amount to verify", value: formatTaka(summary.amountToVerify), icon: "cash", tone: "solid" },
  {
    label: "Verified today",
    value: summary.verifiedToday.value.toLocaleString("en-IN"),
    icon: "check",
    tone: "mint",
    change: summary.verifiedToday.change,
    note: "from yesterday",
  },
  {
    label: "Rejected today",
    value: summary.rejectedToday.value.toLocaleString("en-IN"),
    icon: "xcircle",
    tone: "rose",
    change: summary.rejectedToday.change,
    note: "from yesterday",
  },
];

export async function PaymentsOverview({ params }: { params: Record<string, string | string[] | undefined> }) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !ORDER_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Payment verification is only for the order team." />;
  }

  const query = parsePaymentsQuery(params);
  const { data, error } = await loadPaymentsPage(query);

  if (!data) return <LoadError title="Couldn’t load payments" message={error} />;

  return (
    <>
      <KpiGrid kpis={paymentKpis(data.summary)} />
      <PaymentsManager payments={data.payments} meta={data.meta} query={query} now={data.now} />
    </>
  );
}
