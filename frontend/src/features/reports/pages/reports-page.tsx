import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp
} from "lucide-react"

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
          <p className="text-slate-500 mt-1">Generate and export inventory reports</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Stock Status Report", description: "Current stock levels across all products", icon: BarChart3 },
              { title: "Low Stock Report", description: "Products below minimum stock levels", icon: TrendingUp },
              { title: "Valuation Report", description: "Total inventory value by category", icon: PieChart },
              { title: "Category Analysis", description: "Product distribution by category", icon: BarChart3 },
              { title: "Supplier Performance", description: "Delivery times and quality metrics", icon: FileText },
              { title: "Product Turnover", description: "Fast and slow moving products", icon: TrendingUp },
            ].map((report, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <report.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="text-sm">{report.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movement Reports</CardTitle>
              <CardDescription>Track all stock entries, exits, and transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Monthly Movement Summary", lastGenerated: "2024-07-01" },
                  { name: "Entry/Exit Analysis", lastGenerated: "2024-06-30" },
                  { name: "Transfer Log", lastGenerated: "2024-07-15" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-slate-500">Last generated: {report.lastGenerated}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Reports</CardTitle>
              <CardDescription>Capacity, utilization, and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Capacity Utilization", lastGenerated: "2024-07-20" },
                  { name: "Location Analysis", lastGenerated: "2024-07-18" },
                  { name: "Warehouse Performance", lastGenerated: "2024-07-15" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-slate-500">Last generated: {report.lastGenerated}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Reports</CardTitle>
              <CardDescription>Activity, performance, and access reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Activity Log", lastGenerated: "2024-07-25" },
                  { name: "Access Summary", lastGenerated: "2024-07-20" },
                  { name: "Performance Metrics", lastGenerated: "2024-07-15" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-slate-500">Last generated: {report.lastGenerated}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
