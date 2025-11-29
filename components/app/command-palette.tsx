"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { LayoutDashboard, Inbox, Users, Bot, Calendar, Plug, Settings, Plus, Mail, MessageCircle } from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    },
    [open, onOpenChange],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const runCommand = (command: () => void) => {
    onOpenChange(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/inbox?compose=true"))}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/contacts?new=true"))}>
            <Users className="mr-2 h-4 w-4" />
            Add Contact
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/calendar?new=true"))}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/inbox"))}>
            <Inbox className="mr-2 h-4 w-4" />
            Inbox
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/contacts"))}>
            <Users className="mr-2 h-4 w-4" />
            Contacts
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/agent"))}>
            <Bot className="mr-2 h-4 w-4" />
            AI Agent
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/calendar"))}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/integrations"))}>
            <Plug className="mr-2 h-4 w-4" />
            Integrations
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Channels">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/inbox?channel=whatsapp"))}>
            <MessageCircle className="mr-2 h-4 w-4 text-green-400" />
            WhatsApp Messages
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/inbox?channel=gmail"))}>
            <Mail className="mr-2 h-4 w-4 text-red-400" />
            Gmail Messages
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
