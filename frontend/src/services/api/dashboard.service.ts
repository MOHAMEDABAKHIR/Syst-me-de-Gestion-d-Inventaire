import type { DashboardStats, RecentActivity } from "@/types"
import { apiClient } from "./client"

interface OverviewStats {
  totalProducts: number
  totalWarehouses: number
  totalStockValue: number
  lowStockItems: number
  pendingRequests: number
  todayMovements: number
}

export const dashboardService = {
  /** GET /api/dashboard/ */
  async getOverviewStats(): Promise<DashboardStats> {
    const response = await apiClient.get<OverviewStats>("/dashboard/")
    const data = response.data
    return {
      totalProducts: data.totalProducts,
      totalWarehouses: data.totalWarehouses,
      totalStockValue: data.totalStockValue,
      criticalStock: data.lowStockItems,
      pendingRequests: data.pendingRequests,
      recentMovements: data.todayMovements,
      activeEmployees: 0,
      lowStockProducts: data.lowStockItems,
    }
  },

  /** GET /api/dashboard/recent_activity/ */
  async getRecentActivity(limit = 10): Promise<RecentActivity[]> {
    const response = await apiClient.get<
      Array<{ action: string; entityType: string; userEmail: string; timestamp: string; description: string }>
    >("/dashboard/recent_activity/", { params: { limit } })

    return response.data.map((item, index) => ({
      id: String(index),
      user: item.userEmail,
      action: item.action,
      entity: item.entityType,
      timestamp: item.timestamp,
    }))
  },
}
