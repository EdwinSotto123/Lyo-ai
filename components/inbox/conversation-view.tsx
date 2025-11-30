"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Video, MoreHorizontal, User, Bot, Sparkles, ArrowLeft } from "lucide-react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import { MessageResponse } from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input"
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion"
import { toast } from "sonner"

interface ConversationViewProps {
  conversationId: string | null
  onToggleContactPanel: () => void
  showContactPanel: boolean
  onBack?: () => void
  className?: string
}

type MessageType = {
  key: string
  from: "user" | "assistant"
  content: string
  time: string
  aiGenerated?: boolean
}

const initialMessages: MessageType[] = [
  {
    key: "1",
    from: "assistant",
    content: "Hey! Just wanted to follow up on our conversation about the project timeline. Do you have any updates?",
    time: "10:30 AM",
  },
  {
    key: "2",
    from: "user",
    content: "Hi Sarah! Yes, I've been working on the deliverables. We should be ready to present by end of this week.",
    time: "10:35 AM",
  },
  {
    key: "3",
    from: "assistant",
    content: "That sounds great! Can we schedule a call to go over the details? Maybe Thursday afternoon?",
    time: "10:38 AM",
  },
  {
    key: "4",
    from: "user",
    content: "Thursday works perfectly for me. How about 3 PM? I'll send you a calendar invite with a Zoom link.",
    time: "10:42 AM",
    aiGenerated: true,
  },
  {
    key: "5",
    from: "assistant",
    content: "Perfect! Looking forward to it. See you then!",
    time: "10:45 AM",
  },
]

const suggestions = [
  "Sure, I can help with that",
  "Let me check and get back to you",
  "That sounds great!",
  "Can we schedule a call?",
]

export function ConversationView({ conversationId, onToggleContactPanel, showContactPanel, onBack, className }: ConversationViewProps) {
  const [isAiMode, setIsAiMode] = useState(false)
  const [text, setText] = useState<string>("")
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready")
  const [messages, setMessages] = useState<MessageType[]>(initialMessages)

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text)
    const hasAttachments = Boolean(message.files?.length)

    if (!(hasText || hasAttachments)) {
      return
    }

    setStatus("submitted")

    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`,
      })
    }

    // Add user message
    const userMessage: MessageType = {
      key: `user-${Date.now()}`,
      from: "user",
      content: message.text || "Sent with attachments",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      aiGenerated: isAiMode,
    }

    setMessages((prev) => [...prev, userMessage])
    setText("")
    setStatus("ready")
  }

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: MessageType = {
      key: `user-${Date.now()}`,
      from: "user",
      content: suggestion,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      aiGenerated: isAiMode,
    }

    setMessages((prev) => [...prev, userMessage])
  }

  if (!conversationId) {
    return (
      <div className={cn("flex-1 flex items-center justify-center bg-background", className)}>
        <div className="text-center p-4">
          <MessageCircle className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">Select a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex-1 flex-col bg-background w-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden flex-shrink-0" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
            <AvatarImage src="/sarah-chen-professional.jpg" />
            <AvatarFallback className="text-xs">SC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm sm:text-base truncate">Sarah Chen</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400 flex-shrink-0" />
              <span className="truncate">Online • WhatsApp</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
            <Video className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", showContactPanel && "bg-accent/10 text-accent")}
            onClick={onToggleContactPanel}
          >
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.from} key={message.key}>
                <MessageContent>
                  <MessageResponse>{message.content}</MessageResponse>
                </MessageContent>
                <div className={cn("flex items-center gap-2 mt-1", message.from === "user" && "justify-end")}>
                  {message.aiGenerated && (
                    <span className="flex items-center gap-1 text-[10px] text-accent">
                      <Bot className="h-3 w-3" />
                      AI Generated
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Suggestions and Input */}
        <div className="grid shrink-0 gap-2 sm:gap-4 pt-2 sm:pt-4">
          {isAiMode && (
            <Suggestions className="px-3 sm:px-4">
              {suggestions.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  suggestion={suggestion}
                />
              ))}
            </Suggestions>
          )}

          <div className="w-full px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-3">
              <Button
                variant={isAiMode ? "default" : "outline"}
                size="sm"
                className="gap-2 text-xs sm:text-sm w-full sm:w-auto"
                onClick={() => setIsAiMode(!isAiMode)}
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                {isAiMode ? "AI Mode Active" : "Enable AI"}
              </Button>
              {isAiMode && (
                <span className="text-[10px] sm:text-xs text-muted-foreground text-center sm:text-left">
                  LYO will suggest responses based on context
                </span>
              )}
            </div>

            <PromptInput globalDrop multiple onSubmit={handleSubmit}>
              <PromptInputHeader>
                <PromptInputAttachments>
                  {(attachment) => <PromptInputAttachment data={attachment} />}
                </PromptInputAttachments>
              </PromptInputHeader>

              <PromptInputBody>
                <PromptInputTextarea
                  onChange={(event) => setText(event.target.value)}
                  value={text}
                  placeholder={isAiMode ? "Type or let AI suggest..." : "Type a message..."}
                  className="text-sm min-h-[80px] sm:min-h-[100px]"
                />
              </PromptInputBody>

              <PromptInputFooter>
                <PromptInputTools>
                  <PromptInputActionMenu>
                    <PromptInputActionMenuTrigger />
                    <PromptInputActionMenuContent>
                      <PromptInputActionAddAttachments />
                    </PromptInputActionMenuContent>
                  </PromptInputActionMenu>
                </PromptInputTools>

                <PromptInputSubmit disabled={!(text.trim() || status) || status === "streaming"} status={status} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  )
}
