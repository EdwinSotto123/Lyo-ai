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
    <section className="relative pt-20 pb-12 sm:pt-28 md:pt-32 sm:pb-16 overflow-hidden bg-white dark:bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800/30" />

      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-teal-400 to-orange-400 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words px-2">
              <motion.span 
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="inline-block bg-gradient-to-r from-gray-900 via-orange-500 via-teal-500 to-gray-900 dark:from-white dark:via-orange-400 dark:via-teal-400 dark:to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                {t('landing.hero.title')}
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              {t('landing.hero.subtitle')}
            </motion.p>
          </motion.div>

          {/* Right content - Image Composition */}
          <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-[1000px]">
            {/* Main Dashboard Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 5 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-[100%] max-w-6xl shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <Image
                src="/intg1.webp"
                alt="Dashboard Interface"
                width={1200}
                height={800}
                className="w-full h-auto object-cover "
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
                src="/fono.webp"
                alt="Mobile Interface"
                width={300}
                height={600}
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16 space-y-3 sm:space-y-4"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 px-4"
          >
            {t('landing.hero.waitlist')}{" "}
            <motion.span 
              key={waitlistCount}
              initial={{ scale: 1.2, color: "#f97316" }}
              animate={{ scale: 1, color: "#f97316" }}
              transition={{ duration: 0.3 }}
              className="text-orange-500 dark:text-orange-400 font-semibold"
            >
              {waitlistCount.toLocaleString()}
            </motion.span>{" "}
            {t('landing.hero.waitlistOthers')}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button className="relative overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base transition-all duration-300 hover:shadow-xl group">
              <span className="relative z-10 flex items-center">
                {t('landing.hero.joinNow')} 
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-teal-500"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: 0, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
