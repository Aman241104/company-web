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
    <section id="roi-calculator" className="py-24 md:py-32 max-w-[1360px] mx-auto px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Unit Economics & ROI Engine
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Calculate your savings vs.{' '}
          <span className="text-gradient-accent">in-house hiring.</span>
        </h2>
        <p className="text-base sm:text-lg text-white/50 leading-relaxed">
          Recruiting, interviewing, equity vesting, and onboarding delay can burn up to 4 months of runway. See how a dedicated Mehta Tech engineering sprint accelerates your timeline.
        </p>
      </div>

      {/* Main Interactive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Dynamic Sliders */}
        <div className="lg:col-span-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-2xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                Scope Parameters
              </span>
              <span className="text-xs text-white/40 font-mono">Live Simulation</span>
            </div>

            {/* Slider 1: In-House Team Size */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-white">In-House Team Composition</label>
                <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  {teamSize} Senior Roles
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
              <div className="flex justify-between text-[11px] text-white/35 font-mono">
                <span>1 Full-Stack Dev</span>
                <span>4 Specialists</span>
                <span>8 Enterprise Team</span>
              </div>
            </div>

            {/* Slider 2: Average Monthly Compensation */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-white">Avg. Monthly Compensation / Role</label>
                <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  {formatCurrency(monthlySalary)}/mo
                </span>
              </div>
              <input
                type="range"
                min="75000"
                max="350000"
                step="25000"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-white/35 font-mono">
                <span>₹75k (Mid-level)</span>
                <span>₹2L (Senior Lead)</span>
                <span>₹3.5L (Principal Arch)</span>
              </div>
            </div>

            {/* Slider 3: Timeline */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-white">Estimated Roadmap Horizon</label>
                <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
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
              <div className="flex justify-between text-[11px] text-white/35 font-mono">
                <span>2-Month MVP</span>
                <span>6 Months</span>
                <span>12-Month Enterprise</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] text-xs text-white/40 space-y-2 font-mono">
            <div className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400" /> Includes recruitment fee & onboarding latency calculation
            </div>
            <div className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400" /> 100% intellectual property transfer to your company
            </div>
          </div>
        </div>

        {/* Right: Real-time ROI & Savings Summary Card */}
        <div className="lg:col-span-6 rounded-3xl bg-[#090B12] border border-blue-500/30 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent" />

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
              Estimated Total Economic Impact
            </div>

            <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
              <span className="text-gradient-accent">{formatCurrency(savings)}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mb-8 font-normal">
              Estimated net capital saved + {timeSavedMonths} months faster go-to-market speed.
            </p>

            {/* Comparison Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* In-House Box */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="text-[11px] font-mono uppercase text-red-400 font-semibold flex items-center gap-1.5">
                  <AlertCircle size={12} /> In-House Internal
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {formatCurrency(totalInHouseCost)}
                </div>
                <div className="text-[11px] text-white/40">
                  {projectMonths} mos + ~3 mos hiring ramp
                </div>
              </div>

              {/* Mehta Tech Box */}
              <div className="p-5 rounded-2xl bg-blue-600/10 border border-blue-500/30 space-y-2">
                <div className="text-[11px] font-mono uppercase text-blue-400 font-semibold flex items-center gap-1.5">
                  <Sparkles size={12} /> Mehta Tech Studio
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {formatCurrency(mehtaTechCost)}
                </div>
                <div className="text-[11px] text-blue-300 font-medium">
                  {mehtaMonths} months (Day 1 start)
                </div>
              </div>
            </div>

            {/* Velocity Highlights */}
            <div className="space-y-2.5 mb-8">
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
            className="w-full py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Lock In Sprint Dates for This Roadmap <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  )
}
