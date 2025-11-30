"use client"

import { Link } from "@/i18n/routing"
import { KinsoLogo } from "@/components/kinso-logo"
import { Instagram, Youtube } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <KinsoLogo className="h-10 w-10" />
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo-lyo.webp"   // 👉 ruta de tu imagen
                  alt="Lyo"
                  width={50}             // 👉 ajusta tamaño
                  height={25}
                  className="object-contain"
                />
              </Link>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              {t('landing.footer.description')}
            </p>
            <p className="text-gray-500 text-sm">{t('common.copyright')}</p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block" />

          {/* Product links */}
          <div>
            <h4 className="text-white font-medium mb-4">{t('landing.footer.product')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('nav.features')}
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('nav.faqs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and About */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">{t('landing.footer.legal')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('landing.footer.termsOfUse')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('landing.footer.privacyPolicy')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">{t('landing.footer.about')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/team" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('landing.footer.meetTheTeam')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
