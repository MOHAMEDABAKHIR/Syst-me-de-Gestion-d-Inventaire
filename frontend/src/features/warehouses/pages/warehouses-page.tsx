import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Plus, 
  Building2,
  MoreVertical
} from "lucide-react"

export function WarehousesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Warehouses</h1>
          <p className="text-slate-500 mt-1">Manage warehouse locations and capacity</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Warehouse
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search warehouses..." 
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Warehouses Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Warehouse {i}</CardTitle>
                    <CardDescription>WH-{1000 + i}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">Capacity</span>
                    <span className="font-medium">{70 + i * 5}%</span>
                  </div>
                  <Progress value={70 + i * 5} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Products</p>
                    <p className="font-medium">{100 + i * 20}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Zones</p>
                    <p className="font-medium">{3 + i}</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
