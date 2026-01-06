"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface StudentReport {
  student_id: string
  name: string
  program: string
  year: number
  total_days: number
  present: number
  absent: number
  late: number
  excused: number
  attendance_rate: number
}

export function StudentReportTable() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - replace with real data from database
  const reports: StudentReport[] = [
    {
      student_id: "2024001",
      name: "John Doe",
      program: "Computer Science",
      year: 1,
      total_days: 30,
      present: 26,
      absent: 2,
      late: 2,
      excused: 0,
      attendance_rate: 86.7,
    },
    {
      student_id: "2024002",
      name: "Jane Smith",
      program: "Computer Science",
      year: 1,
      total_days: 30,
      present: 28,
      absent: 1,
      late: 1,
      excused: 0,
      attendance_rate: 93.3,
    },
    {
      student_id: "2024003",
      name: "Mike Johnson",
      program: "Information Technology",
      year: 2,
      total_days: 30,
      present: 24,
      absent: 4,
      late: 2,
      excused: 0,
      attendance_rate: 80.0,
    },
    {
      student_id: "2024004",
      name: "Sarah Williams",
      program: "Computer Science",
      year: 1,
      total_days: 30,
      present: 27,
      absent: 2,
      late: 1,
      excused: 0,
      attendance_rate: 90.0,
    },
    {
      student_id: "2024005",
      name: "David Brown",
      program: "Information Technology",
      year: 2,
      total_days: 30,
      present: 22,
      absent: 5,
      late: 2,
      excused: 1,
      attendance_rate: 73.3,
    },
  ]

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.program.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "bg-accent/10 text-accent hover:bg-accent/20"
    if (rate >= 75) return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
    return "bg-destructive/10 text-destructive hover:bg-destructive/20"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <CardTitle>Individual Student Reports</CardTitle>
            <CardDescription>Detailed attendance breakdown for each student</CardDescription>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Student</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Program
                </th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Present</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Absent</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Late
                </th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.student_id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="py-4 px-2">
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.student_id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-2 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">{report.program}</p>
                    <p className="text-sm text-muted-foreground">Year {report.year}</p>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="text-sm font-medium text-foreground">{report.present}</span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="text-sm font-medium text-foreground">{report.absent}</span>
                  </td>
                  <td className="py-4 px-2 text-center hidden sm:table-cell">
                    <span className="text-sm font-medium text-foreground">{report.late}</span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <Badge className={getAttendanceColor(report.attendance_rate)}>
                      {report.attendance_rate.toFixed(1)}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No students found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
