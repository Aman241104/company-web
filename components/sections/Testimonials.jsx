'use client'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowUpRight, CheckCircle2, ShieldCheck, Building, Sparkles } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

const testimonials = [
  {
    quote: "Mehta Technologies transformed our online presence completely. The custom Shopify store they engineered delivered a 280% increase in luxury gift orders within the first quarter post-launch.",
    author: "Aditi Chawla",
    role: "Founder & Creative Director",
    company: "Silver Spoon by ACJ",
    metric: "+280% Sales Growth",
    category: "Luxury E-Commerce",
    rating: 5,
    location: "Mumbai",
  },
  {
    quote: "Their team built our inventory and billing system with real care for how we actually work day to day. It's been stable and reliable since launch — no drama, just a system that works.",
    author: "Rajesh Varma",
    role: "Chief Operating Officer",
    company: "FruitManager & AgroTech",
    metric: "Reliable Daily Operations",
    category: "Custom Software",
    rating: 5,
    location: "Bengaluru",
  },
  {
    quote: "The turn-around time was unbelievable. They delivered our entire turnkey digital portfolio with smooth 60fps animations and instant booking leads in under 90 days. Truly a top-tier partner.",
    author: "Karan Singhal",
    role: "Principal Architect",
    company: "Stylux Interiors",
    metric: "90-Day Delivery",
    category: "Architecture & Design",
    rating: 5,
    location: "Ahmedabad",
  },
  {
    quote: "Their technical SEO work took our clinic from unranked to #1 on Google for 12 core high-intent medical queries within 3 months. Our direct patient consultations doubled.",
    author: "Dr. Anirudh Mehta",
    role: "Chief Ophthalmologist",
    company: "EyeCare & Clinical Center",
    metric: "#1 Search Ranking",
    category: "Healthcare & SEO",
    rating: 5,
    location: "Mumbai",
  },
  {
    quote: "Finding an engineering team that understands both complex Next.js architectures and performance marketing ROAS is rare. They achieved a 4.4x return on our acquisition spend.",
    author: "Tanvi Parekh",
    role: "Managing Director",
    company: "LuxeLiving Residences",
    metric: "4.4x Campaign ROAS",
    category: "Hospitality & Growth",
    rating: 5,
    location: "Goa & Mumbai",
  },
  {
    quote: "From day one, their communication was crystal clear. Regular updates, no scope confusion, and quick responses whenever we had a question. It feels like having a dedicated tech team on call.",
    author: "Vikram Shenoy",
    role: "Co-Founder & CTO",
    company: "NexSphere Financial",
    metric: "Clear Communication",
    category: "FinTech Platform",
    rating: 5,
    location: "Bengaluru",
  },
]

const doubled = [...testimonials, ...testimonials]

function TestimonialCard({ item }) {
  return (
    <div className="w-[360px] sm:w-[400px] shrink-0 p-6 sm:p-7 rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-blue-500/30 transition-all flex flex-col justify-between shadow-xl shadow-black/40 mr-5">
      <div>
        {/* Rating stars & metric */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 size={11} /> {item.metric}
          </span>
        </div>

        {/* Quote text */}
        <p className="text-sm text-white/80 leading-relaxed font-normal mb-6">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author details */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {item.author}
          </h3>
          <p className="text-xs text-white/50">
            {item.role}, <span className="text-blue-400 font-medium">{item.company}</span>
          </p>
        </div>
        <div className="text-[11px] font-mono text-white/30">
          {item.location}
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="testimonials" className="py-24 md:py-32 overflow-hidden relative bg-[#07080C] border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="glow-pill mb-4 inline-flex">
            Verified Client Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Trusted by founders.{' '}
            <span className="text-gradient-accent">Backed by results.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            150+ shipped projects and an average 4.9/5 satisfaction rating from businesses across India.
          </p>
        </motion.div>
      </div>

      {/* Testimonials Marquee Rows */}
      <div className="relative">
        {/* Edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[#07080C] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[#07080C] to-transparent pointer-events-none" />

        {reducedMotion ? (
          <div className="max-w-[1360px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <motion.div
              className="flex w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            >
              {doubled.map((item, i) => (
                <TestimonialCard key={`row1-${i}`} item={item} />
              ))}
            </motion.div>

            <motion.div
              className="flex w-max"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            >
              {[...doubled].reverse().map((item, i) => (
                <TestimonialCard key={`row2-${i}`} item={item} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
