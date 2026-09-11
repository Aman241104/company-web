'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    name: 'SV Space Designs',
    category: 'Architecture & Turnkey Studio',
    image: '/assets/sv-space-designs-live.jpg',
    href: 'https://www.svspacedesigns.in',
  },
  {
    name: 'Prihaan Spices & Agro',
    category: 'Spices & Agro E-Commerce',
    image: '/assets/prihaan-spices-live.jpg',
    href: 'https://www.prihaanspices.in',
  },
  {
    name: 'The Silver Spoon / Argentum',
    category: 'Luxury Silver E-Commerce',
    image: '/silverspoon-screenshot.png',
    href: 'https://www.silverspoonbyacj.com',
  },
  {
    name: 'CMJ Events',
    category: 'Luxury Wedding & Event Planning',
    image: '/assets/club-mj-events-live.jpg',
    href: 'https://www.clubmjevents.com',
  },
]

export default function Portfolio() {
  return (
    <section className="relative bg-white py-16 sm:py-24 md:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="mb-4 inline-block text-xs font-bold tracking-widest uppercase text-blue-600">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Websites We&apos;ve Built{' '}
              <span className="text-gradient-accent">For Amazing Businesses.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 shadow-sm transition-all whitespace-nowrap"
          >
            View All Projects <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group block rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-neutral-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-neutral-500">{project.category}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
