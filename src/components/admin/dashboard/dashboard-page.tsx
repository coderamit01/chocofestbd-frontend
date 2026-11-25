import { redirect } from "next/navigation";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { DASHBOARD_ROLES, ROLE_LANDING } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/current-user";
import { loadDashboard } from "@/lib/dashboard-data";
import { parseDashboardQuery } from "@/lib/dashboard-query";
import { DashboardView } from "./dashboard-view";

export async function DashboardPage({ params }: { params: Record<string, string | string[] | undefined> }) {
  const currentUser = await getCurrentUser();
  const landing = currentUser?.role ? ROLE_LANDING[currentUser.role] : undefined;

  if (landing) redirect(landing);

  if (!currentUser?.role || !DASHBOARD_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="The dashboard is only for admins and managers." />;
  }

  const query = parseDashboardQuery(params);
  const { data, error } = await loadDashboard(query);

  if (!data) return <LoadError title="Couldn’t load the dashboard" message={error ?? "Please refresh the page."} />;

  return <DashboardView key={`${data.period.from}-${data.period.to}`} data={data} query={query} />;
}
