'use client'
import { motion } from 'framer-motion'
import { Target, Smartphone, Zap, Settings2, MessageCircle, Heart } from 'lucide-react'

const reasons = [
  { icon: Target, title: 'Business Focused', desc: 'We build solutions that solve real business problems.' },
  { icon: Smartphone, title: 'Mobile First', desc: 'Every website we build looks perfect on all devices.' },
  { icon: Zap, title: 'Fast & SEO Ready', desc: 'Built for speed and SEO to help you rank better on Google.' },
  { icon: Settings2, title: 'Custom & Scalable', desc: 'Tailored to your needs and ready to grow with your business.' },
  { icon: MessageCircle, title: 'Clear Communication', desc: 'We believe in clarity, transparency and regular updates.' },
  { icon: Heart, title: 'Ongoing Support', desc: "We're here even after your website or project goes live." },
]

export default function WhyUs() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-24 md:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight"
          >
            Why Businesses Choose{' '}
            <span className="text-gradient-accent">Mehta Technologies.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-150px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-blue-600 mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1.5">{reason.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{reason.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
