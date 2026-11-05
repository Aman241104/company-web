'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

const team = [
  {
    name: 'Gaurav Mehta',
    role: 'Founder & CEO',
    image: '/team/gaurav.jpg',
    bio: 'Full-stack web developer and product engineer, leading the studio since 2019 with a focus on building websites that genuinely help businesses grow.',
    skills: ['Next.js', 'Web Architecture', 'Client Strategy'],
  },
  {
    name: 'Riya Shah',
    role: 'Head of Design & UX',
    image: '/team/riya.jpg',
    bio: 'Design lead focused on clean, conversion-minded interfaces — making sure every site looks great and is easy for visitors to act on.',
    skills: ['Figma', 'Interaction Design', 'Design Systems'],
  },
  {
    name: 'Arjun Pillai',
    role: 'Lead Backend Engineer',
    image: '/team/arjun.jpg',
    bio: 'Backend engineer focused on building reliable, well-structured systems for custom software and e-commerce projects.',
    skills: ['Node.js', 'PostgreSQL', 'API Design'],
  },
  {
    name: 'Sameer Joshi',
    role: 'Mobile Engineering Lead',
    image: '/team/sameer.jpg',
    bio: 'Cross-platform mobile developer, building iOS and Android apps for clients who need a mobile presence alongside their website.',
    skills: ['React Native', 'Flutter', 'iOS & Android'],
  },
  {
    name: 'Priya Nambiar',
    role: 'Growth & Performance Lead',
    image: '/team/priya.jpg',
    bio: 'Performance marketing lead focused on running Google and Meta campaigns that bring in real, qualified enquiries.',
    skills: ['Google Ads', 'Meta Campaigns', 'Attribution UX'],
  },
  {
    name: 'Kavya Reddy',
    role: 'Technical SEO Lead',
    // No published headshot yet — `init` triggers the monogram fallback
    // below instead of a photo. Deliberate, documented pattern for "no
    // photo yet," not a missing asset: every card uses the same 56px
    // circular frame/border/shadow, and the monogram gets a solid ink fill
    // (not a gradient — see research/design-system-v2.md, gradient fills
    // are retired sitewide) with equal visual weight to a photo rather than
    // a pale placeholder tint. Swap in `image: '/team/kavya.jpg'` (and drop
    // `init`) the moment a real photo exists — never fabricate one.
    init: 'KR',
    bio: 'Technical SEO specialist focused on Core Web Vitals, site structure, and search fundamentals that help clients actually get found.',
    skills: ['Technical SEO', 'Schema Markup', 'Core Web Vitals'],
  },
]

function TeamCard({ member }) {
  return (
    <motion.div
      variants={cardSpringItem}
      className="rounded-2xl bg-white border border-[#0A1124]/10 hover:border-[#1F4FFF] hover:shadow-md hover:-translate-y-0.5 p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all duration-300 group"
    >
      <div>
        {/* Avatar & Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#0A1124]/10 bg-[#F4F7FC] shrink-0">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="56px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                role="img"
                aria-label={member.name}
                className="w-full h-full flex items-center justify-center font-bold text-base tracking-wide text-[#F4F7FC] bg-[#0A1124] group-hover:scale-105 transition-transform duration-300"
              >
                {member.init}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0A1124] tracking-tight">{member.name}</h3>
            <p className="text-xs text-[#0A1124]/55 font-medium">{member.role}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-[#0A1124]/60 leading-relaxed mb-6 font-normal">
          {member.bio}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {member.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#0A1124]/[0.03] text-[#0A1124]/70 border border-[#0A1124]/10"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#0A1124]/[0.06]">
        <span className="text-xs text-[#0A1124]/45 font-mono">Mehta Tech Core</span>
      </div>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="team" className="py-24 md:py-32 max-w-[1360px] mx-auto px-6 md:px-8 border-t border-[#0A1124]/10">
      {/* Section Header — plain kicker, single-color headline. No
          pill-badge-above-headline, no two-tone accent split: retired per
          research/design-system-v2.md. */}
      <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-[#0A1124]/45 mb-4">
            Leadership & Core Engineers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1124] tracking-tight leading-tight mb-4">
            Meet the engineers behind your product.
          </h2>
          <p className="text-base sm:text-lg text-[#0A1124]/60 leading-relaxed">
            A small, high-leverage team of senior specialists across architecture, UI/UX, cloud infrastructure, and growth.
          </p>
        </motion.div>
      </div>

      {/* Team Grid */}
      <motion.div
        variants={cardGridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-150px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </motion.div>

      {/* Careers Hiring Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 rounded-2xl bg-[#F4F7FC] border border-[#0A1124]/10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0A1124] tracking-tight mb-1">
            We are always looking for senior builders.
          </h3>
          <p className="text-xs sm:text-sm text-[#0A1124]/60">
            Open roles in Next.js, distributed backend systems, and performance marketing.
          </p>
        </div>
        <a
          href="mailto:careers@mehtatechnologies.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-[#0A1124]/[0.03] text-[#0A1124] border border-[#0A1124]/15 hover:border-[#0A1124]/25 transition-all whitespace-nowrap"
        >
          Explore Careers <ArrowRight size={13} />
        </a>
      </motion.div>
    </section>
  )
}
