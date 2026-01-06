"use server"

import { cookies } from "next/headers"

export async function setAdminSession(adminId: string) {
  const cookieStore = await cookies()
  cookieStore.set("admin_session", adminId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function setStudentSession(studentId: string) {
  const cookieStore = await cookies()
  cookieStore.set("student_session", studentId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_session")?.value
}

export async function getStudentSession() {
  const cookieStore = await cookies()
  return cookieStore.get("student_session")?.value
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}

export async function clearStudentSession() {
  const cookieStore = await cookies()
  cookieStore.delete("student_session")
}
