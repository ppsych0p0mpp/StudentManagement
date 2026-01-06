import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, Percent } from "lucide-react"

export function AttendanceOverview() {
  // Mock data - replace with real data from database
  const stats = [
    {
      title: "Attendance Rate",
      value: "85%",
      icon: Percent,
      color: "text-primary",
    },
    {
      title: "Present",
      value: "34",
      icon: CheckCircle2,
      color: "text-accent",
    },
    {
      title: "Absent",
      value: "5",
      icon: XCircle,
      color: "text-destructive",
    },
    {
      title: "Late",
      value: "1",
      icon: Clock,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
