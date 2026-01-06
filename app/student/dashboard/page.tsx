import { redirect } from "next/navigation"
import { getStudentSession } from "@/lib/auth"
import { StudentHeader } from "@/components/student/student-header"
import { AttendanceOverview } from "@/components/student/attendance-overview"
import { AttendanceHistory } from "@/components/student/attendance-history"

export default async function StudentDashboardPage() {
  const session = await getStudentSession()

  if (!session) {
    redirect("/student/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Attendance</h1>
          <p className="text-muted-foreground">Track your attendance records and statistics</p>
        </div>
        <AttendanceOverview />
        <AttendanceHistory />
      </main>
    </div>
  )
}
