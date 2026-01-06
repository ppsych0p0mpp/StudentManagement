"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle } from "lucide-react"

interface AttendanceRecord {
  id: string
  student_id: string
  student_name: string
  date: string
  subject: string
}

interface DeleteAttendanceDialogProps {
  record: AttendanceRecord
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteAttendanceDialog({ record, open, onOpenChange, onSuccess }: DeleteAttendanceDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    try {
      // Add API call here to delete attendance record
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Deleting attendance record:", record.id)
      onSuccess()
    } catch (error) {
      console.error("[v0] Error deleting attendance record:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Delete Attendance Record
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete the attendance record for{" "}
            <span className="font-semibold">{record.student_name}</span> on{" "}
            <span className="font-semibold">{new Date(record.date).toLocaleDateString()}</span> for{" "}
            <span className="font-semibold">{record.subject}</span>?
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Record"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
