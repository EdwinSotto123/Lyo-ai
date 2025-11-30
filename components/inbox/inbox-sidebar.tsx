"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Inbox, MessageCircle, Mail, Linkedin, Instagram, CalendarDays, Archive, Star } from "lucide-react"

interface InboxSidebarProps {
  activeChannel: string
  onChannelChange: (channel: string) => void
  className?: string
}

const channels = [
  { id: "all", name: "All Messages", icon: Inbox, count: 24 },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, count: 8, color: "text-green-400" },
  { id: "gmail", name: "Gmail", icon: Mail, count: 12, color: "text-red-400" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, count: 3, color: "text-blue-400" },
  { id: "instagram", name: "Instagram", icon: Instagram, count: 1, color: "text-pink-400" },
  { id: "calendar", name: "Calendar", icon: CalendarDays, count: 5, color: "text-yellow-400" },
]

const filters = [
  { id: "starred", name: "Starred", icon: Star, count: 7 },
  { id: "archived", name: "Archived", icon: Archive, count: 45 },
]

export function InboxSidebar({ activeChannel, onChannelChange, className }: InboxSidebarProps) {
  return (
    <div className={cn("w-full lg:w-56 border-r border-border bg-card/30 p-3 flex-col overflow-y-auto", className)}>
      <div className="mb-4">
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Channels</h2>
        <div className="mt-2 space-y-1">
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 sm:gap-3 px-2 sm:px-3 text-sm",
                activeChannel === channel.id && "bg-accent/10 text-accent",
              )}
              onClick={() => onChannelChange(channel.id)}
            >
              <channel.icon className={cn("h-4 w-4 flex-shrink-0", channel.color)} />
              <span className="flex-1 text-left truncate">{channel.name}</span>
              {channel.count > 0 && <span className="text-xs text-muted-foreground flex-shrink-0">{channel.count}</span>}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filters</h2>
        <div className="mt-2 space-y-1">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 sm:gap-3 px-2 sm:px-3 text-sm",
                activeChannel === filter.id && "bg-accent/10 text-accent",
              )}
              onClick={() => onChannelChange(filter.id)}
            >
              <filter.icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 text-left truncate">{filter.name}</span>
              <span className="text-xs text-muted-foreground flex-shrink-0">{filter.count}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
