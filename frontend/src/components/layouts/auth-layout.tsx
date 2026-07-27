import { Outlet } from "react-router-dom"

interface AuthLayoutProps {
  children?: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        {children || <Outlet />}
      </div>
    </div>
  )
}
