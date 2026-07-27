import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Package,
  Loader2,
} from "lucide-react"
import { productsService } from "@/services/api/products.service"

export function ProductsPage() {
  const [search, setSearch] = useState("")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { search }],
    queryFn: () => productsService.getProducts({ search, page: 1, pageSize: 20 } as any),
  })

  const products = data?.results ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Manage your product inventory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            {isLoading ? "Loading..." : `${data?.count ?? 0} products in inventory`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {isError && (
            <p className="py-8 text-center text-danger">
              Failed to load products. Is the backend running?
            </p>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <p className="py-8 text-center text-slate-500">No products found.</p>
          )}

          {!isLoading && !isError && products.length > 0 && (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Package className="h-6 w-6 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-slate-500">SKU: {product.internalCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">{product.currentStock} units</p>
                      <p className="text-sm text-slate-500">In stock</p>
                    </div>
                    <Badge variant={product.currentStock < product.minimumStock ? "danger" : "success"}>
                      {product.currentStock < product.minimumStock ? "Low Stock" : "In Stock"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
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
