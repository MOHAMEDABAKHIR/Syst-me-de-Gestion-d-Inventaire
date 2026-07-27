import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/layouts/sidebar"
import { TopNavigation } from "@/components/layouts/top-navigation"
import { cn } from "@/lib/utils"

export function MainLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
