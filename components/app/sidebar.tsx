"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  LayoutDashboard,
  Inbox,
  Users,
  Bot,
  Calendar,
  Plug,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface AppSidebarProps {
  onCommandOpen: () => void
  onNavigate?: () => void
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inbox", href: "/dashboard/inbox", icon: Inbox },
  { name: "Contacts", href: "/dashboard/contacts", icon: Users },
  { name: "AI Agent", href: "/dashboard/agent", icon: Bot },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function AppSidebar({ onCommandOpen, onNavigate }: AppSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <Link href="/" className="flex items-center flex-shrink-0 z-10">
              <Image
                src="/logo-lyo.webp"
                alt="Lyo"
                width={70}
                height={50}
                className="object-contain w-[35px] h-[18px] sm:w-[45px] sm:h-[22px] md:w-[50px] md:h-[25px]"
              />
            </Link>
            <span className="text-lg font-semibold">LYO</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">L</span>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="p-3">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start gap-2 bg-sidebar-accent/50 text-muted-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center px-2",
          )}
          onClick={onCommandOpen}
        >
          <Search className="h-4 w-4" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </>
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-center", !collapsed && "justify-start")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
