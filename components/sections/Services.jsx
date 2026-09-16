'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Code2, TrendingUp, ShoppingCart, ArrowRight } from 'lucide-react'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

const services = [
  {
    icon: Monitor,
    title: 'Website Development',
    desc: 'Modern, responsive and SEO-friendly websites designed to build trust, showcase your business, and generate enquiries.',
    tags: ['Business Websites', 'Landing Pages', 'SEO-Ready', 'Fast & Mobile-First'],
    href: '/services#service-01',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    desc: 'Online stores that make it easy for customers to browse, order and pay: built to sell, not just look good.',
    tags: ['Shopify', 'Custom Storefronts', 'Payments', 'Inventory'],
    href: '/services#service-02',
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    desc: 'Web applications and business software built around your specific workflows, when off-the-shelf tools stop being enough.',
    tags: ['Web Apps', 'Dashboards', 'Integrations', 'ERP'],
    href: '/services#service-05',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Google and Meta ad campaigns focused on bringing in the right traffic and turning it into real enquiries.',
    tags: ['Google Ads', 'Meta Ads', 'Funnel UX', 'ROAS Tracking'],
    href: '/services#service-06',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-neutral-50 overflow-hidden">
      <div className="relative z-10 py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            Complete Digital Solutions{' '}
            <span className="text-blue-600">For Your Business</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">
            From building your online presence to developing custom digital solutions, we help businesses use technology to grow and operate better.
          </p>
        </motion.div>
      </div>

      {/* Modern Grid — spring pop-in with a light stagger, distinct from the
          headline tween above: these are independent, browsable cards, not
          announcement text. */}
      <motion.div
        variants={cardGridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-150px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              variants={cardSpringItem}
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
                  Learn More <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      </div>
    </section>
  )
}
