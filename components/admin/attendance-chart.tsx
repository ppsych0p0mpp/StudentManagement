"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function AttendanceChart() {
  // Mock data - replace with real data from database
  const data = [
    { date: "Jan 1", present: 198, absent: 32, late: 15 },
    { date: "Jan 2", present: 205, absent: 28, late: 12 },
    { date: "Jan 3", present: 192, absent: 38, late: 15 },
    { date: "Jan 4", present: 210, absent: 25, late: 10 },
    { date: "Jan 5", present: 202, absent: 30, late: 13 },
    { date: "Jan 6", present: 198, absent: 32, late: 15 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trends</CardTitle>
        <CardDescription>Daily attendance breakdown over the selected period</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="present" fill="hsl(var(--accent))" name="Present" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" fill="hsl(45 93% 47%)" name="Late" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
