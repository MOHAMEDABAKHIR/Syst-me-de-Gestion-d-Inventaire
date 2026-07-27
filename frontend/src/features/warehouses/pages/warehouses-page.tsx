import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Building2, MoreVertical, Loader2 } from "lucide-react"
import { warehousesService } from "@/services/api/warehouses.service"

export function WarehousesPage() {
  const [search, setSearch] = useState("")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["warehouses", { search }],
    queryFn: () => warehousesService.getWarehouses({ search, page: 1, pageSize: 20 } as any),
  })

  const warehouses = data?.results ?? []

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {isError && (
        <p className="py-8 text-center text-danger">
          Failed to load warehouses. Is the backend running?
        </p>
      )}

      {!isLoading && !isError && warehouses.length === 0 && (
        <p className="py-8 text-center text-slate-500">No warehouses found.</p>
      )}

      {/* Warehouses Grid */}
      {!isLoading && !isError && warehouses.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {warehouses.map((warehouse) => {
            const total = warehouse.totalCapacity ?? warehouse.capacity ?? 0
            const used = warehouse.usedCapacity ?? 0
            const utilization = total > 0 ? Math.round((used / total) * 100) : 0

            return (
              <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                        <CardDescription>{warehouse.code}</CardDescription>
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
                        <span className="font-medium">{utilization}%</span>
                      </div>
                      <Progress value={utilization} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={warehouse.status === "active" ? "success" : "default"}>
                        {warehouse.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
