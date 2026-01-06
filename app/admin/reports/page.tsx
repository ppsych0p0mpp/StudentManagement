import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { ReportFilters } from "@/components/admin/report-filters"
import { AttendanceChart } from "@/components/admin/attendance-chart"
import { StudentReportTable } from "@/components/admin/student-report-table"
import { ReportSummary } from "@/components/admin/report-summary"

export default async function ReportsPage() {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Reports</h1>
          <p className="text-muted-foreground">View analytics and generate attendance reports</p>
        </div>
        <ReportFilters />
        <ReportSummary />
        <AttendanceChart />
        <StudentReportTable />
      </main>
    </div>
  )
}
