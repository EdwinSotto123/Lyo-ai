"use client"

import { motion } from "framer-motion"

export function ContextualAssistantSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600">
            CONTEXTUAL ASSISTANT
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance">
              See conversations that connect themselves.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Lyo connects what belongs together. Contract sent on WhatsApp? Lyo will surface the email requesting
              it. Meeting details scattered across Slack and email?
            </p>
            <p className="text-gray-600 leading-relaxed">Now they're in one place, before you even ask for it.</p>
          </div>

          {/* Right content - Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Window controls */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              <div className="p-4">
                {/* Search bar */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 mb-6">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-teal-400" />
                  <span className="text-sm text-gray-500">Start typing to ask or search Lyo</span>
                </div>

                {/* Conversation cards */}
                <div className="space-y-4">
                  {/* Primary conversation */}
                  <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src="/professional-business-woman.png"
                          alt="Natasha Corwin"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Natasha Corwin</span>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#EA4335">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                            <path d="M20 4l-8 6-8-6" stroke="white" strokeWidth="1.5" fill="none" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                          I'm interested in your service
                          <br />
                          Do you have a <span className="font-semibold">price guide you can share?</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI suggestion */}
                  <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 ml-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-teal-400" />
                      <div>
                        <p className="text-sm text-gray-700">
                          It looks like <span className="font-semibold">Natasha</span> is looking for pricing.
                          <br />I located a <span className="font-semibold">price guide</span> you sent to a customer{" "}
                          <span className="text-orange-500 font-medium">here</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background messages */}
                <div className="mt-4 space-y-2 opacity-50">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">Luke Rankin</span>
                    <span className="text-xs">2w</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">Ben Monroe</span>
                    <span className="text-xs">2w</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">Ethan Rivers</span>
                    <span className="text-xs">4 Aug</span>
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
