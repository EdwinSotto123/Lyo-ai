"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone, Video, MoreHorizontal, User, Send, Bot, Sparkles, Paperclip, Smile } from "lucide-react"

interface ConversationViewProps {
  conversationId: string | null
  onToggleContactPanel: () => void
  showContactPanel: boolean
}

const messages = [
  {
    id: 1,
    sender: "contact",
    content: "Hey! Just wanted to follow up on our conversation about the project timeline. Do you have any updates?",
    time: "10:30 AM",
    aiGenerated: false,
  },
  {
    id: 2,
    sender: "user",
    content: "Hi Sarah! Yes, I've been working on the deliverables. We should be ready to present by end of this week.",
    time: "10:35 AM",
    aiGenerated: false,
  },
  {
    id: 3,
    sender: "contact",
    content: "That sounds great! Can we schedule a call to go over the details? Maybe Thursday afternoon?",
    time: "10:38 AM",
    aiGenerated: false,
  },
  {
    id: 4,
    sender: "user",
    content: "Thursday works perfectly for me. How about 3 PM? I'll send you a calendar invite with a Zoom link.",
    time: "10:42 AM",
    aiGenerated: true,
  },
  {
    id: 5,
    sender: "contact",
    content: "Perfect! Looking forward to it. See you then!",
    time: "10:45 AM",
    aiGenerated: false,
  },
]

export function ConversationView({ conversationId, onToggleContactPanel, showContactPanel }: ConversationViewProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isAiMode, setIsAiMode] = useState(false)

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">Select a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/sarah-chen-professional.jpg" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Sarah Chen</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Online • WhatsApp
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(showContactPanel && "bg-accent/10 text-accent")}
            onClick={onToggleContactPanel}
          >
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex gap-3", message.sender === "user" && "flex-row-reverse")}>
            {message.sender === "contact" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/sarah-chen-professional.jpg" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            )}
            <div className={cn("max-w-[70%]", message.sender === "user" && "text-right")}>
              <div
                className={cn(
                  "inline-block rounded-2xl px-4 py-2.5",
                  message.sender === "user"
                    ? "bg-accent text-accent-foreground rounded-tr-md"
                    : "bg-secondary rounded-tl-md",
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <div className={cn("flex items-center gap-2 mt-1", message.sender === "user" && "justify-end")}>
                {message.aiGenerated && (
                  <span className="flex items-center gap-1 text-[10px] text-accent">
                    <Bot className="h-3 w-3" />
                    AI Generated
                  </span>
                )}
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant={isAiMode ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setIsAiMode(!isAiMode)}
          >
            <Sparkles className="h-4 w-4" />
            {isAiMode ? "AI Mode Active" : "Enable AI"}
          </Button>
          {isAiMode && (
            <span className="text-xs text-muted-foreground">LYO will suggest responses based on context</span>
          )}
        </div>
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            placeholder={isAiMode ? "Type or let AI suggest a response..." : "Type a message..."}
            className="min-h-[44px] max-h-32 resize-none bg-secondary/50"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={1}
          />
          <Button variant="ghost" size="icon" className="shrink-0">
            <Smile className="h-4 w-4" />
          </Button>
          <Button size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
