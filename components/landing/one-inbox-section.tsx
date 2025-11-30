"use client"

import { motion } from "framer-motion"
import type { JSX } from "react"
import { AnimatedGridPattern } from "@/components/animated/animated-grid-pattern"

const apps = [
  { name: "Gmail", color: "#EA4335", glow: "rgba(234, 67, 53, 0.5)" },
  { name: "WhatsApp", color: "#25D366", glow: "rgba(37, 211, 102, 0.5)" },
  { name: "Instagram", color: "#E1306C", glow: "rgba(225, 48, 108, 0.5)" },
  { name: "LinkedIn", color: "#0077B5", glow: "rgba(0, 119, 181, 0.5)" },
  { name: "Slack", color: "#4A154B", glow: "rgba(74, 21, 75, 0.5)" },
  { name: "Outlook", color: "#0078D4", glow: "rgba(0, 120, 212, 0.5)" },
]

export function OneInboxSection() {
  return (
    <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Animated Grid background */}
      <AnimatedGridPattern
        width={40}
        height={40}
        numSquares={50}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_90%)] opacity-60"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="text-white">All your emails and</span>
              <br />
              <span className="text-white">messages in </span>
              <span className="text-amber-500">one inbox.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              Lyo integrates with Gmail, LinkedIn, Slack, WhatsApp & Instagram. More integrations coming soon.
            </p>
          </div>

          {/* Right content - Floating icons */}
          <div className="relative h-[400px]">
            {apps.map((app, i) => {
              const positions = [
                { top: "0%", left: "30%" },
                { top: "5%", right: "10%" },
                { top: "35%", right: "20%" },
                { top: "55%", right: "5%" },
                { top: "50%", left: "25%" },
                { top: "75%", right: "25%" },
              ]
              return (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="absolute"
                  style={positions[i]}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center"
                    style={{ boxShadow: `0 0 40px ${app.glow}` }}
                  >
                    <AppIcon name={app.name} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function AppIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    Gmail: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#EA4335" />
        <path d="M2 6l10 7 10-7" stroke="#C5221F" strokeWidth="1.5" fill="none" />
        <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    WhatsApp: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    Instagram: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-glow)" />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
        <defs>
          <linearGradient id="ig-glow" x1="2" y1="22" x2="22" y2="2">
            <stop stopColor="#FFDC80" />
            <stop offset="0.5" stopColor="#F77737" />
            <stop offset="1" stopColor="#C13584" />
          </linearGradient>
        </defs>
      </svg>
    ),
    LinkedIn: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0077B5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    Slack: (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <path
          d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"
          fill="#36C5F0"
        />
        <path
          d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
          fill="#36C5F0"
        />
        <path
          d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z"
          fill="#2EB67D"
        />
        <path
          d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
          fill="#2EB67D"
        />
        <path
          d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z"
          fill="#ECB22E"
        />
        <path
          d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
          fill="#ECB22E"
        />
        <path
          d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z"
          fill="#E01E5A"
        />
        <path
          d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
          fill="#E01E5A"
        />
      </svg>
    ),
    Outlook: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0078D4">
        <path d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.354.234-.588.234h-8.702v-6.99l1.878 1.47c.09.066.197.1.322.1a.539.539 0 00.322-.1l6.768-5.124c.09-.067.158-.135.203-.203.045-.068.035-.148-.03-.24-.065-.09-.186-.135-.365-.135H24v-.066zm-.826-1.26H14.31l8.3 6.197a.256.256 0 00.156.047.258.258 0 00.188-.078.248.248 0 00.078-.188V6.61c0-.23-.08-.424-.24-.578a.773.773 0 00-.588-.234h-.03v.33zM13.2 6.127v12.15l-12.318-2.16a.77.77 0 01-.64-.78V4.66a.77.77 0 01.64-.78L13.2 1.72v4.407zm-5.4 3.557c-1.44 0-2.608 1.544-2.608 3.45 0 1.905 1.168 3.45 2.608 3.45 1.44 0 2.608-1.545 2.608-3.45 0-1.906-1.168-3.45-2.608-3.45zm0 5.73c-.93 0-1.686-1.023-1.686-2.28 0-1.257.756-2.28 1.686-2.28.93 0 1.686 1.023 1.686 2.28 0 1.257-.756 2.28-1.686 2.28z" />
      </svg>
    ),
  }
  return icons[name] || null
}
