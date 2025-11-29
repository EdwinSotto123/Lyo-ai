"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance">
            Kinso brings together all of your conversations, which uses AI to understand your goals and lets you focus
            on the most important messages and contacts.
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Whether you're circling back over email, digging for opportunities on LinkedIn, or buried under messages on
            Slack, business communications happens on too many platforms.
          </p>
        </motion.div>

        {/* Features badge */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="flex-1 max-w-xs h-px bg-gray-700" />
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-700 text-sm text-gray-400">
            FEATURES
          </span>
          <div className="flex-1 max-w-xs h-px bg-gray-700" />
        </div>
      </div>
    </section>
  )
}
