import type { Product, ProductFormData, TableParams, PaginatedResponse } from "@/types"
import { apiClient } from "./client"

export const productsService = {
  /** GET /api/inventory/products/ */
  async getProducts(params?: TableParams): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>("/inventory/products/", {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
        search: params?.search,
        status: params?.status,
        ordering: params?.field
          ? `${params.direction === "desc" ? "-" : ""}${params.field}`
          : undefined,
      },
    })
    return response.data
  },

  /** GET /api/inventory/products/{id}/ */
  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/inventory/products/${id}/`)
    return response.data
  },

  /** POST /api/inventory/products/ */
  async createProduct(data: ProductFormData): Promise<Product> {
    const response = await apiClient.post<Product>("/inventory/products/", data)
    return response.data
  },

  /** PATCH /api/inventory/products/{id}/ */
  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
    const response = await apiClient.patch<Product>(`/inventory/products/${id}/`, data)
    return response.data
  },

  /** DELETE /api/inventory/products/{id}/ */
  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/inventory/products/${id}/`)
  },

  /** GET /api/inventory/products/barcode/{barcode}/ */
  async getProductByBarcode(barcode: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/inventory/products/barcode/${barcode}/`)
    return response.data
  },
}
