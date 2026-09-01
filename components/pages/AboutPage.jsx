'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Award, Users, Rocket, ShieldCheck, Sparkles, Building2 } from 'lucide-react'
import Team from '@/components/sections/Team'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'
import { useCountUp } from '@/lib/useCountUp'

const projectScreenshots = [
  { src: '/silverspoon-screenshot.png', label: 'Silver Spoon by ACJ' },
  { src: '/interior.png', label: 'Stylux Interiors' },
  { src: '/jjfilms.png', label: 'JJ Films' },
  { src: '/assets/saas_hero_mockup.png', label: 'Vibo ERP' },
  { src: '/zingbliss.png', label: 'ZingBliss' },
  { src: '/sweet.png', label: 'Gourmettazone' },
  { src: '/luxeliving.png', label: 'LuxeLiving' },
  { src: '/nextsphere.png', label: 'NexSphere' },
  { src: '/testimonial.png', label: 'College Capsule' },
  { src: '/chahana.png', label: 'Chahana Dental' },
  { src: '/aangan.png', label: 'Aangan Boutique' },
  { src: '/eyehospital.png', label: 'EyeCare Hospital' },
  { src: '/destination.png', label: 'Destination Anywhere' },
  { src: '/inventory.png', label: 'FruitManager' },
  { src: '/hvac.png', label: 'HVAC' },
  { src: '/chemical.png', label: 'Classic Organic Chemicals' },
  { src: '/form-web.png', label: 'Elite Cloud Books' },
]

const values = [
  {
    num: '01',
    title: 'Outcomes Over Activity',
    desc: 'We measure success by your enquiries, conversions, and business growth — never by billable hours.',
  },
  {
    num: '02',
    title: 'Radical Transparency',
    desc: 'Regular progress updates, live staging links to preview your site, and crystal clear scope contracts. Zero hidden surprises.',
  },
  {
    num: '03',
    title: 'Built to Grow With You',
    desc: 'We build on modern, well-supported tools designed to hold up as your business — and your requirements — grow.',
  },
  {
    num: '04',
    title: 'Speed Without Cutting Corners',
    desc: 'Small, senior team means fast turnaround without ever compromising quality or attention to detail.',
  },
]

const timeline = [
  { year: '2019', event: 'Founded in Ahmedabad as a web development studio, building websites for local businesses.' },
  { year: '2021', event: 'Started building Vibo ERP — our own in-house business management software — to run our own operations better.' },
  { year: '2023', event: 'Grew to serve clients across India, and started taking on custom software and mobile app projects.' },
  { year: '2024', event: 'Passed 150+ successfully shipped websites, e-commerce stores, and custom software projects.' },
  { year: '2025–2026', event: 'Continuing to grow — more clients, better processes, and made Vibo ERP available beyond our own team.' },
]

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across India & globally' },
  { value: 100, suffix: '+', label: 'Happy Clients', desc: 'Across industries' },
  { value: 4.9, suffix: '/5', label: 'Client Satisfaction', desc: 'Rated by real clients' },
  { value: 7, suffix: '+', label: 'Years in Business', desc: 'Building since 2019' },
]

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const count = useCountUp(stat.value, 1600, inView)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center relative overflow-hidden"
    >
      <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
        {Number.isInteger(stat.value) ? count : (inView ? stat.value : 0)}{stat.suffix}
      </div>
      <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
      <div className="text-xs text-white/55">{stat.desc}</div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="glow-pill inline-flex">
              About Mehta Technologies
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Engineering digital products{' '}
              <span className="text-gradient-accent">built for real impact.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl font-normal">
              Mehta Technologies was founded on a singular conviction: every business deserves a website that builds trust and actually brings in enquiries. We build fast, SEO-ready websites, e-commerce stores, and custom software for growing businesses.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 transition-all flex items-center gap-2"
              >
                Work With Us <ArrowRight size={14} />
              </Link>
              <Link
                href="/work"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-all"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-8 md:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-6">
                Company Snapshot
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight mb-1">150+</div>
                  <div className="text-xs text-white/50">Shipped Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight mb-1">2019</div>
                  <div className="text-xs text-white/50">Founded in Ahmedabad</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight mb-1">4.9/5</div>
                  <div className="text-xs text-white/50">Client Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight mb-1">Ongoing</div>
                  <div className="text-xs text-white/50">Support & Maintenance</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently onboarding Q1/Q2 partner projects</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-28">
        <div className="max-w-2xl mb-16">
          <span className="glow-pill mb-4 inline-flex">
            Core Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How we engineer.{' '}
            <span className="text-gradient-accent">How we deliver.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold text-xs flex items-center justify-center mb-5">
                  {v.num}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Project Showcase Loop */}
      <section className="py-12 border-y border-white/[0.06] mb-28 overflow-hidden bg-white/[0.01]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-white/55">
            150+ Successfully Deployed Systems & Digital Experiences
          </div>
        </div>
        <LogoLoop
          logos={[...projectScreenshots, ...projectScreenshots].map(({ src, label }, i) => ({
            node: (
              <div key={i} className="w-56 h-32 rounded-xl border border-white/10 overflow-hidden shrink-0 relative bg-black">
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes="224px"
                  className="object-cover object-top opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ),
          }))}
          logoHeight={128}
          speed={40}
          direction="left"
          gap={16}
          fadeOut
        />
      </section>

      {/* Timeline Section */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-28">
        <div className="max-w-2xl mb-16">
          <span className="glow-pill mb-4 inline-flex">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Seven years of relentless{' '}
            <span className="text-gradient-accent">product engineering.</span>
          </h2>
        </div>

        <div className="max-w-3xl space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-3.5 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold text-[11px] sm:text-xs shrink-0">
                {item.year}
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal pt-0.5">
                {item.event}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* Bottom Conversion CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mt-24 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.02] border border-white/[0.08] p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to build your next milestone?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-md mx-auto">
            Book a 30-minute discovery session with our founding engineering team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all"
          >
            Start Your Conversation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
