"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Trash2, Mail, Phone } from "lucide-react"
import { EditStudentDialog } from "./edit-student-dialog"
import { DeleteStudentDialog } from "./delete-student-dialog"

interface Student {
  id: string
  student_id: string
  full_name: string
  email: string
  phone: string
  program: string
  year: number
  section: string
}

export function StudentsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Mock data - replace with real data from database
  const students: Student[] = [
    {
      id: "1",
      student_id: "2024001",
      full_name: "John Doe",
      email: "john.doe@school.edu",
      phone: "555-0101",
      program: "Computer Science",
      year: 1,
      section: "A",
    },
    {
      id: "2",
      student_id: "2024002",
      full_name: "Jane Smith",
      email: "jane.smith@school.edu",
      phone: "555-0102",
      program: "Computer Science",
      year: 1,
      section: "A",
    },
    {
      id: "3",
      student_id: "2024003",
      full_name: "Mike Johnson",
      email: "mike.johnson@school.edu",
      phone: "555-0103",
      program: "Information Technology",
      year: 2,
      section: "B",
    },
    {
      id: "4",
      student_id: "2024004",
      full_name: "Sarah Williams",
      email: "sarah.williams@school.edu",
      phone: "555-0104",
      program: "Computer Science",
      year: 1,
      section: "A",
    },
    {
      id: "5",
      student_id: "2024005",
      full_name: "David Brown",
      email: "david.brown@school.edu",
      phone: "555-0105",
      program: "Information Technology",
      year: 2,
      section: "B",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setIsEditOpen(true)
  }

  const handleDelete = (student: Student) => {
    setSelectedStudent(student)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <CardTitle className="flex-1">All Students</CardTitle>
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
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{student.full_name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {student.student_id}</p>
                    </div>
                    <Badge variant="outline">
                      Year {student.year} - {student.section}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{student.phone}</span>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-primary">{student.program}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(student)} className="gap-2">
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(student)} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No students found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <>
          <EditStudentDialog
            student={selectedStudent}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onSuccess={() => {
              setIsEditOpen(false)
              setSelectedStudent(null)
            }}
          />
          <DeleteStudentDialog
            student={selectedStudent}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onSuccess={() => {
              setIsDeleteOpen(false)
              setSelectedStudent(null)
            }}
          />
        </>
      )}
    </>
  )
}
