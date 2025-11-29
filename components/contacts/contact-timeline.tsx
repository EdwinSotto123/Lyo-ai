import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Linkedin, Calendar, Phone, FileText, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactTimelineProps {
  contactId: string
}

const timelineEvents = [
  {
    id: 1,
    type: "message" as const,
    channel: "whatsapp",
    title: "WhatsApp conversation",
    description: "Discussed project timeline and deliverables",
    time: "Today, 10:45 AM",
    aiInvolved: true,
  },
  {
    id: 2,
    type: "meeting" as const,
    channel: "calendar",
    title: "Meeting scheduled",
    description: "Product demo call - Thursday 3 PM",
    time: "Today, 10:42 AM",
    aiInvolved: true,
  },
  {
    id: 3,
    type: "email" as const,
    channel: "gmail",
    title: "Email sent",
    description: "Follow-up with proposal document attached",
    time: "Yesterday, 2:30 PM",
    aiInvolved: false,
  },
  {
    id: 4,
    type: "call" as const,
    channel: "phone",
    title: "Phone call",
    description: "30 min discovery call - discussed requirements",
    time: "March 20, 11:00 AM",
    aiInvolved: false,
  },
  {
    id: 5,
    type: "message" as const,
    channel: "linkedin",
    title: "LinkedIn connection",
    description: "Accepted connection request",
    time: "March 18, 9:15 AM",
    aiInvolved: false,
  },
  {
    id: 6,
    type: "note" as const,
    channel: "note",
    title: "Note added",
    description: "Key decision maker for tech purchases",
    time: "March 15, 4:00 PM",
    aiInvolved: false,
  },
]

const channelConfig = {
  whatsapp: { icon: MessageCircle, color: "text-green-400", bg: "bg-green-400/10" },
  gmail: { icon: Mail, color: "text-red-400", bg: "bg-red-400/10" },
  linkedin: { icon: Linkedin, color: "text-blue-400", bg: "bg-blue-400/10" },
  calendar: { icon: Calendar, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  phone: { icon: Phone, color: "text-purple-400", bg: "bg-purple-400/10" },
  note: { icon: FileText, color: "text-muted-foreground", bg: "bg-muted" },
}

export function ContactTimeline({ contactId }: ContactTimelineProps) {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base font-medium">Interaction Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {timelineEvents.map((event) => {
              const config = channelConfig[event.channel as keyof typeof channelConfig]
              const Icon = config.icon
              return (
                <div key={event.id} className="relative flex gap-4">
                  <div
                    className={cn(
                      "relative z-10 flex h-10 w-10 items-center justify-center rounded-full shrink-0",
                      config.bg,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      {event.aiInvolved && (
                        <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent">
                          <Bot className="h-3 w-3" />
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
