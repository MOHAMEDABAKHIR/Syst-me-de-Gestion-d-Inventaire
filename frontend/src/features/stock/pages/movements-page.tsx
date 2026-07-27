import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Filter,
  ArrowRightLeft,
  ArrowDown,
  ArrowUp,
  MoreVertical
} from "lucide-react"

export function StockMovementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Stock Movements</h1>
          <p className="text-slate-500 mt-1">Track all stock entries, exits, and transfers</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Movement
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search movements..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Movements</CardTitle>
          <CardDescription>Latest stock movements across all warehouses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => {
              const types = ['ENTRY', 'EXIT', 'TRANSFER', 'ADJUSTMENT']
              const type = types[i % 4]
              const icons = {
                ENTRY: <ArrowUp className="h-4 w-4 text-success" />,
                EXIT: <ArrowDown className="h-4 w-4 text-danger" />,
                TRANSFER: <ArrowRightLeft className="h-4 w-4 text-warning" />,
                ADJUSTMENT: <ArrowRightLeft className="h-4 w-4 text-slate-500" />,
              }
              const badges = {
                ENTRY: 'success',
                EXIT: 'danger',
                TRANSFER: 'warning',
                ADJUSTMENT: 'default',
              }
              
              return (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      {icons[type as keyof typeof icons]}
                    </div>
                    <div>
                      <p className="font-medium">Movement #{1000 + i}</p>
                      <p className="text-sm text-slate-500">Product {i} - {10 + i * 5} units</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">{type}</p>
                      <p className="text-sm text-slate-500">2 hours ago</p>
                    </div>
                    <Badge variant={badges[type as keyof typeof badges] as any}>
                      {type}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
