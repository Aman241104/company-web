'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Code2, Smartphone, TrendingUp, Search, ShoppingCart, ArrowRight, Check } from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'Website Development',
    desc: 'Modern, responsive and SEO-friendly websites designed to build trust, showcase your business, and generate enquiries.',
    tags: ['Business Websites', 'Landing Pages', 'SEO-Ready', 'Fast & Mobile-First'],
    href: '/services',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    desc: 'Online stores that make it easy for customers to browse, order and pay — built to sell, not just look good.',
    tags: ['Shopify', 'Custom Storefronts', 'Payments', 'Inventory'],
    href: '/services',
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    desc: 'Web applications and business software built around your specific workflows, when off-the-shelf tools stop being enough.',
    tags: ['Web Apps', 'Dashboards', 'Integrations', 'ERP'],
    href: '/services',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Google and Meta ad campaigns focused on bringing in the right traffic and turning it into real enquiries.',
    tags: ['Google Ads', 'Meta Ads', 'Funnel UX', 'ROAS Tracking'],
    href: '/services',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS and Android apps for businesses that need a native mobile presence alongside their website.',
    tags: ['React Native', 'Flutter', 'iOS & Android'],
    href: '/services',
  },
  {
    icon: Search,
    title: 'Technical SEO',
    desc: 'Site structure, speed, and search fundamentals handled from day one so your website actually gets found.',
    tags: ['Core Web Vitals', 'On-Page SEO', 'Schema Data'],
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
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold tracking-widest uppercase text-blue-600">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            Complete digital solutions{' '}
            <span className="text-gradient-accent">for your business.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">
            From building your online presence to developing custom digital solutions, we help businesses use technology to grow and operate better.
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
              viewport={{ once: true, margin: "-150px" }}
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
                  Explore More <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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
