"use client"

import { motion } from "framer-motion"
import type React from "react"

const platformIcons = [
  { name: "Gmail", color: "#EA4335", icon: "M" },
  { name: "Slack", color: "#4A154B", icon: "#" },
  { name: "Instagram", color: "#E1306C", icon: "📷" },
  { name: "WhatsApp", color: "#25D366", icon: "📱" },
  { name: "LinkedIn", color: "#0077B5", icon: "in" },
  { name: "Outlook", color: "#0078D4", icon: "📧" },
]

const messages = [
  {
    name: "Natasha Corwin",
    platform: "gmail",
    preview: "Wants you to share a sales contract from Brightstone Realty with all key details included",
    time: "3m",
  },
  {
    name: "Luke Rankin",
    platform: "slack",
    preview: "Shares a project update for ITWA, including the latest progress and key milestones",
    time: "5m",
  },
  {
    name: "Jack Callaghan",
    platform: "whatsapp",
    preview: "Shares the next month's team meet plan, including dates and agenda highlights",
    time: "10m",
  },
]

const notifications = [
  {
    name: "Natasha Corwin",
    message: "Email has requested a sales contract. I have found a related email where you have sent the contract.",
    time: "24m",
    platform: "gmail",
  },
  {
    name: "Luke Rankin",
    message: "Review project update for ITWA",
    platform: "slack",
  },
  {
    name: "Ben Monroe",
    message: "Provide spending for quarter 3",
    platform: "whatsapp",
  },
]

export function InboxMockup() {
  return (
    <div className="relative">
      {/* Main inbox window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Window controls */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-100">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        {/* Search bar */}
        <div className="p-4 border-b border-gray-50">
          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-teal-400" />
            <span className="text-sm text-gray-500">Start typing to ask or search Kinso</span>
          </div>
        </div>

        {/* Platform icons sidebar */}
        <div className="flex">
          <div className="flex flex-col gap-2 p-3 border-r border-gray-50">
            {platformIcons.map((platform, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
              >
                {platform.icon === "M" ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                ) : platform.icon === "#" ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-14 1h2v2H8v-2zm0-4h2v2H8V9zm4 4h2v2h-2v-2zm0-4h2v2h-2V9zm4 4h2v2h-2v-2zm0-4h2v2h-2V9z" />
                  </svg>
                ) : platform.name === "LinkedIn" ? (
                  <span className="font-bold text-xs">in</span>
                ) : (
                  <span className="text-xs">{platform.icon}</span>
                )}
              </div>
            ))}
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-sm mb-3">Inbox</h3>
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{msg.name}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{msg.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Good morning message */}
        <div className="absolute bottom-20 left-4 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
          <p className="text-sm">
            <span className="text-gray-900">Good morning, Sarah.</span>
            <br />
            <span className="text-gray-500 text-xs">You've got 4 new and 9 active conversations</span>
          </p>
          <div className="flex items-center gap-2 mt-3 bg-gray-100 rounded-full px-3 py-1.5 text-xs text-gray-500">
            Ask Kinso
          </div>
        </div>

        {/* Platform icons at bottom */}
        <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-50">
          {["gmail", "slack", "instagram", "whatsapp", "linkedin", "outlook"].map((platform, i) => (
            <div key={i} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <PlatformIcon platform={platform} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating notifications */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -right-4 top-8 space-y-3 w-64"
      >
        {notifications.map((notif, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
            <div className="flex items-start gap-2">
              <PlatformIcon platform={notif.platform} className="w-4 h-4 mt-1" />
              <div>
                <span className="font-medium text-sm">{notif.name}</span>
                <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                {notif.time && <span className="text-xs text-gray-400">{notif.time}</span>}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function PlatformIcon({ platform, className = "w-5 h-5" }: { platform: string; className?: string }) {
  const icons: Record<string, React.JSX.Element> = {
    gmail: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EA4335" />
        <path d="M20 4l-8 6-8-6" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    slack: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
          fill="#E01E5A"
        />
      </svg>
    ),
    instagram: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-gradient)" />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
        <defs>
          <linearGradient id="ig-gradient" x1="2" y1="22" x2="22" y2="2">
            <stop stopColor="#FFDC80" />
            <stop offset="0.5" stopColor="#F77737" />
            <stop offset="1" stopColor="#C13584" />
          </linearGradient>
        </defs>
      </svg>
    ),
    whatsapp: (
      <svg className={className} viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    linkedin: (
      <svg className={className} viewBox="0 0 24 24" fill="#0077B5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    outlook: (
      <svg className={className} viewBox="0 0 24 24" fill="#0078D4">
        <path d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.354.234-.588.234h-8.702v-6.99l1.878 1.47c.09.066.197.1.322.1a.539.539 0 00.322-.1l6.768-5.124c.09-.067.158-.135.203-.203.045-.068.035-.148-.03-.24-.065-.09-.186-.135-.365-.135H24v-.066zm-.826-1.26H14.31l8.3 6.197a.256.256 0 00.156.047.258.258 0 00.188-.078.248.248 0 00.078-.188V6.61c0-.23-.08-.424-.24-.578a.773.773 0 00-.588-.234h-.03v.33zM13.2 6.127v12.15l-12.318-2.16a.77.77 0 01-.64-.78V4.66a.77.77 0 01.64-.78L13.2 1.72v4.407zm-5.4 3.557c-1.44 0-2.608 1.544-2.608 3.45 0 1.905 1.168 3.45 2.608 3.45 1.44 0 2.608-1.545 2.608-3.45 0-1.906-1.168-3.45-2.608-3.45zm0 5.73c-.93 0-1.686-1.023-1.686-2.28 0-1.257.756-2.28 1.686-2.28.93 0 1.686 1.023 1.686 2.28 0 1.257-.756 2.28-1.686 2.28z" />
      </svg>
    ),
  }
  return icons[platform] || <div className={className} />
}
