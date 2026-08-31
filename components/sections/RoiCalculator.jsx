'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, TrendingUp, Sparkles, Check, AlertCircle, Clock, ShieldCheck } from 'lucide-react'

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(3) // 3 members (e.g., 1 Lead Full-Stack, 1 Frontend/Mobile, 1 UI/UX)
  const [monthlySalary, setMonthlySalary] = useState(150000) // ₹1.5L / mo average
  const [projectMonths, setProjectMonths] = useState(5) // 5 months estimated build

  // In-House Cost Calculation:
  // Base Salary = TeamSize * MonthlySalary * ProjectMonths
  // Hiring & Recruiting Overhead = 15% of annual CTC + 3 months search latency overhead
  // Benefits, hardware, AWS dev seats = 20%
  const inHouseBase = teamSize * monthlySalary * projectMonths
  const hiringFee = teamSize * monthlySalary * 1.5 // typical 1.5 month recruitment agency fee
  const infraOverhead = inHouseBase * 0.18 // equipment, benefits, cloud dev seats
  const totalInHouseCost = inHouseBase + hiringFee + infraOverhead

  // Mehta Tech Dedicated High-Velocity Sprint Cost:
  // Flat outcome-based sprint delivery with zero recruiting overhead & 40% faster turnaround
  const mehtaMonths = Math.max(2, Math.round(projectMonths * 0.6))
  const mehtaTechCost = Math.round(totalInHouseCost * 0.42)
  const savings = Math.max(0, totalInHouseCost - mehtaTechCost)
  const timeSavedMonths = projectMonths - mehtaMonths

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section id="roi-calculator" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Economic Value Calculator
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Calculate your net ROI vs.{' '}
          <span className="text-gradient-accent">in-house hiring.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          Compare the actual cost and time-to-market of hiring full-time senior engineers versus partnering with Mehta Technologies.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left: Config Sliders & Controls */}
        <div className="lg:col-span-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-1">
              Interactive Scope Model
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Customize Team Requirements
            </h3>
          </div>

          {/* Slider 1: Team Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-white/70 font-medium">Engineers Required</span>
              <span className="font-mono font-bold text-white px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10">
                {teamSize} {teamSize === 1 ? 'Senior Engineer' : 'Senior Engineers'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-white/30 font-mono">
              <span>1 Engineer</span>
              <span>4 Engineers</span>
              <span>8 Engineers</span>
            </div>
          </div>

          {/* Slider 2: Project Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-white/70 font-medium">Estimated Roadmap Duration</span>
              <span className="font-mono font-bold text-white px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10">
                {projectMonths} Months
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={projectMonths}
              onChange={(e) => setProjectMonths(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-white/30 font-mono">
              <span>2 Months (MVP)</span>
              <span>6 Months (V1 SaaS)</span>
              <span>12 Months (Enterprise)</span>
            </div>
          </div>

          {/* Slider 3: In-House Monthly Salary per Dev */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-white/70 font-medium">Senior Dev Monthly In-House Comp</span>
              <span className="font-mono font-bold text-white px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10">
                {formatCurrency(monthlySalary)}/mo
              </span>
            </div>
            <input
              type="range"
              min="80000"
              max="350000"
              step="10000"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-white/30 font-mono">
              <span>₹80k/mo</span>
              <span>₹2,00,000/mo</span>
              <span>₹3,50,000/mo</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-xs text-white/55 space-y-1.5 font-mono">
            <div className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400 shrink-0" /> Includes recruitment fee & onboarding latency calculation
            </div>
            <div className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400 shrink-0" /> 100% intellectual property transfer to your company
            </div>
          </div>
        </div>

        {/* Right: Real-time ROI & Savings Summary Card */}
        <div className="lg:col-span-6 rounded-3xl bg-[#090B12] border border-blue-500/30 p-5 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent" />

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-2">
              Estimated Total Economic Impact
            </div>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
              <span className="text-gradient-accent">{formatCurrency(savings)}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 font-normal">
              Estimated net capital saved + {timeSavedMonths} months faster go-to-market speed.
            </p>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              {/* In-House Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="text-[11px] font-mono uppercase text-red-400 font-semibold flex items-center gap-1.5">
                  <AlertCircle size={12} /> In-House Internal
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white font-mono">
                  {formatCurrency(totalInHouseCost)}
                </div>
                <div className="text-[11px] text-white/55">
                  {projectMonths} mos + ~3 mos hiring ramp
                </div>
              </div>

              {/* Mehta Tech Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-600/10 border border-blue-500/30 space-y-2">
                <div className="text-[11px] font-mono uppercase text-blue-400 font-semibold flex items-center gap-1.5">
                  <Sparkles size={12} /> Mehta Tech Studio
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white font-mono">
                  {formatCurrency(mehtaTechCost)}
                </div>
                <div className="text-[11px] text-blue-300 font-medium">
                  {mehtaMonths} months (Day 1 start)
                </div>
              </div>
            </div>

            {/* Velocity Highlights */}
            <div className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8">
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Recruitment & Agency Headhunting Fees</span>
                <span className="text-emerald-400 font-semibold">₹0 (Included)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Time to First Production Staging URL</span>
                <span className="text-emerald-400 font-semibold">&lt; 7 Days</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Continuous CI/CD & Architecture QA</span>
                <span className="text-emerald-400 font-semibold">Included</span>
              </div>
            </div>
          </div>

          <Link
            href={`/contact?service=${encodeURIComponent('Dedicated Engineering Sprint')}&budget=${encodeURIComponent(formatCurrency(mehtaTechCost))}`}
            className="w-full py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Lock In Sprint Dates for This Roadmap <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  )
}
