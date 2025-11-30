"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, MessageCircle, Mail, Linkedin, Instagram, Menu } from "lucide-react"

interface ConversationListProps {
  activeChannel: string
  selectedId: string | null
  onSelect: (id: string) => void
  onOpenChannels?: () => void
  className?: string
}

const channelIcons = {
  whatsapp: { icon: MessageCircle, color: "text-green-400", bg: "bg-green-400/10" },
  gmail: { icon: Mail, color: "text-red-400", bg: "bg-red-400/10" },
  linkedin: { icon: Linkedin, color: "text-blue-400", bg: "bg-blue-400/10" },
  instagram: { icon: Instagram, color: "text-pink-400", bg: "bg-pink-400/10" },
}

const conversations = [
  {
    id: "1",
    contact: "Sarah Chen",
    avatar: "/sarah-chen-professional.jpg",
    channel: "whatsapp" as const,
    lastMessage: "Hey! Just wanted to follow up on our conversation about the project timeline.",
    time: "2 min",
    unread: true,
    aiReplied: false,
  },
  {
    id: "2",
    contact: "Michael Roberts",
    avatar: "/michael-roberts-professional.jpg",
    channel: "gmail" as const,
    lastMessage: "Thank you for your interest. I've scheduled a call for next Tuesday at 3 PM.",
    time: "15 min",
    unread: false,
    aiReplied: true,
  },
  {
    id: "3",
    contact: "Emma Wilson",
    avatar: "/emma-wilson-professional.jpg",
    channel: "linkedin" as const,
    lastMessage: "Hi! I saw your work on the new product launch and would love to connect.",
    time: "1 hr",
    unread: true,
    aiReplied: false,
  },
  {
    id: "4",
    contact: "David Park",
    avatar: "/david-park-professional.jpg",
    channel: "instagram" as const,
    lastMessage: "Love the content! Quick question about your services...",
    time: "2 hr",
    unread: false,
    aiReplied: false,
  },
  {
    id: "5",
    contact: "Lisa Thompson",
    avatar: "/lisa-thompson-professional.jpg",
    channel: "gmail" as const,
    lastMessage: "Great! The meeting is confirmed for Friday at 3 PM. Looking forward to it.",
    time: "3 hr",
    unread: false,
    aiReplied: true,
  },
  {
    id: "6",
    contact: "Alex Rodriguez",
    avatar: "/alex-rodriguez-professional-headshot.jpg",
    channel: "whatsapp" as const,
    lastMessage: "Can we reschedule our call to tomorrow morning?",
    time: "5 hr",
    unread: false,
    aiReplied: false,
  },
]

export function ConversationList({ activeChannel, selectedId, onSelect, onOpenChannels, className }: ConversationListProps) {
  const filteredConversations =
    activeChannel === "all" ? conversations : conversations.filter((c) => c.channel === activeChannel)

  return (
    <div className={cn("w-full md:w-80 border-r border-border bg-card/20 flex-col", className)}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            {onOpenChannels && (
              <Button size="icon" variant="ghost" className="h-8 w-8 md:hidden" onClick={onOpenChannels}>
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <h2 className="font-semibold text-sm sm:text-base">Conversations</h2>
          </div>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-9 bg-secondary/50 text-sm" />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const channel = channelIcons[conversation.channel]
          const ChannelIcon = channel.icon
          return (
            <div
              key={conversation.id}
              className={cn(
                "flex items-start gap-2 sm:gap-3 p-3 sm:p-4 cursor-pointer transition-colors border-b border-border/50",
                selectedId === conversation.id ? "bg-accent/10" : "hover:bg-muted/50 active:bg-muted/70",
              )}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {conversation.contact
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full",
                    channel.bg,
                  )}
                >
                  <ChannelIcon className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3", channel.color)} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("font-medium text-xs sm:text-sm truncate", conversation.unread && "text-foreground")}>
                    {conversation.contact}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{conversation.time}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                  {conversation.aiReplied && (
                    <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-accent/20 text-accent font-medium flex-shrink-0">AI</span>
                  )}
                  <p
                    className={cn(
                      "text-xs sm:text-sm line-clamp-1",
                      conversation.unread ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
              {conversation.unread && <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent shrink-0 mt-2" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
