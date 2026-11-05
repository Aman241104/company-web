'use client'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

const reasons = [
  { title: 'Business focused', desc: 'We build solutions that solve real business problems.' },
  { title: 'Mobile first', desc: 'Every website we build looks perfect on all devices.' },
  { title: 'Fast & SEO ready', desc: 'Built for speed and SEO to help you rank better on Google.' },
  { title: 'Custom & scalable', desc: 'Tailored to your needs and ready to grow with your business.' },
  { title: 'Clear communication', desc: 'We believe in clarity, transparency and regular updates.' },
  { title: 'Ongoing support', desc: "We're here even after your website or project goes live." },
]

// Editorial numbered list on cream-dim: sticky heading left, hairline-ruled
// rows right. Rows reveal with a short, tight stagger (list rhythm), unlike
// the rail's slide-in or Products' slower rise.
export default function WhyUs() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative bg-cream-dim py-16 sm:py-24 md:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/70 mb-3 inline-block">
                Why us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.08]">
                Why businesses choose us.
              </h2>
            </motion.div>
          </div>

          <ol className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-b border-ink/15">
            {reasons.map((reason, index) => (
              <motion.li
                key={reason.title}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.04 }}
                className="flex items-baseline gap-5 py-6 border-t border-ink/15"
              >
                <span aria-hidden="true" className="font-mono text-xs font-semibold text-ink/70 w-6 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink tracking-tight mb-1">{reason.title}</h3>
                  <p className="text-sm text-ink/75 leading-relaxed">{reason.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
