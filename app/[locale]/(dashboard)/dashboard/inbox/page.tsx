"use client"

import { useState } from "react"
import { InboxSidebar } from "@/components/inbox/inbox-sidebar"
import { ConversationList } from "@/components/inbox/conversation-list"
import { ConversationView } from "@/components/inbox/conversation-view"
import { ContactPanel } from "@/components/inbox/contact-panel"

type MobileView = "channels" | "conversations" | "chat" | "contact"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [activeChannel, setActiveChannel] = useState<string>("all")
  const [mobileView, setMobileView] = useState<MobileView>("conversations")

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id)
    setMobileView("chat") // En móvil, cambiar a la vista de chat
  }

  const handleToggleContactPanel = () => {
    setShowContactPanel(!showContactPanel)
    if (!showContactPanel) {
      setMobileView("contact") // En móvil, cambiar a la vista de contacto
    }
  }

  const handleBackToConversations = () => {
    setMobileView("conversations")
  }

  const handleBackToChat = () => {
    setMobileView("chat")
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Desktop: Todos los paneles visibles */}
      {/* Mobile: Solo el panel activo visible */}
      
      <InboxSidebar 
        activeChannel={activeChannel} 
        onChannelChange={setActiveChannel}
        className={mobileView !== "channels" ? "hidden lg:flex" : "flex"}
      />
      
      <ConversationList
        activeChannel={activeChannel}
        selectedId={selectedConversation}
        onSelect={handleSelectConversation}
        onOpenChannels={() => setMobileView("channels")}
        className={mobileView !== "conversations" ? "hidden md:flex" : "flex"}
      />
      
      <ConversationView
        conversationId={selectedConversation}
        onToggleContactPanel={handleToggleContactPanel}
        showContactPanel={showContactPanel}
        onBack={handleBackToConversations}
        className={mobileView !== "chat" ? "hidden md:flex" : "flex"}
      />
      
      {showContactPanel && (
        <ContactPanel 
          conversationId={selectedConversation}
          onClose={() => {
            setShowContactPanel(false)
            setMobileView("chat")
          }}
          onBack={handleBackToChat}
          className={mobileView !== "contact" ? "hidden lg:flex" : "flex"}
        />
      )}
    </div>
  )
}
