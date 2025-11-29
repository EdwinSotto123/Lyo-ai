import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Users, Calendar, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Total Messages",
    value: "1,284",
    change: "+12%",
    changeType: "positive" as const,
    icon: MessageSquare,
  },
  {
    name: "Active Contacts",
    value: "342",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Meetings This Week",
    value: "18",
    change: "+3",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    name: "Response Rate",
    value: "94%",
    change: "+2%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-medium text-green-400">{stat.change}</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
