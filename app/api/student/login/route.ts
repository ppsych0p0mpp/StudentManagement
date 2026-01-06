import { type NextRequest, NextResponse } from "next/server"
import { setStudentSession } from "@/lib/auth"

// Mock student data - replace with real database query
const MOCK_STUDENTS = [
  { id: "1", student_id: "2024001", password: "student123", full_name: "John Doe" },
  { id: "2", student_id: "2024002", password: "student123", full_name: "Jane Smith" },
  { id: "3", student_id: "2024003", password: "student123", full_name: "Mike Johnson" },
]

export async function POST(request: NextRequest) {
  try {
    const { studentId, password } = await request.json()

    // Mock validation - replace with database query and bcrypt comparison
    const student = MOCK_STUDENTS.find((s) => s.student_id === studentId && s.password === password)

    if (student) {
      await setStudentSession(student.id)
      return NextResponse.json({
        success: true,
        student: { id: student.id, student_id: student.student_id, full_name: student.full_name },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
