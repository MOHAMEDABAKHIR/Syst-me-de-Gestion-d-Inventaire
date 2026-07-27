import type { User, LoginFormData, ActivateAccountFormData } from "@/types"

// Mock authentication service
// This will be replaced with actual API calls to Django backend

export const authService = {
  async login(data: LoginFormData): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock response
    return {
      user: {
        id: "1",
        email: data.email,
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        role: "WAREHOUSE_MANAGER",
        department: "Warehouse Operations",
        position: "Warehouse Manager",
        employeeId: "EMP-001",
        phone: "+212 600 123 456",
        status: "ACTIVE",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-07-20T10:00:00Z",
      },
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    }
  },

  async logout(): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    // Clear tokens from storage
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  },

  async activateAccount(data: ActivateAccountFormData): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock response
    return {
      id: "1",
      email: "new.user@ocp.com",
      firstName: data.firstName || "New",
      lastName: data.lastName || "User",
      fullName: `${data.firstName} ${data.lastName}`,
      role: "VIEWER",
      department: "Operations",
      position: "Operator",
      employeeId: "EMP-NEW",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      accessToken: "new-mock-access-token",
      refreshToken: "new-mock-refresh-token",
    }
  },

  async getCurrentUser(): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock response
    return {
      id: "1",
      email: "john.doe@ocp.com",
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      role: "WAREHOUSE_MANAGER",
      department: "Warehouse Operations",
      position: "Warehouse Manager",
      employeeId: "EMP-001",
      phone: "+212 600 123 456",
      status: "ACTIVE",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-07-20T10:00:00Z",
    }
  },
}
