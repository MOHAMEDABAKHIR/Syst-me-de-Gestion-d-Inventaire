import type { Warehouse, WarehouseFormData, TableParams, PaginatedResponse } from "@/types"
import { apiClient } from "./client"

export const warehousesService = {
  /** GET /api/warehouses/ */
  async getWarehouses(params?: TableParams): Promise<PaginatedResponse<Warehouse>> {
    const response = await apiClient.get<PaginatedResponse<Warehouse>>("/warehouses/", {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
        search: params?.search,
        status: params?.status,
      },
    })
    return response.data
  },

  /** GET /api/warehouses/{id}/ */
  async getWarehouse(id: string): Promise<Warehouse> {
    const response = await apiClient.get<Warehouse>(`/warehouses/${id}/`)
    return response.data
  },

  /** POST /api/warehouses/ */
  async createWarehouse(data: WarehouseFormData): Promise<Warehouse> {
    const response = await apiClient.post<Warehouse>("/warehouses/", data)
    return response.data
  },

  /** PATCH /api/warehouses/{id}/ */
  async updateWarehouse(id: string, data: Partial<WarehouseFormData>): Promise<Warehouse> {
    const response = await apiClient.patch<Warehouse>(`/warehouses/${id}/`, data)
    return response.data
  },

  /** DELETE /api/warehouses/{id}/ */
  async deleteWarehouse(id: string): Promise<void> {
    await apiClient.delete(`/warehouses/${id}/`)
  },
}
