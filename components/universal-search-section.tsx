"use client"

import { motion } from "framer-motion"

export function UniversalSearchSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center justify-end gap-4 mb-12">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 bg-white">
            UNIVERSAL SEARCH
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rose-50 via-orange-50 to-teal-50 rounded-2xl p-8">
              {/* Search result card */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-teal-400" />
                  <span className="text-sm text-gray-700">Found info about "Susan's contract"</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Summary</h4>
                    <p className="text-sm text-gray-600">
                      You offered her a discount based on agreeing to the terms before end of month.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <span className="font-medium text-sm">Susan Meadows</span>
                      <p className="text-xs text-gray-500">
                        Following up on the contract and discount terms before the end of the month
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-[#EA4335]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                      <path d="M20 4l-8 6-8-6" stroke="white" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance">
              Search across all your conversations.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Find anything you've ever sent or received without knowing the exact words that were used.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Instead of crawling through multiple emails and messaging platforms, just ask Kinso's universal search
              bar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
