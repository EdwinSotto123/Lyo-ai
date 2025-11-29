"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How is Lyo different from a normal inbox?",
    answer:
      "Lyo unifies all your communication platforms into one intelligent inbox. Unlike traditional email clients, it uses AI to understand context, prioritize messages, and draft responses that match your voice.",
  },
  {
    question: "How do Auto-Drafted Replies work?",
    answer:
      "Lyo learns how you communicate with different people and across different platforms. When you receive a message, it automatically drafts a response matching your voice and tone, incorporating context from your recent discussions.",
  },
  {
    question: "Can you still message outside of Lyo on connected accounts?",
    answer:
      "Yes! Lyo works alongside your existing apps. You can continue using Gmail, Slack, WhatsApp, and other platforms normally. Lyo simply provides a unified view and AI assistance.",
  },
  {
    question: "How does Lyo learn my goals and priorities?",
    answer:
      "Lyo analyzes your communication patterns, response times, and interaction frequency to understand what matters most to you. Over time, it gets better at surfacing important messages and tasks.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. Lyo uses enterprise-grade encryption and never shares your data with third parties. Your communications remain private, and you have full control over what Lyo can access.",
  },
  {
    question: "What happens when I join the waitlist?",
    answer:
      "You'll receive early access to Lyo as we roll out to new users. We'll send you updates on our progress and let you know when it's your turn to experience the unified inbox.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faqs" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-700 text-sm text-gray-400">
            FAQs
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to know about using Lyo, from setup to security. Still curious? Drop us a message and
          we'll get right back to you.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  {openIndex === i ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
