import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  Users,
  ArrowRight
} from "lucide-react"

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your inventory system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-slate-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
            <Building2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-slate-500">Across 3 locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-slate-500">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">23</div>
            <p className="text-xs text-slate-500">Products below minimum</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Stock requests awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Request #{1000 + i}</p>
                    <p className="text-xs text-slate-500">Product XYZ - 50 units</p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Requests
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Stock movement completed</p>
                    <p className="text-xs text-slate-500">2 hours ago by John Doe</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Alerts</CardTitle>
          <CardDescription>Products that need immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Package className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Product {i}</p>
                    <p className="text-xs text-slate-500">Warehouse A - Zone 1</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-danger">{10 - i} units</p>
                  <p className="text-xs text-slate-500">Min: 50</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
