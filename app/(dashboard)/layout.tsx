"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app/sidebar"
import { CommandPalette } from "@/components/app/command-palette"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar onCommandOpen={() => setCommandOpen(true)} />
      <main className="flex-1 overflow-auto">{children}</main>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
