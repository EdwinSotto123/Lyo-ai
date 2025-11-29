"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KinsoLogo } from "@/components/kinso-logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <KinsoLogo className="h-8 w-8" />
              <span className="font-semibold text-lg tracking-wide">Lyo</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#faqs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                FAQs
              </Link>
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-5" asChild>
              <Link href="/login">
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="#about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#faqs" className="text-sm text-gray-600 hover:text-gray-900">
              FAQs
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Button variant="ghost" className="w-full justify-center" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-full" asChild>
                <Link href="/login">
                  Get Started <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
