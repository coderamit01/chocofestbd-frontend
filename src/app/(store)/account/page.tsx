import type { Metadata } from "next";
import { AccountStats } from "@/components/store/account/account-stats";
import { OrdersView } from "@/components/store/account/orders-view";
import { ACCOUNT_ORDERS, ACCOUNT_STATS, ORDER_FILTERS } from "@/config/store-account";

export const metadata: Metadata = {
  title: "My account | Chocofest BD",
};

export default function AccountOrdersPage() {
  return <OrdersView orders={ACCOUNT_ORDERS} filters={ORDER_FILTERS} stats={<AccountStats stats={ACCOUNT_STATS} />} />;
}
