"use client"

import { motion } from "framer-motion"

export function DraftResponseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600">
            DRAFT RESPONSE
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance">
              Respond faster with auto-drafted replies.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By learning how you communicate with different people across different platforms, young drafts replies
              matching your voice and tone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each reply is crafted with the context of your recent discussions and meetings.
            </p>
          </div>

          {/* Right content - Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-orange-50 via-rose-50 to-teal-50 rounded-2xl p-6">
              {/* Email card */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/professional-woman-headshot.png" alt="Natasha Corwin" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Natasha Corwin</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#EA4335">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                        <path d="M20 4l-8 6-8-6" stroke="white" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500">
                      Re: Natasha need your quick review of the keynote runsheet to unify...
                    </p>
                  </div>
                </div>

                {/* Auto draft indicator */}
                <div className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-teal-400" />
                    <span className="text-sm text-gray-600">Auto drafting response...</span>
                  </div>
                  <p className="text-sm text-gray-700">Thanks for the update, appreciate you making those edits...</p>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
