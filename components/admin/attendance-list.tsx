"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { EditAttendanceDialog } from "./edit-attendance-dialog"
import { DeleteAttendanceDialog } from "./delete-attendance-dialog"

interface AttendanceRecord {
  id: string
  student_id: string
  student_name: string
  date: string
  subject: string
  status: "present" | "absent" | "late" | "excused"
  time_in?: string
  time_out?: string
  notes?: string
}

export function AttendanceList() {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Mock data - replace with real data from database
  const records: AttendanceRecord[] = [
    {
      id: "1",
      student_id: "2024001",
      student_name: "John Doe",
      date: "2026-01-06",
      subject: "Mathematics",
      status: "present",
      time_in: "08:15",
      time_out: "10:00",
    },
    {
      id: "2",
      student_id: "2024002",
      student_name: "Jane Smith",
      date: "2026-01-06",
      subject: "Mathematics",
      status: "present",
      time_in: "08:10",
      time_out: "10:00",
    },
    {
      id: "3",
      student_id: "2024003",
      student_name: "Mike Johnson",
      date: "2026-01-06",
      subject: "Mathematics",
      status: "late",
      time_in: "08:35",
      time_out: "10:00",
      notes: "Traffic delay",
    },
    {
      id: "4",
      student_id: "2024004",
      student_name: "Sarah Williams",
      date: "2026-01-06",
      subject: "Mathematics",
      status: "absent",
    },
    {
      id: "5",
      student_id: "2024005",
      student_name: "David Brown",
      date: "2026-01-06",
      subject: "Mathematics",
      status: "excused",
      notes: "Medical appointment",
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

  const handleEdit = (record: AttendanceRecord) => {
    setSelectedRecord(record)
    setIsEditOpen(true)
  }

  const handleDelete = (record: AttendanceRecord) => {
    setSelectedRecord(record)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{record.student_name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {record.student_id}</p>
                    </div>
                    <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-primary">{record.subject}</span>
                    <span>•</span>
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                    {record.time_in && (
                      <>
                        <span>•</span>
                        <span>
                          {record.time_in} - {record.time_out}
                        </span>
                      </>
                    )}
                  </div>

                  {record.notes && <p className="text-sm text-muted-foreground italic">Note: {record.notes}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(record)} className="gap-2">
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(record)} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            ))}

            {records.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No attendance records found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedRecord && (
        <>
          <EditAttendanceDialog
            record={selectedRecord}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onSuccess={() => {
              setIsEditOpen(false)
              setSelectedRecord(null)
            }}
          />
          <DeleteAttendanceDialog
            record={selectedRecord}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onSuccess={() => {
              setIsDeleteOpen(false)
              setSelectedRecord(null)
            }}
          />
        </>
      )}
    </>
  )
}
