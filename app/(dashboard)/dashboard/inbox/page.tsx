"use client"

import { useState } from "react"
import { InboxSidebar } from "@/components/inbox/inbox-sidebar"
import { ConversationList } from "@/components/inbox/conversation-list"
import { ConversationView } from "@/components/inbox/conversation-view"
import { ContactPanel } from "@/components/inbox/contact-panel"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [activeChannel, setActiveChannel] = useState<string>("all")

  return (
    <div className="flex h-full">
      <InboxSidebar activeChannel={activeChannel} onChannelChange={setActiveChannel} />
      <ConversationList
        activeChannel={activeChannel}
        selectedId={selectedConversation}
        onSelect={setSelectedConversation}
      />
      <ConversationView
        conversationId={selectedConversation}
        onToggleContactPanel={() => setShowContactPanel(!showContactPanel)}
        showContactPanel={showContactPanel}
      />
      {showContactPanel && <ContactPanel conversationId={selectedConversation} />}
    </div>
  )
}
