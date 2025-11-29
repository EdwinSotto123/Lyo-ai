import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Linkedin, Instagram, CalendarDays, Check, AlertCircle } from "lucide-react"

const integrations = [
  { name: "WhatsApp", icon: MessageCircle, color: "text-green-400", connected: true },
  { name: "Gmail", icon: Mail, color: "text-red-400", connected: true },
  { name: "LinkedIn", icon: Linkedin, color: "text-blue-400", connected: true },
  { name: "Instagram", icon: Instagram, color: "text-pink-400", connected: false },
  { name: "Calendar", icon: CalendarDays, color: "text-yellow-400", connected: true },
]

export function IntegrationStatus() {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base font-medium">Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-3">
              <integration.icon className={`h-5 w-5 ${integration.color}`} />
              <span className="text-sm">{integration.name}</span>
            </div>
            {integration.connected ? (
              <div className="flex items-center gap-1.5 text-green-400">
                <Check className="h-4 w-4" />
                <span className="text-xs">Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-yellow-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs">Setup</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
