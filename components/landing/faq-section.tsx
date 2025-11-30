"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useTranslations } from "next-intl"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const t = useTranslations()

  const faqs = [
    {
      question: t('landing.faq.questions.q1.question'),
      answer: t('landing.faq.questions.q1.answer'),
    },
    {
      question: t('landing.faq.questions.q2.question'),
      answer: t('landing.faq.questions.q2.answer'),
    },
    {
      question: t('landing.faq.questions.q3.question'),
      answer: t('landing.faq.questions.q3.answer'),
    },
    {
      question: t('landing.faq.questions.q4.question'),
      answer: t('landing.faq.questions.q4.answer'),
    },
    {
      question: t('landing.faq.questions.q5.question'),
      answer: t('landing.faq.questions.q5.answer'),
    },
    {
      question: t('landing.faq.questions.q6.question'),
      answer: t('landing.faq.questions.q6.answer'),
    },
  ]

  return (
    <section id="faqs" className="py-16 sm:py-20 md:py-24 bg-[#0f0f0f] relative overflow-hidden">
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
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full border border-gray-700 text-xs sm:text-sm text-gray-400">
            {t('landing.faq.label')}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4 px-2">{t('landing.faq.title')}</h2>
        <p className="text-sm sm:text-base text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          {t('landing.faq.description')}
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
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-white font-medium pr-3 sm:pr-4 text-sm sm:text-base">{faq.question}</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
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
                    <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-400">{faq.answer}</p>
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
