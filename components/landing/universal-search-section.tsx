"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function UniversalSearchSection() {
  const t = useTranslations()

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section label */}
        <div className="flex items-center justify-end gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-full">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 min-w-0" />
          <span className="inline-flex items-center px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-[9px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 text-center whitespace-nowrap flex-shrink-0">
            {t('landing.universalSearch.label')}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center w-full">
          {/* Left content - Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1 w-full"
          >
            <div className="bg-gradient-to-br from-rose-50 via-orange-50 to-teal-50 dark:from-rose-900/20 dark:via-orange-900/20 dark:to-teal-900/20 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 w-full">
              {/* Search result card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-5 w-full">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 w-full">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-orange-400 to-teal-400 flex-shrink-0" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-700 dark:text-gray-300 truncate flex-1 min-w-0">Found info about "Susan's contract"</span>
                </div>

                <div className="space-y-2 sm:space-y-2.5 md:space-y-3 w-full">
                  <div className="w-full">
                    <h4 className="font-semibold text-[10px] sm:text-xs md:text-sm mb-0.5 sm:mb-1">Summary</h4>
                    <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                      You offered her a discount based on agreeing to the terms before end of month.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 p-2 sm:p-2.5 md:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md sm:rounded-lg w-full min-w-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <span className="font-medium text-[10px] sm:text-xs md:text-sm block truncate">Susan Meadows</span>
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 truncate">
                        Following up on contract terms
                      </p>
                    </div>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#EA4335] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                      <path d="M20 4l-8 6-8-6" stroke="white" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center lg:text-left order-1 lg:order-2 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white leading-tight break-words hyphens-auto">
              {t('landing.universalSearch.title')}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
              {t('landing.universalSearch.description1')}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
              {t('landing.universalSearch.description2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
