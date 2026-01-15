"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, CheckCircle2, XCircle, Clock, FileText, LogOut } from "lucide-react"

interface Student {
  id: number
  studentId: string
  name: string
  email: string
  program: string
  yearLevel: string
}

interface AttendanceRecord {
  id: number
  date: string
  subject: string
  status: "present" | "absent" | "late" | "excused"
  timeIn?: string
  notes?: string
}

interface AttendanceSummary {
  present: number
  absent: number
  late: number
  excused: number
  total: number
  rate: number
}

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<Student | null>(null)
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [summary, setSummary] = useState<AttendanceSummary>({
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
    total: 0,
    rate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch student profile
      const profileRes = await fetch("/api/mobile/student/profile")
      const profileData = await profileRes.json()
      setStudent(profileData.student)

      // Fetch attendance records
      const recordsRes = await fetch("/api/mobile/student/attendance")
      const recordsData = await recordsRes.json()
      setRecords(recordsData.records)

      // Calculate summary
      const present = recordsData.records.filter((r: AttendanceRecord) => r.status === "present").length
      const absent = recordsData.records.filter((r: AttendanceRecord) => r.status === "absent").length
      const late = recordsData.records.filter((r: AttendanceRecord) => r.status === "late").length
      const excused = recordsData.records.filter((r: AttendanceRecord) => r.status === "excused").length
      const total = recordsData.records.length
      const rate = total > 0 ? ((present + late) / total) * 100 : 0

      setSummary({ present, absent, late, excused, total, rate })
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/mobile/student/logout", { method: "POST" })
    window.location.href = "/mobile/student/login"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="w-5 h-5 text-accent" />
      case "absent":
        return <XCircle className="w-5 h-5 text-destructive" />
      case "late":
        return <Clock className="w-5 h-5 text-orange-500" />
      case "excused":
        return <FileText className="w-5 h-5 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-accent"
      case "absent":
        return "text-destructive"
      case "late":
        return "text-orange-500"
      case "excused":
        return "text-blue-500"
      default:
        return "text-muted-foreground"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">{student?.name}</h1>
                <p className="text-xs text-muted-foreground">{student?.studentId}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-foreground">{student?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Program</span>
              <span className="text-sm font-medium text-foreground">{student?.program}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Year Level</span>
              <span className="text-sm font-medium text-foreground">{student?.yearLevel}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>Your overall attendance performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-foreground">{summary.rate.toFixed(1)}%</span>
                <span className="text-sm text-muted-foreground">{summary.total} total records</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div className="bg-accent h-full rounded-full transition-all" style={{ width: `${summary.rate}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Present</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{summary.present}</p>
              </div>

              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">Absent</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{summary.absent}</p>
              </div>

              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Late</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{summary.late}</p>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-muted-foreground">Excused</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{summary.excused}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Your latest attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No attendance records yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {records.slice(0, 10).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="font-medium text-sm text-foreground">{record.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          {record.timeIn && ` • ${record.timeIn}`}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
