// User Types
export type UserRole = 
  | "SUPER_ADMIN"
  | "ADMINISTRATOR"
  | "WAREHOUSE_MANAGER"
  | "MAINTENANCE_MANAGER"
  | "WAREHOUSE_OPERATOR"
  | "TECHNICIAN"
  | "VIEWER"

export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName?: string
  avatar?: string
  role: UserRole
  department?: string
  position?: string
  employeeId?: string
  phone?: string
  status?: UserStatus
  createdAt: string
  updatedAt: string
}

// Product Types
export interface Product {
  id: string
  internalCode: string
  barcode?: string
  name: string
  description?: string
  categoryId?: string
  categoryName?: string
  brandId?: string
  brandName?: string
  unitId?: string
  unitName?: string
  supplierId?: string
  supplierName?: string
  purchasePrice: number
  sellingPrice?: number
  minimumStock: number
  maximumStock?: number
  currentStock: number
  reservedStock: number
  availableStock: number
  imageUrl?: string
  status: "active" | "inactive" | "discontinued"
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  code: string
  description?: string
  parentId?: string
  parentName?: string
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: string
  name: string
  code: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Unit {
  id: string
  name: string
  code: string
  symbol: string
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: string
  code: string
  name: string
  contactPerson?: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

// Warehouse Types
export interface Warehouse {
  id: string
  name: string
  code: string
  location?: string
  capacity?: number
  totalCapacity?: number
  usedCapacity?: number
  managerId?: string
  managerName?: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Zone {
  id: string
  name: string
  code: string
  warehouseId: string
  warehouseName?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Row {
  id: string
  name: string
  code: string
  zoneId: string
  zoneName?: string
  warehouseId: string
  createdAt: string
  updatedAt: string
}

export interface Shelf {
  id: string
  name: string
  code: string
  rowId: string
  rowName?: string
  zoneId: string
  warehouseId: string
  capacity?: number
  createdAt: string
  updatedAt: string
}

export interface Bin {
  id: string
  name: string
  code: string
  shelfId: string
  shelfName?: string
  rowId: string
  zoneId: string
  warehouseId: string
  capacity?: number
  createdAt: string
  updatedAt: string
}

export interface Location {
  id: string
  productId?: string
  productName?: string
  warehouseId: string
  warehouseName?: string
  zoneId?: string
  zoneName?: string
  rowId?: string
  rowName?: string
  shelfId?: string
  shelfName?: string
  binId?: string
  binName?: string
  quantity: number
  createdAt: string
  updatedAt: string
}

// Stock Types
export type StockStatus = "normal" | "low" | "critical" | "overstock"

export interface Stock {
  id: string
  productId: string
  productName?: string
  warehouseId: string
  warehouseName?: string
  locationId?: string
  locationName?: string
  quantity: number
  reservedQuantity: number
  availableQuantity: number
  status: StockStatus
  lastUpdated: string
  createdAt: string
  updatedAt: string
}

export type MovementType = "ENTRY" | "EXIT" | "TRANSFER" | "ADJUSTMENT"
export type MovementStatus = "PENDING" | "APPROVED" | "VALIDATED" | "COMPLETED" | "CANCELLED"

export interface StockMovement {
  id: string
  productId: string
  productName?: string
  movementType: MovementType
  status: MovementStatus
  fromLocation?: string
  toLocation?: string
  quantity: number
  reason?: string
  reference?: string
  performedBy: string
  performedByName?: string
  performedAt: string
  createdAt: string
  updatedAt: string
}

export type RequestPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "VALIDATED" | "COMPLETED" | "CANCELLED"

export interface StockRequest {
  id: string
  productId: string
  productName?: string
  warehouseId: string
  warehouseName?: string
  quantity: number
  reason: string
  status: RequestStatus
  priority: RequestPriority
  requestedBy: string
  requestedByName?: string
  requestedAt: string
  approvedBy?: string
  approvedByName?: string
  approvedAt?: string
  validatedBy?: string
  validatedByName?: string
  validatedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

// Employee Types
export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  department?: string
  position?: string
  status: "active" | "inactive"
  employeeId: string
  hireDate?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Audit Types
export interface AuditLog {
  id: string
  userId: string
  userName?: string
  action: string
  entity: string
  entityId: string
  details?: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: string
}

// Notification Types
export type NotificationType = "INFO" | "WARNING" | "ERROR" | "SUCCESS"

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: string
}

// Dashboard Types
export interface DashboardStats {
  totalProducts: number
  totalWarehouses: number
  totalStockValue: number
  criticalStock: number
  pendingRequests: number
  recentMovements: number
  activeEmployees: number
  lowStockProducts: number
}

export interface StockDistribution {
  warehouseName: string
  quantity: number
  value: number
}

export interface MonthlyMovement {
  month: string
  entries: number
  exits: number
  transfers: number
}

export interface WarehouseUtilization {
  warehouseName: string
  utilization: number
  capacity: number
}

export interface TopConsumedProduct {
  productName: string
  quantity: number
  trend: number
}

export interface RecentActivity {
  id: string
  user: string
  action: string
  entity: string
  timestamp: string
}

export interface LowStockAlert {
  productId: string
  productName: string
  currentStock: number
  minimumStock: number
  warehouseName: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface ActivateAccountFormData {
  token: string
  password: string
  confirmPassword: string
  firstName?: string
  lastName?: string
  acceptTerms: boolean
}

export interface ProductFormData {
  internalCode: string
  barcode?: string
  name: string
  description?: string
  categoryId?: string
  brandId?: string
  unitId?: string
  supplierId?: string
  purchasePrice: number
  sellingPrice?: number
  minimumStock: number
  maximumStock?: number
}

export interface WarehouseFormData {
  name: string
  code: string
  location?: string
  capacity?: number
}

export interface StockRequestFormData {
  productId: string
  warehouseId: string
  quantity: number
  reason: string
  priority: RequestPriority
}

// Filter Types
export interface PaginationParams {
  page: number
  pageSize: number
}

export interface SortParams {
  field: string
  direction: "asc" | "desc"
}

export interface FilterParams {
  search?: string
  status?: string
  category?: string
  warehouse?: string
  dateFrom?: string
  dateTo?: string
}

export interface TableParams extends PaginationParams, SortParams, FilterParams {}
