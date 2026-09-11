'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// TODO: replace with real client quotes before launch — do not ship placeholder
// testimonials as if they were genuine client reviews.
const testimonials = [
  { quote: 'Client testimonial placeholder — add a real quote from this client before publishing.', name: 'Client Name', business: 'Business Name' },
  { quote: 'Client testimonial placeholder — add a real quote from this client before publishing.', name: 'Client Name', business: 'Business Name' },
  { quote: 'Client testimonial placeholder — add a real quote from this client before publishing.', name: 'Client Name', business: 'Business Name' },
]

export default function Testimonials() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-24 md:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="mb-4 inline-block text-xs font-bold tracking-widest uppercase text-blue-600">
            What Our Clients Say
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Trusted By Businesses{' '}
            <span className="text-gradient-accent">Across Industries.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between"
            >
              <p className="text-sm text-neutral-600 leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-neutral-200" />
                <div>
                  <div className="text-sm font-bold text-neutral-900">{t.name}</div>
                  <div className="text-xs text-neutral-500 mb-1">{t.business}</div>
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
