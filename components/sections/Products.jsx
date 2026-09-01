'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight, ShoppingBag, Boxes, Receipt, Users2, Package, BarChart3, ArrowRight } from 'lucide-react'
import BorderBeam from '@/components/ui/BorderBeam'
import SpotlightCard from '@/components/ui/SpotlightCard'

const modules = [
  { icon: ShoppingBag, title: 'Sales', desc: 'Track orders and manage your sales pipeline in one place.' },
  { icon: Boxes, title: 'Inventory', desc: 'Real-time stock levels across your products and locations.' },
  { icon: Receipt, title: 'Billing', desc: 'Fast, compliant invoicing without spreadsheets.' },
  { icon: Users2, title: 'Customers', desc: 'A single record of every customer and their order history.' },
  { icon: Package, title: 'Purchases', desc: 'Manage suppliers and purchase orders end to end.' },
  { icon: BarChart3, title: 'Business Reports', desc: 'Clear reporting on how your business is actually performing.' },
]

export default function Products() {
  return (
    <section id="products" className="relative bg-white overflow-hidden">
      {/* Soft accent glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-200/20 blur-[100px] z-0" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-blue-200/25 blur-[100px] z-0" />
      {/* Blend into the dark stats band below */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-b from-white to-[#07080C] z-0" />

      <div className="relative z-10 py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="mb-4 inline-block text-xs font-bold tracking-widest uppercase text-blue-600">
            Our Product
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Vibo ERP —{' '}
            <span className="text-gradient-accent">Our Own Product.</span>
          </h2>
        </div>
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 shadow-sm transition-all whitespace-nowrap"
          >
            Explore Vibo ERP <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Vibo ERP Card with Visual preview + Module Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

        {/* Flagship: Vibo ERP Card with Visual preview */}
        <SpotlightCard
          enableTilt={false}
          spotlightColor="rgba(59, 130, 246, 0.12)"
          borderColor="rgba(59, 130, 246, 0.3)"
          className="!bg-white !border-blue-100 lg:col-span-7 rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-900/5"
        >
          {/* Animated Border Beam */}
          <BorderBeam size={220} duration={12} colorFrom="#3b82f6" colorTo="#a855f7" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 border border-blue-100 text-blue-600">
                Built In-House
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
              Vibo ERP
            </h3>
            <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mb-6 font-normal">
              Vibo ERP is our in-house business management software, designed to help businesses manage their operations — sales, inventory, billing and more — from one place.
            </p>

            {/* Visual SaaS snapshot banner */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-200 mb-6 group bg-[#0B0D14] p-6 sm:p-8">
              <Image
                src="/assets/saas_hero_mockup.png"
                alt="Vibo ERP Platform View"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-transparent to-transparent" />
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {[
                'Manage sales, inventory, billing and customers from one dashboard',
                'Built and refined through everyday use in our own operations',
                'Available to clients who need more than a website',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-xs text-neutral-700 font-medium">
                  <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs font-semibold text-neutral-500">
                Built and used in-house at Mehta Technologies
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Explore Vibo ERP <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* Module Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((p, index) => {
            const Icon = p.icon
            return (
              <SpotlightCard
                key={p.title}
                enableTilt={true}
                spotlightColor="rgba(59, 130, 246, 0.1)"
                borderColor="rgba(59, 130, 246, 0.25)"
                className="!bg-white !border-neutral-200 p-5 rounded-2xl shadow-sm hover:!border-blue-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3.5">
                    <Icon size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1.5">{p.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
                </div>
              </SpotlightCard>
            )
          })}
        </div>

      </div>
      </div>
    </section>
  )
}

