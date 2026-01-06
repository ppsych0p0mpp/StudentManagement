import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AttendanceHistory() {
  // Mock data - replace with real data from database
  const records = [
    {
      id: "1",
      date: "Jan 5, 2026",
      subject: "Mathematics",
      status: "present",
      timeIn: "08:15 AM",
      timeOut: "10:00 AM",
    },
    { id: "2", date: "Jan 5, 2026", subject: "Physics", status: "present", timeIn: "10:15 AM", timeOut: "12:00 PM" },
    { id: "3", date: "Jan 4, 2026", subject: "Chemistry", status: "late", timeIn: "08:30 AM", timeOut: "10:15 AM" },
    { id: "4", date: "Jan 4, 2026", subject: "Biology", status: "present", timeIn: "10:30 AM", timeOut: "12:15 PM" },
    { id: "5", date: "Jan 3, 2026", subject: "English", status: "absent", timeIn: "-", timeOut: "-" },
    { id: "6", date: "Jan 3, 2026", subject: "History", status: "present", timeIn: "01:00 PM", timeOut: "02:45 PM" },
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
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>Your recent attendance records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border last:border-0 gap-3"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{record.subject}</p>
                <p className="text-sm text-muted-foreground mt-1">{record.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  <span className="hidden sm:inline">
                    {record.timeIn} - {record.timeOut}
                  </span>
                  <span className="sm:hidden">{record.timeIn}</span>
                </div>
                <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
