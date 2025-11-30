"use client"

import { Button } from "@/components/ui/button"
import { Bell, Plus, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "../theme-toggle"

export function DashboardHeader() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  // Get first name from full name
  const firstName = user?.name?.split(" ")[0] || "User"

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      <div>
        <h1 className="text-lg font-semibold">{greeting}, {firstName}</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening today</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>
    </header>
  )
}
