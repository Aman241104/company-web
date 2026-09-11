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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight lg:sticky lg:top-32"
            >
              Why Businesses Choose <span className="text-blue-600">Us.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-b border-neutral-200">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-150px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 py-5 border-t border-neutral-200"
                >
                  <Icon size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{reason.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{reason.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
