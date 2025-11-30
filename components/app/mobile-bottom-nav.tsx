"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    LayoutDashboard,
    Inbox,
    User,
    Settings,
    Plug,
    Users,
    LogOut,
} from "lucide-react"
import { AIListeningModal } from "./ai-listening-modal"
import { useAuth } from "@/lib/auth-context"

export function MobileBottomNav() {
    const pathname = usePathname()
    const { signOut } = useAuth()
    const [aiModalOpen, setAIModalOpen] = useState(false)

    const handleLogout = async () => {
        await signOut()
    }

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            action: null,
        },
        {
            name: "Inbox",
            href: "/dashboard/inbox",
            icon: Inbox,
            action: null,
        },
        {
            name: "AI Agent",
            href: null,
            icon: null,
            action: () => setAIModalOpen(true),
            isCenter: true,
        },
        {
            name: "Profile",
            href: "/dashboard/settings",
            icon: User,
            action: null,
        },
        {
            name: "Settings",
            href: null,
            icon: Settings,
            action: null,
            isDropdown: true,
        },
    ]

    const isActive = (href: string | null) => {
        if (!href) return false
        return pathname === href || pathname.startsWith(href + "/")
    }

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
                <div className="flex h-16 items-center justify-around px-2">
                    {navItems.map((item) => {
                        // Center AI Agent button - special styling
                        if (item.isCenter) {
                            return (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    size="icon"
                                    onClick={item.action || undefined}
                                    className="relative -mt-6 h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-teal-400 hover:from-orange-500 hover:to-teal-500 shadow-lg"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-teal-400 animate-pulse" />
                                    </div>
                                    <span className="sr-only">{item.name}</span>
                                </Button>
                            )
                        }

                        // Settings dropdown
                        if (item.isDropdown && item.icon) {
                            return (
                                <DropdownMenu key={item.name}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="flex h-12 w-12 flex-col items-center justify-center gap-0.5"
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span className="text-[10px]">{item.name}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard/integrations"
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Plug className="h-4 w-4" />
                                                <span>Integrations</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard/contacts"
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Users className="h-4 w-4" />
                                                <span>Contacts</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }

                        // Regular navigation buttons
                        if (item.href && item.icon) {
                            const Icon = item.icon
                            return (
                                <Link key={item.name} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "flex h-12 w-12 flex-col items-center justify-center gap-0.5",
                                            isActive(item.href)
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="text-[10px]">{item.name}</span>
                                    </Button>
                                </Link>
                            )
                        }

                        return null
                    })}
                </div>
            </nav>

            <AIListeningModal open={aiModalOpen} onOpenChange={setAIModalOpen} />
        </>
    )
}
