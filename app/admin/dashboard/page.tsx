import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { StatsCards } from "@/components/admin/stats-cards"
import { RecentAttendance } from "@/components/admin/recent-attendance"

export default async function AdminDashboardPage() {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's today's attendance overview.</p>
        </div>
        <StatsCards />
        <RecentAttendance />
      </main>
    </div>
  )
}
