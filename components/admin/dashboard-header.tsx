"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut, Users, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const isActive = (path: string) => pathname === path

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

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/admin/dashboard">
              <Button variant={isActive("/admin/dashboard") ? "secondary" : "ghost"} size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/students">
              <Button variant={isActive("/admin/students") ? "secondary" : "ghost"} size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                Students
              </Button>
            </Link>
            <Link href="/admin/attendance">
              <Button variant={isActive("/admin/attendance") ? "secondary" : "ghost"} size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Attendance
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant={isActive("/admin/reports") ? "secondary" : "ghost"} size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Reports
              </Button>
            </Link>
          </nav>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
