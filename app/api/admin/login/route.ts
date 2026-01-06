import { type NextRequest, NextResponse } from "next/server"
import { setAdminSession } from "@/lib/auth"

// Mock authentication - replace with real database query
const MOCK_ADMIN = {
  id: "1",
  email: "admin@school.edu",
  password: "admin123", // In production, this would be hashed
  full_name: "Admin User",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock validation - replace with database query and bcrypt comparison
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      await setAdminSession(MOCK_ADMIN.id)
      return NextResponse.json({
        success: true,
        admin: { id: MOCK_ADMIN.id, email: MOCK_ADMIN.email, full_name: MOCK_ADMIN.full_name },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
