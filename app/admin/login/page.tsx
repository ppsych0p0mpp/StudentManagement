import { LoginForm } from "@/components/admin/login-form"
import { GraduationCap } from "lucide-react"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage attendance</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
