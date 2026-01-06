import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { StudentsTable } from "@/components/admin/students-table"
import { AddStudentDialog } from "@/components/admin/add-student-dialog"

export default async function StudentsPage() {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Students</h1>
            <p className="text-muted-foreground">Manage student records and information</p>
          </div>
          <AddStudentDialog />
        </div>
        <StudentsTable />
      </main>
    </div>
  )
}
