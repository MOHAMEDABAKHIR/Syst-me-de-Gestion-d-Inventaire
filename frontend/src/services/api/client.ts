import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { toCamelCase, toSnakeCase } from "./case-mapper"

// En dev, Vite proxy /api vers VITE_API_URL (voir vite.config.ts).
// En prod, VITE_API_URL doit pointer vers le domaine réel du backend.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? ""

export const ACCESS_TOKEN_KEY = "accessToken"
export const REFRESH_TOKEN_KEY = "refreshToken"

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})

// --- Requête sortante : camelCase -> snake_case + injection du token ---
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // On ne touche pas à FormData (upload de fichiers)
  if (config.data && !(config.data instanceof FormData)) {
    config.data = toSnakeCase(config.data)
  }
  if (config.params) {
    config.params = toSnakeCase(config.params)
  }

  return config
})

// --- Réponse entrante : snake_case -> camelCase ---
apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = toCamelCase(response.data)
  }
  return response
})

// --- Rafraîchissement automatique du token sur 401 ---
let isRefreshing = false
let pendingQueue: Array<(token: string | null) => void> = []

function resolvePendingQueue(token: string | null) {
  pendingQueue.forEach((callback) => callback(token))
  pendingQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Évite une boucle infinie sur l'endpoint de login/refresh lui-même
    if (
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/token/refresh/")
    ) {
      tokenStorage.clear()
      return Promise.reject(error)
    }

    const refreshToken = tokenStorage.getRefreshToken()
    if (!refreshToken) {
      tokenStorage.clear()
      window.location.href = "/login"
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((newToken) => {
          if (!newToken) {
            reject(error)
            return
          }
          originalRequest._retry = true
          originalRequest.headers = originalRequest.headers ?? {}
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
        refresh: refreshToken,
      })
      const newAccessToken: string = data.access
      const newRefreshToken: string = data.refresh ?? refreshToken

      tokenStorage.setTokens(newAccessToken, newRefreshToken)
      resolvePendingQueue(newAccessToken)

      originalRequest._retry = true
      originalRequest.headers = originalRequest.headers ?? {}
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      resolvePendingQueue(null)
      tokenStorage.clear()
      window.location.href = "/login"
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)
