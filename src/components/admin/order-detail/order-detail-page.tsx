import { notFound } from "next/navigation";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { ORDER_ROLES } from "@/config/orders";
import { getCurrentUser } from "@/lib/current-user";
import { loadOrderDetail } from "@/lib/order-page-data";
import { OrderDetailView } from "./order-detail-view";

export async function OrderDetailPage({ orderId }: { orderId: string }) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !ORDER_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Orders are only for the order team." />;
  }

  const { data, notFound: missing, error } = await loadOrderDetail(orderId);

  if (missing) notFound();
  if (!data) return <LoadError title="Couldn’t load this order" message={error ?? "Please refresh the page."} />;

  return <OrderDetailView order={data} />;
}
