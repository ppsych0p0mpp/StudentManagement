export interface Student {
  id: string
  student_id: string
  full_name: string
  email: string
  phone?: string
  program: string
  year: number
  section: string
  created_at: string
}

export interface AttendanceRecord {
  id: string
  student_id: string
  date: string
  status: "present" | "absent" | "late" | "excused"
  subject: string
  time_in?: string
  time_out?: string
  notes?: string
  created_at: string
}

export interface AttendanceWithStudent extends AttendanceRecord {
  student: Student
}

export interface Admin {
  id: string
  email: string
  full_name: string
}
