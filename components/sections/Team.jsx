'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const team = [
  {
    name: 'Gaurav Mehta',
    role: 'Founder & CEO',
    image: '/team/gaurav.jpg',
    bio: 'Full-stack systems architect and product engineer. 8+ years shipping high-throughput cloud software and leading multidisciplinary digital teams.',
    skills: ['Next.js', 'System Architecture', 'SaaS Strategy'],
    socials: { linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Riya Shah',
    role: 'Head of Design & UX',
    image: '/team/riya.jpg',
    bio: 'Design director blending visual precision with conversion science. Former senior UX at leading fintech unicorn.',
    skills: ['Figma', 'Interaction Design', 'Design Systems'],
    socials: { linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Arjun Pillai',
    role: 'Lead Backend Engineer',
    image: '/team/arjun.jpg',
    bio: 'Distributed systems & cloud infrastructure engineer. Built backends that process 3M+ transactions/day with sub-second SLAs.',
    skills: ['Node.js', 'PostgreSQL', 'Docker & Kubernetes'],
    socials: { linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Sameer Joshi',
    role: 'Mobile Engineering Lead',
    image: '/team/sameer.jpg',
    bio: 'Cross-platform mobile architect. Shipped 20+ applications across iOS & Android with 4.8+ App Store user ratings.',
    skills: ['React Native', 'Flutter', 'iOS & Android CI/CD'],
    socials: { linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Priya Nambiar',
    role: 'Growth & Performance Lead',
    image: '/team/priya.jpg',
    bio: 'Performance marketing strategist obsessed with unit economics and CAC reduction. Managed ₹5Cr+ in verified ad spend.',
    skills: ['Google Ads', 'Meta Campaigns', 'Attribution UX'],
    socials: { linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Kavya Reddy',
    role: 'Technical SEO Architect',
    init: 'KR',
    bio: 'Core Web Vitals specialist and content cluster architect. Ranked 40+ client platforms #1 on high-intent search queries.',
    skills: ['Technical SEO', 'Schema Markup', 'Core Web Vitals'],
    socials: { linkedin: 'https://linkedin.com' },
  },
]

function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/40 transition-all duration-300 group"
    >
      <div>
        {/* Avatar & Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/15 bg-blue-600/20 shrink-0 shadow-md">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="56px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-sm text-blue-400 bg-blue-500/10">
                {member.init}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{member.name}</h3>
            <p className="text-xs text-blue-400 font-medium">{member.role}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-white/55 leading-relaxed mb-6 font-normal">
          {member.bio}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {member.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.06]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-white/35 font-mono">Mehta Tech Core</span>
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            aria-label={`${member.name} LinkedIn`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="team" className="py-24 md:py-32 max-w-[1360px] mx-auto px-6 md:px-8 border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="glow-pill mb-4 inline-flex">
            Leadership & Core Engineers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Meet the engineers{' '}
            <span className="text-gradient-accent">behind your product.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            A small, high-leverage team of senior specialists across architecture, UI/UX, cloud infrastructure, and growth.
          </p>
        </motion.div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {team.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>

      {/* Careers Hiring Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
            We are always looking for senior builders.
          </h3>
          <p className="text-xs sm:text-sm text-white/50">
            Open roles in Next.js, distributed backend systems, and performance marketing.
          </p>
        </div>
        <a
          href="mailto:careers@mehtatechnologies.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-all whitespace-nowrap"
        >
          Explore Careers <ArrowRight size={13} />
        </a>
      </motion.div>
    </section>
  )
}
