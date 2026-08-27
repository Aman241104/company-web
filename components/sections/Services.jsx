'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Code2, Smartphone, TrendingUp, Search, Cloud, ArrowRight, Check } from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'Web Platforms & Stores',
    desc: 'High-performance Next.js web applications, headless commerce & Shopify stores engineered for conversion and sub-second load times.',
    tags: ['Next.js 15', 'Tailwind', 'Headless CMS', 'Shopify Plus'],
    href: '/services',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Engineering',
    desc: 'Cross-platform iOS and Android apps with fluid native feel, offline syncing, real-time push notifications, and App Store submission.',
    tags: ['React Native', 'Flutter', 'iOS & Android', 'Push & Auth'],
    href: '/services',
  },
  {
    icon: Code2,
    title: 'Custom Software & APIs',
    desc: 'Bespoke backend architectures, microservices, secure REST/GraphQL APIs, and enterprise cloud integrations built for 99.9% uptime.',
    tags: ['Node.js', 'PostgreSQL', 'Microservices', 'AWS / GCP'],
    href: '/services',
  },
  {
    icon: Cloud,
    title: 'SaaS Platforms & ERP',
    desc: 'Multi-tenant cloud platforms, automated billing with Stripe/Razorpay, role-based access, and enterprise workflow engines.',
    tags: ['Multi-Tenant', 'Stripe Billing', 'RBAC', 'ViboERP'],
    href: '/services',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Data-driven Meta and Google ad campaigns managed with relentless focus on ROAS, CAC reduction, and full-funnel attribution.',
    tags: ['Google Ads', 'Meta Ads', 'Funnel UX', 'ROAS Tracking'],
    href: '/services',
  },
  {
    icon: Search,
    title: 'Technical SEO & Speed',
    desc: 'Architecture audits, keyword clustering, and Core Web Vitals optimization to win high-intent search rankings that compound into revenue.',
    tags: ['Core Web Vitals', 'Schema Data', 'Technical SEO', 'Indexation'],
    href: '/services',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-white overflow-hidden">
      {/* Blend into the dark hero above */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-b from-[#07080C] to-white z-0" />
      {/* Soft accent glows */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full bg-blue-200/25 blur-[100px] z-0" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-purple-200/20 blur-[100px] z-0" />

      <div className="relative z-10 py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold tracking-widest uppercase text-blue-600">
            Capabilities & Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            One accountable team.{' '}
            <span className="text-gradient-accent">Every layer.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">
            Six interconnected disciplines under one roof. No fragmented agencies or unaccountable handoffs — we own the outcome end to end.
          </p>
        </motion.div>
      </div>

      {/* 3-Column Modern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 group-hover:bg-blue-100 transition-all">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6 font-normal">
                  {service.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-neutral-50 text-neutral-500 border border-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                >
                  Explore Capabilities <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>
      </div>
    </section>
  )
}
