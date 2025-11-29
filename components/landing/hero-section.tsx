"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InboxMockup } from "@/components/inbox-mockup"

export function HeroSection() {
  const [waitlistCount, setWaitlistCount] = useState(12773)

  useEffect(() => {
    // Animate count on load
    const interval = setInterval(() => {
      setWaitlistCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              <span className="text-gray-900">One inbox,</span>
              <br />
              <span className="text-gray-900">every conversation.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Kinso brings together all your messages, emails, and contacts. It intelligently learns your goals,
              understands what matters most, and drafts replies that sound like you.
            </p>
          </div>

          {/* Right content - Inbox Mockup */}
          <div className="relative">
            <InboxMockup />
          </div>
        </div>

        {/* Waitlist CTA */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-lg text-gray-600">
            Join <span className="text-orange-500 font-semibold">{waitlistCount.toLocaleString()}</span> others on the
            waitlist.
          </p>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base">
            Join now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
