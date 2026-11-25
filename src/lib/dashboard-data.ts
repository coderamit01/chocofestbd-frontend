import { ApiError } from "@/lib/api-client";
import { resolveDashboardPeriod } from "@/lib/dashboard-query";
import { DashboardService } from "@/services/dashboard.service";
import type { DashboardData, DashboardQuery } from "@/types/dashboard";

export async function loadDashboard(query: DashboardQuery): Promise<{ data: DashboardData | null; error: string | null }> {
  try {
    const now = Date.now();
    const period = resolveDashboardPeriod(query, now);
    const window = { from: period.from, to: period.to };
    const [summary, chart, overview] = await Promise.all([
      DashboardService.getSummary(window),
      DashboardService.getSalesChart(period.chart),
      DashboardService.getOverview(window),
    ]);

    if (!summary.data || !chart.data || !overview.data) throw new Error("Missing dashboard data");

    return { data: { period, summary: summary.data, chart: chart.data, overview: overview.data, now }, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading the dashboard. Please refresh the page.",
    };
  }
}
