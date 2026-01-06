import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle2, XCircle, Clock } from "lucide-react"

export function StatsCards() {
  // Mock data - replace with real data from database
  const stats = [
    {
      title: "Total Students",
      value: "245",
      icon: Users,
      description: "Enrolled this semester",
      color: "text-primary",
    },
    {
      title: "Present Today",
      value: "198",
      icon: CheckCircle2,
      description: "80.8% attendance rate",
      color: "text-accent",
    },
    {
      title: "Absent Today",
      value: "32",
      icon: XCircle,
      description: "13.1% of students",
      color: "text-destructive",
    },
    {
      title: "Late Today",
      value: "15",
      icon: Clock,
      description: "6.1% of students",
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
              <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
