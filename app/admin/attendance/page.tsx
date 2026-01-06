import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { AttendanceFilters } from "@/components/admin/attendance-filters"
import { AttendanceList } from "@/components/admin/attendance-list"
import { MarkAttendanceDialog } from "@/components/admin/mark-attendance-dialog"

export default async function AttendancePage() {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Management</h1>
            <p className="text-muted-foreground">Record and manage student attendance</p>
          </div>
          <MarkAttendanceDialog />
        </div>
        <AttendanceFilters />
        <AttendanceList />
      </main>
    </div>
  )
}
