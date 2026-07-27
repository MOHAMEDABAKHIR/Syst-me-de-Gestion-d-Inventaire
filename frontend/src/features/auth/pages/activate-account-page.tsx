import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { authService } from "@/services/api/auth.service"
import type { ActivateAccountFormData } from "@/types"

const activateAccountSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export function ActivateAccountPage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivateAccountFormData>({
    resolver: zodResolver(activateAccountSchema),
  })

  const onSubmit = async (data: ActivateAccountFormData) => {
    if (!token) {
      toast.error("Missing or invalid activation link")
      return
    }
    setIsLoading(true)
    try {
      await authService.activateAccount({ ...data, token })
      toast.success("Account activated successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Failed to activate account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-white">OCP</span>
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Activate your account</CardTitle>
        <CardDescription className="text-center">
          Set your password and complete your profile
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-danger">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-danger">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-danger">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="acceptTerms" {...register("acceptTerms")} />
            <label
              htmlFor="acceptTerms"
              className="text-sm text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-danger">{errors.acceptTerms.message}</p>
          )}
        </CardContent>
        <div className="p-6 pt-0">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Activating..." : "Activate Account"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
