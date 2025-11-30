"use client"

import { motion } from "framer-motion"
import type { JSX } from "react" // Import JSX to fix the lint error

const integrations = [
  { name: "Gmail", icon: "gmail" },
  { name: "Slack", icon: "slack" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "WhatsApp", icon: "whatsapp" },
  { name: "Instagram", icon: "instagram" },
]

import { useTranslations } from "next-intl"

export function IntegrationsMarquee() {
  const t = useTranslations()

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
            {t('landing.integrations.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            {t('landing.integrations.description')}
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-16 items-center"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[...integrations, ...integrations, ...integrations].map((integration, i) => (
                <div key={i} className="flex items-center gap-2 flex-shrink-0">
                  <IntegrationLogo name={integration.name} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section >
  )
}

function IntegrationLogo({ name }: { name: string }) {
  const logos: Record<string, JSX.Element> = {
    Gmail: (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EA4335" />
          <path d="M20 4l-8 6-8-6" stroke="white" strokeWidth="1.5" />
        </svg>
        <span className="text-lg font-medium text-gray-700">Gmail</span>
      </div>
    ),
    Slack: (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 24 24">
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
        <span className="text-lg font-medium text-gray-700">slack</span>
      </div>
    ),
    LinkedIn: (
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#0077B5]">Linked</span>
        <span className="text-xl font-bold text-white bg-[#0077B5] px-1 rounded">in</span>
      </div>
    ),
    WhatsApp: (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="text-lg font-medium text-[#25D366]">WhatsApp</span>
      </div>
    ),
    Instagram: (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-gradient-marquee)" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
          <defs>
            <linearGradient id="ig-gradient-marquee" x1="2" y1="22" x2="22" y2="2">
              <stop stopColor="#FFDC80" />
              <stop offset="0.5" stopColor="#F77737" />
              <stop offset="1" stopColor="#C13584" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-lg font-medium bg-gradient-to-r from-[#F77737] to-[#C13584] bg-clip-text text-transparent">
          Instagram
        </span>
      </div>
    ),
  }
  return logos[name] || <span className="text-lg font-medium text-gray-700">{name}</span>
}
