import { Navigate } from "react-router-dom"
import { authService } from "@/services/api/auth.service"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
