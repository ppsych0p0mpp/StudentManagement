import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Calendar } from "lucide-react"

export function ReportSummary() {
  // Mock data - replace with real data from database
  const summary = {
    totalStudents: 245,
    totalDays: 30,
    averageAttendance: 82.5,
    trend: 2.3, // positive means improvement
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          <Users className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{summary.totalStudents}</div>
          <p className="text-sm text-muted-foreground mt-1">In selected filters</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Days Tracked</CardTitle>
          <Calendar className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{summary.totalDays}</div>
          <p className="text-sm text-muted-foreground mt-1">In date range</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Avg Attendance</CardTitle>
          {summary.trend > 0 ? (
            <TrendingUp className="w-5 h-5 text-accent" />
          ) : (
            <TrendingDown className="w-5 h-5 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{summary.averageAttendance}%</div>
          <p className="text-sm text-muted-foreground mt-1">
            {summary.trend > 0 ? "+" : ""}
            {summary.trend}% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Present Rate</CardTitle>
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-background" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {Math.round((summary.totalStudents * summary.averageAttendance) / 100)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Students per day</p>
        </CardContent>
      </Card>
    </div>
  )
}
