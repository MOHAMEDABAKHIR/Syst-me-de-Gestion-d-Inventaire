import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Building2,
  TrendingUp,
  AlertTriangle,
  Clock,
  Loader2,
} from "lucide-react"
import { dashboardService } from "@/services/api/dashboard.service"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function timeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function DashboardPage() {
  const statsQuery = useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: () => dashboardService.getOverviewStats(),
  })

  const activityQuery = useQuery({
    queryKey: ["dashboard", "recent-activity"],
    queryFn: () => dashboardService.getRecentActivity(6),
  })

  const stats = statsQuery.data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your inventory system</p>
      </div>

      {statsQuery.isError && (
        <p className="py-4 text-center text-danger">
          Failed to load dashboard stats. Is the backend running?
        </p>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsQuery.isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.totalProducts ?? 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
            <Building2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsQuery.isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.totalWarehouses ?? 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsQuery.isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                formatCurrency(stats?.totalStockValue ?? 0)
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {statsQuery.isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.criticalStock ?? 0}
            </div>
            <p className="text-xs text-slate-500">Products below minimum</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events</CardDescription>
        </CardHeader>
        <CardContent>
          {activityQuery.isLoading && (
            <div className="flex items-center justify-center py-8 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}

          {activityQuery.isError && (
            <p className="py-4 text-center text-danger">Failed to load recent activity.</p>
          )}

          {!activityQuery.isLoading && !activityQuery.isError && (activityQuery.data?.length ?? 0) === 0 && (
            <p className="py-4 text-center text-slate-500">No recent activity.</p>
          )}

          {!activityQuery.isLoading && (activityQuery.data?.length ?? 0) > 0 && (
            <div className="space-y-4">
              {activityQuery.data!.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.action} · {activity.entity}
                    </p>
                    <p className="text-xs text-slate-500">
                      {timeAgo(activity.timestamp)} by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
