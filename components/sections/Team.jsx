'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Link2, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: 'Gaurav Mehta', role: 'Founder & CEO', init: 'GM',
    color: '#3b82f6', bg: 'linear-gradient(135deg, #07080f, #0a0c17)',
    bio: 'Full-stack engineer and product thinker. 8+ years building scalable systems for startups and enterprises.',
    skills: ['Next.js', 'System Design', 'Product Strategy'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Riya Shah', role: 'Head of Design', init: 'RS',
    color: '#3b82f6', bg: 'linear-gradient(135deg, #07080f, #0a0c17)',
    bio: 'UI/UX designer who blends aesthetic precision with conversion-focused thinking. Former Razorpay.',
    skills: ['Figma', 'Interaction Design', 'Design Systems'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Arjun Pillai', role: 'Lead Backend Engineer', init: 'AP',
    color: '#3b82f6', bg: 'linear-gradient(135deg, #07080f, #0a0c17)',
    bio: 'Distributed systems expert. Built backends that handle millions of requests per day without breaking a sweat.',
    skills: ['Node.js', 'PostgreSQL', 'Kubernetes'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Priya Nambiar', role: 'Growth & Marketing Lead', init: 'PN',
    color: '#3b82f6', bg: 'linear-gradient(135deg, #07080f, #0a0c17)',
    bio: 'Performance marketer obsessed with ROAS and data. Managed ₹5Cr+ in ad spend across verticals.',
    skills: ['Google Ads', 'Meta', 'Attribution'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Sameer Joshi', role: 'Mobile Lead', init: 'SJ',
    color: '#3b82f6', bg: 'linear-gradient(135deg, #07080f, #0a0c17)',
    bio: 'React Native & Flutter specialist. Has shipped 20+ apps on both iOS and Android with 4.8+ App Store ratings.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Kavya Reddy', role: 'SEO & Content Strategist', init: 'KR',
    color: '#3b82f6', bg: 'linear-gradient(135deg, #07080f, #0a0c17)',
    bio: 'Technical SEO wizard and content architect. Ranked 40+ clients #1 on Google for competitive keywords.',
    skills: ['Technical SEO', 'Content Strategy', 'Schema'],
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
]

function TeamCard({ member }) {
  return (
    <div
      className="team-card opacity-0 rounded-2xl border border-white/[0.06] overflow-hidden group transition-all duration-300 hover:border-white/[0.12] hover:scale-[1.02]"
      style={{ background: member.bg }}
    >
        {/* Color bar */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${member.color}80, transparent)` }} />

        <div className="p-6">
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: `linear-gradient(135deg, ${member.color}50, ${member.color}90)`,
              border: `1px solid ${member.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', fontWeight: 700, color: 'white', flexShrink: 0,
              fontFamily: 'var(--font-poppins)',
            }}>
              {member.init}
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{member.name}</p>
              <p style={{ color: `${member.color}`, fontSize: '0.75rem', opacity: 0.8 }}>{member.role}</p>
            </div>
          </div>

          {/* Bio */}
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: 16 }}>
            {member.bio}
          </p>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {member.skills.map(s => (
              <span key={s} style={{
                padding: '3px 10px', borderRadius: 9999, fontSize: '0.7rem',
                background: `${member.color}12`, color: member.color,
                border: `1px solid ${member.color}20`,
              }}>
                {s}
              </span>
            ))}
          </div>

          {/* Social links — only render if real URLs are set */}
          {Object.values(member.socials).some(href => href !== '#') && (
            <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14 }}>
              {[
                { Icon: Link2, href: member.socials.linkedin, label: 'linkedin' },
                { Icon: Globe, href: member.socials.github, label: 'github' },
                { Icon: X, href: member.socials.twitter, label: 'twitter' },
              ].filter(({ href }) => href !== '#').map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.25)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.team-word',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, stagger: 0.07, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
        )
        gsap.fromTo('.team-card',
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.team-grid', start: 'top 80%', once: true } }
        )
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.team-word', '.team-card'],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="team" ref={sectionRef} className="py-24 md:py-36 bg-[#04050e] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">The People</p>
            <h2 className="font-display font-black leading-none" style={{ fontSize: 'clamp(2.25rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}>
              {['Meet The', 'Team Behind', 'The Work.'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className={`team-word inline-block opacity-0 will-change-transform ${i !== 2 ? 'text-white' : ''}`}>
                    {i === 2 ? <span className="text-blue-400">{w}</span> : w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="max-w-sm lg:pb-2 lg:text-right">
            <p className="text-white/35 text-sm leading-relaxed">
              A small, high-leverage team of specialists. No fluff, no filler. Just people who ship.
            </p>
          </div>
        </div>

        {/* Team grid */}
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map(member => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* Hiring CTA */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div>
            <p className="text-white font-semibold mb-1">We're growing the team</p>
            <p className="text-white/35 text-sm">Open roles in engineering, design, and growth.</p>
          </div>
          <a href="mailto:careers@mehtatechnologies.com"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm font-medium border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all">
            View Open Roles →
          </a>
        </div>
      </div>
    </section>
  )
}
