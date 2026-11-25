import { serverApiRequest } from "@/lib/server-api";
import type { ChartGroupBy, DashboardOverview, DashboardSummary, DateWindow, SalesChart } from "@/types/dashboard";

const windowParams = ({ from, to }: DateWindow) => new URLSearchParams({ from, to });

export const DashboardService = {
  getSummary: (window: DateWindow) => serverApiRequest<DashboardSummary>(`/dashboard/summary?${windowParams(window)}`),

  getSalesChart: (window: DateWindow & { groupBy: ChartGroupBy }) =>
    serverApiRequest<SalesChart>(`/dashboard/sales-chart?${new URLSearchParams({ from: window.from, to: window.to, groupBy: window.groupBy })}`),

  getOverview: (window: DateWindow) => serverApiRequest<DashboardOverview>(`/dashboard/overview?${windowParams(window)}`),
};
