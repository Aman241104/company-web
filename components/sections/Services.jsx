'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Code2, TrendingUp, ShoppingCart, ArrowRight } from 'lucide-react'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

// Real screenshots of real delivered work, mapped 1:1 to the matching
// service entries in `components/pages/ServicesPage.jsx` (same case
// studies, same images already used by Portfolio.jsx/WorkPage.jsx — not
// new claims, just reused honestly). Performance Marketing has no shipped
// case study to show yet, so it intentionally gets no screenshot rather
// than a borrowed or fabricated one — see the `image: null` branch below.
const services = [
  {
    icon: Monitor,
    title: 'Website Development',
    desc: 'Modern, responsive and SEO-friendly websites designed to build trust, showcase your business, and generate enquiries.',
    tags: ['Business Websites', 'Landing Pages', 'SEO-Ready'],
    href: '/services#service-01',
    image: '/silverspoon-screenshot.png',
    caseStudy: { title: 'Silver Spoon by ACJ', result: 'Headless Next.js storefront rebuild' },
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    desc: 'Online stores that make it easy for customers to browse, order and pay: built to sell, not just look good.',
    tags: ['Shopify', 'Custom Storefronts', 'Payments'],
    href: '/services#service-02',
    image: '/assets/prihaan-spices-live.jpg',
    caseStudy: { title: 'Prihaan Spices & Agro', result: '252+ SKU e-commerce catalog' },
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    desc: 'Web applications and business software built around your specific workflows, when off-the-shelf tools stop being enough.',
    tags: ['Web Apps', 'Dashboards', 'ERP'],
    href: '/services#service-05',
    image: '/assets/saas_hero_mockup.png',
    caseStudy: { title: 'Vibo ERP', result: 'Built & used in-house at Mehta Technologies' },
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Google and Meta ad campaigns focused on bringing in the right traffic and turning it into real enquiries.',
    tags: ['Google Ads', 'Meta Ads', 'ROAS Tracking'],
    href: '/services#service-06',
    image: null,
    caseStudy: null,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-[#F4F7FC] overflow-hidden">
      <div className="relative z-10 py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header — plain single-color headline, no eyebrow pill/icon row */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0A1124]/50 mb-3 inline-block">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1124] tracking-tight leading-tight mb-4">
              Complete digital solutions for your business
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#0A1124]/60 leading-relaxed">
              From building your online presence to developing custom digital solutions, we help businesses use technology to grow and operate better.
            </p>
          </motion.div>
        </div>

        {/* Each card carries its own real screenshot with a floating
            case-study detail overlay, composite.global-style — not an
            icon-in-rounded-square. Performance Marketing has no shipped
            case study yet, so its card is honestly undecorated (a plain
            textured panel) rather than borrowing someone else's image. */}
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
                className="group flex flex-col rounded-2xl bg-white border border-[#0A1124]/10 shadow-sm hover:border-[#1F4FFF]/40 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {service.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0A1124]/5 mb-7">
                    <Image
                      src={service.image}
                      alt={`${service.caseStudy.title} — ${service.title.toLowerCase()} built by Mehta Technologies`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 text-[10px] font-semibold text-[#0A1124]">
                      <Icon size={12} />
                      {service.title}
                    </span>
                    {/* Floating detail-card overlay */}
                    <div className="absolute -bottom-6 left-3 right-3 rounded-xl bg-white border border-[#0A1124]/10 shadow-lg px-3.5 py-2.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#1F4FFF] mb-0.5">
                        Shipped work
                      </div>
                      <div className="text-xs font-bold text-[#0A1124] leading-snug">{service.caseStudy.title}</div>
                      <div className="text-[11px] text-[#0A1124]/55 leading-snug">{service.caseStudy.result}</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden bg-grid-dots mb-7 flex items-end p-5">
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#0A1124]/10 text-[10px] font-semibold text-[#0A1124]">
                      <Icon size={12} />
                      {service.title}
                    </span>
                    <span className="text-[64px] font-extrabold text-[#0A1124]/8 leading-none select-none">04</span>
                  </div>
                )}

                <div className="flex flex-col flex-1 px-6 sm:px-8 pb-6 sm:pb-8">
                  <h3 className="text-xl font-bold text-[#0A1124] tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#0A1124]/60 leading-relaxed mb-6 font-normal flex-1">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#0A1124]/10 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#0A1124]/15 text-[#0A1124]/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F4FFF] group-hover:text-[#1A3FD6] transition-colors"
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
