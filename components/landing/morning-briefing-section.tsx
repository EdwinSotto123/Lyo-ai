"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function MorningBriefingSection() {
  return (
    <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="text-white">Start every day knowing</span>
              <br />
              <span className="text-amber-500">what matters.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              Kinso serves you a morning briefing that summarises crucial messages and action items. Whether it's the
              urgent client request or time-sensitive approval, you'll see it in order of what needs your attention
              first.
            </p>
          </div>

          {/* Right content - Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden">
              {/* Window controls */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl">
                    <span className="text-white">Good Morning, </span>
                    <span className="text-gray-500">Sarah.</span>
                  </h3>
                  <p className="text-gray-400">
                    You've got <span className="text-white">4 new</span> and{" "}
                    <span className="text-gray-500">5 active</span>
                    <br />
                    conversations.
                  </p>

                  <button className="inline-flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-sm font-medium mt-4">
                    Today's briefing <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 mt-6 bg-[#252525] rounded-full px-4 py-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-teal-400" />
                    <span className="text-sm text-gray-400">
                      Start typing to ask <span className="text-gray-500">or search Kinso</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
