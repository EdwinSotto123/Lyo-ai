import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Upload, FileText } from "lucide-react"
import Link from "next/link"

const actions = [
  { label: "New Message", icon: Plus, href: "/dashboard/inbox?compose=true" },
  { label: "Schedule Meeting", icon: Calendar, href: "/dashboard/calendar?new=true" },
  { label: "Import Contacts", icon: Upload, href: "/dashboard/contacts?import=true" },
  { label: "View Reports", icon: FileText, href: "/dashboard/reports" },
]

export function QuickActions() {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4 bg-transparent">
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
