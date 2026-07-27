import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { MainLayout } from "@/components/layouts/main-layout"
import { AuthLayout } from "@/components/layouts/auth-layout"
import { ProtectedRoute } from "@/components/shared/protected-route"

// Pages
import { LoginPage } from "@/features/auth/pages/login-page"
import { ActivateAccountPage } from "@/features/auth/pages/activate-account-page"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"
import { ProductsPage } from "@/features/inventory/pages/products-page"
import { WarehousesPage } from "@/features/warehouses/pages/warehouses-page"
import { StockMovementsPage } from "@/features/stock/pages/movements-page"
import { EmployeesPage } from "@/features/employees/pages/employees-page"
import { ReportsPage } from "@/features/reports/pages/reports-page"
import { SettingsPage } from "@/features/settings/pages/settings-page"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/activate/:token" element={<AuthLayout><ActivateAccountPage /></AuthLayout>} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="inventory" element={<ProductsPage />} />
            <Route path="warehouses" element={<WarehousesPage />} />
            <Route path="movements" element={<StockMovementsPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
