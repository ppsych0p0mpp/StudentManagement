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

interface Student {
  id: string
  student_id: string
  full_name: string
}

interface DeleteStudentDialogProps {
  student: Student
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteStudentDialog({ student, open, onOpenChange, onSuccess }: DeleteStudentDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    try {
      // Add API call here to delete student
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Deleting student:", student.id)
      onSuccess()
    } catch (error) {
      console.error("[v0] Error deleting student:", error)
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
            Delete Student
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete <span className="font-semibold">{student.full_name}</span> (
            {student.student_id})? All their attendance records will also be permanently deleted.
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
              "Delete Student"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
