"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { Menu, X, ChevronRight, LayoutDashboard, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { KinsoLogo } from "@/components/kinso-logo"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitch } from "@/components/theme-switch"
import { useTranslations } from "next-intl"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations()
  const { user, isLoading, signOut } = useAuth()

  // Get user initials for fallback
  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <KinsoLogo className="h-8 w-8" />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Lyo</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('nav.features')}
              </Link>
              <Link href="#faqs" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('nav.faqs')}
              </Link>
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitch />
            <LanguageSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ""} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={async () => {
                      try {
                        await signOut()
                      } catch (error) {
                        console.error("Error signing out:", error)
                      }
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="text-sm" asChild>
                  <Link href="/login">{t('nav.login')}</Link>
                </Button>
                <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-5" asChild>
                  <Link href="/login">
                    {t('nav.getStarted')} <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="#about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.about')}
            </Link>
            <Link href="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.features')}
            </Link>
            <Link href="#faqs" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.faqs')}
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-center gap-2 mb-2">
                <ThemeSwitch />
                <LanguageSwitcher />
              </div>
              {
                user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar_url || ""} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-center" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-center" asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-destructive"
                      onClick={async () => {
                        try {
                          await signOut()
                        } catch (error) {
                          console.error("Error signing out:", error)
                        }
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-center" asChild>
                      <Link href="/login">{t('nav.login')}</Link>
                    </Button>
                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-full" asChild>
                      <Link href="/login">
                        {t('nav.getStarted')} <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )
              }
            </div >
          </nav >
        </div >
      )
      }
    </header >
  )
}
