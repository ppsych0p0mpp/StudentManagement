import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">AttendanceHub</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Modern Attendance Management System
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Streamline attendance tracking for educational institutions with our easy-to-use platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>Manage students, record attendance, and generate reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/login">
                <Button className="w-full" size="lg">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Student Portal</CardTitle>
              <CardDescription>View your attendance records and track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/student/login">
                <Button className="w-full bg-transparent" size="lg" variant="outline">
                  Student Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Demo Credentials</CardTitle>
              <CardDescription>Use these credentials to test the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Admin Account</h3>
                  <p className="text-sm text-muted-foreground">Email: admin@school.edu</p>
                  <p className="text-sm text-muted-foreground">Password: admin123</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Student Account</h3>
                  <p className="text-sm text-muted-foreground">Student ID: 2024001</p>
                  <p className="text-sm text-muted-foreground">Password: student123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
