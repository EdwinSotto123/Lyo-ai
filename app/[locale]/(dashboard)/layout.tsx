"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "@/i18n/routing"
import { AppSidebar } from "@/components/app/sidebar"
import { MobileBottomNav } from "@/components/app/mobile-bottom-nav"
import { CommandPalette } from "@/components/app/command-palette"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [commandOpen, setCommandOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Intercept back button to redirect to landing if coming from OAuth flow
    const handlePopState = (event: PopStateEvent) => {
      // Check if we're navigating back to a Google OAuth or callback page
      const currentPath = window.location.pathname
      const referrer = document.referrer

      // If navigating to callback or coming from Google OAuth, redirect to landing
      if (
        currentPath === "/callback" ||
        referrer.includes("accounts.google.com") ||
        referrer.includes("supabase.co/auth")
      ) {
        // Prevent default navigation and redirect to landing
        window.history.pushState(null, "", "/dashboard")
        router.replace("/")
      }
    }

    // Also check on mount if we came from OAuth
    const referrer = document.referrer
    if (referrer.includes("accounts.google.com") || referrer.includes("/callback")) {
      // Replace the previous entry in history with landing page
      window.history.replaceState(null, "", "/")
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [router])

  return (
    <div className="flex h-screen flex-col bg-background md:flex-row">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <AppSidebar onCommandOpen={() => setCommandOpen(true)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">{children}</main>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <MobileBottomNav />

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
