import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Linkedin, Instagram } from "lucide-react"

const channelIcons = {
  whatsapp: { icon: MessageCircle, color: "text-green-400", bg: "bg-green-400/10" },
  gmail: { icon: Mail, color: "text-red-400", bg: "bg-red-400/10" },
  linkedin: { icon: Linkedin, color: "text-blue-400", bg: "bg-blue-400/10" },
  instagram: { icon: Instagram, color: "text-pink-400", bg: "bg-pink-400/10" },
}

const activities = [
  {
    id: 1,
    contact: "Sarah Chen",
    avatar: "/sarah-chen-professional.jpg",
    channel: "whatsapp" as const,
    action: "New message received",
    preview: "Hey! Just wanted to follow up on our conversation about the project...",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    contact: "Michael Roberts",
    avatar: "/michael-roberts-professional.jpg",
    channel: "gmail" as const,
    action: "AI responded",
    preview: "Thank you for your interest. I've scheduled a call for next Tuesday...",
    time: "15 min ago",
    unread: false,
  },
  {
    id: 3,
    contact: "Emma Wilson",
    avatar: "/emma-wilson-professional.jpg",
    channel: "linkedin" as const,
    action: "Connection request",
    preview: "Hi! I saw your work on the new product launch and would love to connect...",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    contact: "David Park",
    avatar: "/david-park-professional.jpg",
    channel: "instagram" as const,
    action: "New DM",
    preview: "Love the content! Quick question about your services...",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    contact: "Lisa Thompson",
    avatar: "/lisa-thompson-professional.jpg",
    channel: "gmail" as const,
    action: "Meeting confirmed",
    preview: "Great! The meeting is confirmed for Friday at 3 PM. Looking forward to it.",
    time: "3 hours ago",
    unread: false,
  },
]

export function RecentActivity() {
  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        <Badge variant="secondary" className="font-normal">
          {activities.filter((a) => a.unread).length} unread
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {activities.map((activity) => {
            const channel = channelIcons[activity.channel]
            const ChannelIcon = channel.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {activity.contact
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ${channel.bg}`}
                  >
                    <ChannelIcon className={`h-3 w-3 ${channel.color}`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{activity.contact}</span>
                    {activity.unread && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{activity.preview}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
