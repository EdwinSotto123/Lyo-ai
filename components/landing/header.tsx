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

import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitch } from "@/components/theme-switch"
import { useTranslations } from "next-intl"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

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
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Siempre visible */}
          <Link href="/" className="flex items-center flex-shrink-0 z-10 transition-transform hover:scale-105 duration-300">
            <Image
              src="/logo-lyo.webp"
              alt="Lyo"
              width={40}
              height={20}
              className="object-contain w-[35px] h-[18px] sm:w-[45px] sm:h-[22px] md:w-[50px] md:h-[25px]"
            />
          </Link>

          {/* Desktop Navigation - Solo visible en pantallas grandes */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="#about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 whitespace-nowrap relative group">
              {t('nav.about')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 whitespace-nowrap relative group">
              {t('nav.features')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#faqs" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 whitespace-nowrap relative group">
              {t('nav.faqs')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Desktop CTA - Solo visible en pantallas grandes */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <div className="transition-transform hover:scale-110 duration-300">
              <ThemeSwitch />
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <LanguageSwitcher />
            </div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-orange-400 transition-all duration-300">
                      <AvatarImage src={user.avatar_url || ""} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
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
                <Button variant="ghost" className="text-sm hidden lg:inline-flex transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
                  <Link href="/login">{t('nav.login')}</Link>
                </Button>
                <Button className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-4 lg:px-5 text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95" asChild>
                  <Link href="/login">
                    {t('nav.getStarted')} <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button - Solo visible en móvil */}
          <button 
            className="md:hidden pr-2 text-gray-700 dark:text-gray-300 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <nav className="flex flex-col px-3 py-4 gap-1">
            <Link 
              href="#about" 
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="#features" 
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.features')}
            </Link>
            <Link 
              href="#faqs" 
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.faqs')}
            </Link>
            
            <div className="flex flex-col gap-3 pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-center gap-3 pb-2">
                <ThemeSwitch />
                <LanguageSwitcher />
              </div>
              {
                user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar_url || ""} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={async () => {
                        try {
                          await signOut()
                          setIsMenuOpen(false)
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
                    <Button variant="ghost" className="w-full justify-center text-sm" asChild>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.login')}
                      </Link>
                    </Button>
                    <Button className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full" asChild>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.getStarted')} <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )
              }
            </div>
          </nav>
        </div>
      )
      }
    </header >
  )
}
