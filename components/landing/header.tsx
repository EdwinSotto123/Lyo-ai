"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KinsoLogo } from "@/components/kinso-logo"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitch } from "@/components/theme-switch"
import { useTranslations } from "next-intl"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations()

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
            <Button variant="ghost" className="text-sm text-gray-700 dark:text-gray-300" asChild>
              <Link href="/login">{t('nav.login')}</Link>
            </Button>
            <Button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full px-5" asChild>
              <Link href="/login">
                {t('nav.getStarted')} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
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
              <Button variant="ghost" className="w-full justify-center text-gray-700 dark:text-gray-300" asChild>
                <Link href="/login">{t('nav.login')}</Link>
              </Button>
              <Button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full" asChild>
                <Link href="/login">
                  {t('nav.getStarted')} <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
