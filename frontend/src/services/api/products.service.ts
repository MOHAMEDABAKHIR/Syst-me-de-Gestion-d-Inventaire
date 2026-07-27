import type { Product, ProductFormData, TableParams, PaginatedResponse } from "@/types"
import { mockProducts } from "./mock-data"

// Mock products service
// This will be replaced with actual API calls to Django backend

export const productsService = {
  async getProducts(params?: TableParams): Promise<PaginatedResponse<Product>> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredProducts = [...mockProducts]
    
    // Apply search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.internalCode.toLowerCase().includes(searchLower) ||
          product.barcode?.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply status filter
    if (params?.status) {
      filteredProducts = filteredProducts.filter(product => product.status === params.status)
    }
    
    // Apply pagination
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    
    return {
      results: filteredProducts.slice(startIndex, endIndex),
      count: filteredProducts.length,
      next: endIndex < filteredProducts.length ? `/api/products?page=${page + 1}` : null,
      previous: page > 1 ? `/api/products?page=${page - 1}` : null,
    }
  },

  async getProduct(id: string): Promise<Product> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      throw new Error("Product not found")
    }
    return product
  },

  async createProduct(data: ProductFormData): Promise<Product> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    mockProducts.push(newProduct)
    return newProduct
  },

  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error("Product not found")
    }
    
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    
    return mockProducts[index]
  },

  async deleteProduct(id: string): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error("Product not found")
    }
    
    mockProducts.splice(index, 1)
  },
}
