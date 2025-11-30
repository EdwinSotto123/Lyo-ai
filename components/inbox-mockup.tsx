"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare, Linkedin, Instagram } from "lucide-react"

const mockMessages = [
  {
    id: 1,
    sender: "Sarah Chen",
    platform: "gmail",
    subject: "Q4 Marketing Strategy Review",
    preview: "Hi team, I've compiled the results from our Q4 campaigns...",
    time: "2m ago",
    unread: true,
    avatar: "/sarah-chen-professional.jpg",
  },
  {
    id: 2,
    sender: "Alex Rodriguez",
    platform: "linkedin",
    subject: "Great connecting at the conference!",
    preview: "It was wonderful meeting you at TechCon. I'd love to discuss...",
    time: "1h ago",
    unread: true,
    avatar: "/alex-rodriguez-professional-headshot.jpg",
  },
  {
    id: 3,
    sender: "Emma Wilson",
    platform: "slack",
    subject: "Design System Updates",
    preview: "The new component library is ready for review...",
    time: "3h ago",
    unread: false,
    avatar: "/emma-wilson-professional.jpg",
  },
]

export function InboxMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Main inbox card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">Inbox</h3>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                3 unread
              </span>
            </div>
          </div>
        </div>

        {/* Messages list */}
        <div className="divide-y divide-gray-100">
          {mockMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                message.unread ? "bg-orange-50/30" : ""
              }`}
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-semibold">
                    {message.sender.charAt(0)}
                  </div>
                  {/* Platform badge */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <PlatformIcon platform={message.platform} />
                  </div>
                </div>

                {/* Message content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${message.unread ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                        {message.sender}
                      </p>
                      <p className={`text-sm truncate ${message.unread ? "font-medium text-gray-800" : "text-gray-600"}`}>
                        {message.subject}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{message.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">{message.preview}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating notification badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
      >
        <div className="text-center">
          <div className="text-xl font-bold">3</div>
          <div className="text-[10px]">new</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PlatformIcon({ platform }: { platform: string }) {
  const iconClass = "w-3 h-3"
  
  switch (platform) {
    case "gmail":
      return <Mail className={`${iconClass} text-red-500`} />
    case "slack":
      return <MessageSquare className={`${iconClass} text-purple-600`} />
    case "linkedin":
      return <Linkedin className={`${iconClass} text-blue-600`} />
    case "instagram":
      return <Instagram className={`${iconClass} text-pink-600`} />
    default:
      return <Mail className={`${iconClass} text-gray-500`} />
  }
}
