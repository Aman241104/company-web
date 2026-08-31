'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react'

export default function LocationPage({ location }) {
  const { city, region, keywordLabel, tagline, intro, focusPoints, caseStudies, faqs } = location

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Hero */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="glow-pill mb-4 inline-flex items-center gap-1.5">
            <MapPin size={12} /> {region}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            {keywordLabel.replace('Website Development Agency in', '')}
            <br />
            <span className="text-gradient-accent">Website Development Agency.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-3">{tagline}</p>
          <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl mx-auto">{intro}</p>
        </motion.div>
      </section>

      {/* Focus Points */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {focusPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                <CheckCircle2 size={16} />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight mb-2">{point.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
            Relevant work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all flex items-center justify-between"
              >
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-1.5">{cs.category}</p>
                  <h3 className="text-lg font-bold text-white tracking-tight">{cs.name}</h3>
                </div>
                <ArrowUpRight size={18} className="text-white/55 group-hover:text-white transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
          Common questions
        </h2>
        <div className="max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.02] border border-white/[0.08] p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to talk about your {city} project?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-md mx-auto">
            Book a free discovery call and we&apos;ll scope it honestly — including telling you if you don&apos;t need everything you think you do.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all"
          >
            Book Free Discovery Session <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
