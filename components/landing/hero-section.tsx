"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  const t = useTranslations()
  const [waitlistCount, setWaitlistCount] = useState(12773)

  useEffect(() => {
    // Animate count on load
    const interval = setInterval(() => {
      setWaitlistCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-white dark:bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              <span className="text-gray-900 dark:text-white">{t('landing.hero.title')}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>
          </div>

          {/* Right content - Image Composition */}
          <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-[1000px]">
            {/* Main Dashboard Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 5 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-[90%] max-w-2xl shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <Image
                src="/intg1.webp"
                alt="Dashboard Interface"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </motion.div>

            {/* Phone Mockup - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute bottom-0 left-0 lg:-left-4 z-20 w-[30%] max-w-[180px] shadow-2xl rounded-[2rem] overflow-hidden border-[6px] border-gray-900 bg-gray-900"
            >
              <Image
                src="/cel1.png"
                alt="Mobile Interface"
                width={400}
                height={800}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Floating Message 1 - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-12 right-0 lg:-right-8 z-30 w-[45%] max-w-[280px] drop-shadow-xl"
            >
              <Image
                src="/msj1.webp"
                alt="Notification"
                width={400}
                height={150}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>

            {/* Floating Message 2 - Right Center */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-1/2 right-4 lg:-right-12 z-30 w-[50%] max-w-[300px] drop-shadow-xl"
            >
              <Image
                src="/msj2.webp"
                alt="Message"
                width={400}
                height={150}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Waitlist CTA */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('landing.hero.waitlist')} <span className="text-orange-500 dark:text-orange-400 font-semibold">{waitlistCount.toLocaleString()}</span> {t('landing.hero.waitlistOthers')}
          </p>
          <Button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full px-8 py-6 text-base">
            {t('landing.hero.joinNow')} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
