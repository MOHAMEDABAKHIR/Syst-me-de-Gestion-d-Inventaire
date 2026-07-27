import type { User, LoginFormData, ActivateAccountFormData } from "@/types"
import { apiClient, tokenStorage } from "./client"

interface LoginResponse {
  access: string
  refresh: string
  user: User
}

interface RefreshResponse {
  access: string
  refresh?: string
}

export const authService = {
  /** POST /api/auth/login/ */
  async login(data: LoginFormData): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const response = await apiClient.post<LoginResponse>("/auth/login/", data)
    const { access, refresh, user } = response.data

    tokenStorage.setTokens(access, refresh)

    return { user, accessToken: access, refreshToken: refresh }
  },

  /** POST /api/auth/logout/ */
  async logout(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken()
    try {
      if (refreshToken) {
        await apiClient.post("/auth/logout/", { refresh: refreshToken })
      }
    } finally {
      tokenStorage.clear()
    }
  },

  /** POST /api/auth/activate/ */
  async activateAccount(data: ActivateAccountFormData): Promise<User> {
    const formData = new FormData()
    formData.append("token", data.token)
    formData.append("password", data.password)
    formData.append("confirm_password", data.confirmPassword)
    formData.append("terms_accepted", String(data.acceptTerms))

    const response = await apiClient.post<User>("/auth/activate/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  /** POST /api/auth/token/refresh/ */
  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = tokenStorage.getRefreshToken()
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await apiClient.post<RefreshResponse>("/auth/token/refresh/", {
      refresh: refreshToken,
    })

    const newRefreshToken = response.data.refresh ?? refreshToken
    tokenStorage.setTokens(response.data.access, newRefreshToken)

    return { accessToken: response.data.access, refreshToken: newRefreshToken }
  },

  /** GET /api/auth/me/ */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me/")
    return response.data
  },

  isAuthenticated(): boolean {
    return Boolean(tokenStorage.getAccessToken())
  },
}
