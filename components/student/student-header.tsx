"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function StudentHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/student/logout", { method: "POST" })
    router.push("/student/login")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">AttendanceHub</span>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
