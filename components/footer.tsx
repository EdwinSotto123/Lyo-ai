import Link from "next/link"
import { KinsoLogo } from "@/components/kinso-logo"
import { Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <KinsoLogo className="h-10 w-10" />
              <span className="font-semibold text-xl text-white tracking-wide">KINSO</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              One intelligent inbox for all your messages, emails and contacts.
            </p>
            <p className="text-gray-500 text-sm">© 2025 Kinso. All rights reserved.</p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block" />

          {/* Product links */}
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="text-gray-400 hover:text-white text-sm transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and About */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">About</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/team" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Meet the Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-800">
          <Link
            href="https://instagram.com"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Instagram</span>
          </Link>
          <Link
            href="https://tiktok.com"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <span className="text-white text-sm">TikTok</span>
          </Link>
          <Link
            href="https://youtube.com"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <Youtube className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Youtube</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
