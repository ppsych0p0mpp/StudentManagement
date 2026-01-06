import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function RecentAttendance() {
  // Mock data - replace with real data from database
  const recentRecords = [
    {
      id: "1",
      studentName: "John Doe",
      studentId: "2024001",
      subject: "Mathematics",
      status: "present",
      time: "08:15 AM",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      studentId: "2024002",
      subject: "Physics",
      status: "present",
      time: "09:30 AM",
    },
    {
      id: "3",
      studentName: "Mike Johnson",
      studentId: "2024003",
      subject: "Chemistry",
      status: "late",
      time: "10:45 AM",
    },
    { id: "4", studentName: "Sarah Williams", studentId: "2024004", subject: "Biology", status: "absent", time: "-" },
    {
      id: "5",
      studentName: "David Brown",
      studentId: "2024005",
      subject: "English",
      status: "present",
      time: "11:00 AM",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-accent/10 text-accent hover:bg-accent/20"
      case "absent":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20"
      case "late":
        return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
      case "excused":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Latest attendance records from today</CardDescription>
          </div>
          <Link href="/admin/attendance">
            <Button variant="ghost" size="sm" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRecords.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{record.studentName}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-muted-foreground">{record.studentId}</p>
                  <span className="text-muted-foreground">•</span>
                  <p className="text-sm text-muted-foreground">{record.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">{record.time}</span>
                <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
