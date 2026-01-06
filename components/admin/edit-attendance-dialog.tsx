"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

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

interface EditAttendanceDialogProps {
  record: AttendanceRecord
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditAttendanceDialog({ record, open, onOpenChange, onSuccess }: EditAttendanceDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    student_id: record.student_id,
    date: record.date,
    subject: record.subject,
    status: record.status,
    time_in: record.time_in || "",
    time_out: record.time_out || "",
    notes: record.notes || "",
  })

  useEffect(() => {
    setFormData({
      student_id: record.student_id,
      date: record.date,
      subject: record.subject,
      status: record.status,
      time_in: record.time_in || "",
      time_out: record.time_out || "",
      notes: record.notes || "",
    })
  }, [record])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add API call here to update attendance
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Updating attendance:", formData)
      onSuccess()
    } catch (error) {
      console.error("[v0] Error updating attendance:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogDescription>Update attendance record for {record.student_name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit_student_id">Student ID *</Label>
              <Input id="edit_student_id" value={formData.student_id} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_date">Date *</Label>
              <Input
                id="edit_date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_subject">Subject *</Label>
            <Input
              id="edit_subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_status">Status *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as any })}
            >
              <SelectTrigger id="edit_status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="excused">Excused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.status === "present" || formData.status === "late") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_time_in">Time In</Label>
                <Input
                  id="edit_time_in"
                  type="time"
                  value={formData.time_in}
                  onChange={(e) => setFormData({ ...formData, time_in: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_time_out">Time Out</Label>
                <Input
                  id="edit_time_out"
                  type="time"
                  value={formData.time_out}
                  onChange={(e) => setFormData({ ...formData, time_out: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit_notes">Notes</Label>
            <Textarea
              id="edit_notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
