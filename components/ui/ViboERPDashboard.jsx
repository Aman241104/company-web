'use client'
import { useEffect, useRef } from 'react'

const barData = [42, 68, 55, 80, 63, 91, 74, 58, 85, 70, 95, 78]
const barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const navItems = [
  { icon: '⊞', label: 'Dashboard', active: true },
  { icon: '◈', label: 'Analytics' },
  { icon: '◉', label: 'Projects' },
  { icon: '✦', label: 'CRM' },
  { icon: '⊕', label: 'Finance' },
  { icon: '⊟', label: 'HR' },
  { icon: '⚙', label: 'Settings' },
]

const projects = [
  { name: 'Mobile App Redesign', progress: 75, color: '#3b82f6', due: 'Dec 20' },
  { name: 'Website Development', progress: 50, color: '#8b5cf6', due: 'Jan 10' },
  { name: 'CRM Integration', progress: 100, color: '#10b981', due: 'Done' },
]

function AnimatedBar({ val, i, isHighlight }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.transition = `height 0.5s ease ${i * 0.04}s`
    ref.current.style.height = `${val}%`
  }, [val, i])
  return (
    <div className="flex-1 flex flex-col justify-end" style={{ height: 60 }}>
      <div
        ref={ref}
        style={{
          height: 0,
          minHeight: 2,
          background: isHighlight ? 'linear-gradient(to top, #2563EB, #60a5fa)' : 'rgba(255,255,255,0.08)',
          borderRadius: '2px 2px 0 0',
        }}
      />
    </div>
  )
}

export default function ViboERPDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: 380, background: '#060610', fontFamily: 'system-ui, sans-serif', color: 'white', overflow: 'hidden' }}>

      {/* Sidebar */}
      <div style={{ width: 48, background: '#0a0a18', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 4, flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ width: 26, height: 26, background: 'linear-gradient(135deg, #2563EB, #4f46e5)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: 10 }}>V</span>
        </div>
        {navItems.map((item) => (
          <div
            key={item.label}
            title={item.label}
            style={{
              width: 30, height: 30, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: item.active ? 'rgba(37,99,235,0.2)' : 'transparent',
              color: item.active ? '#60a5fa' : 'rgba(255,255,255,0.2)',
              border: item.active ? '1px solid rgba(37,99,235,0.35)' : '1px solid transparent',
              fontSize: 11, cursor: 'pointer',
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0a0a18', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 600 }}>Dashboard</span>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 8 }}>/ Overview</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5 }}>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 8 }}>⌕</span>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 8 }}>Search...</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>🔔</div>
              <div style={{ position: 'absolute', top: 1, right: 1, width: 5, height: 5, borderRadius: '50%', background: '#2563EB', border: '1px solid #060610' }} />
            </div>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>G</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: 10, overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Greeting */}
          <div>
            <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', marginBottom: 1 }}>Good morning, Gaurav 👋</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Here's what's happening today</p>
          </div>

          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {[
              { label: 'Total Revenue', value: '₹28,540', change: '+12.3%', up: true, color: '#3b82f6', icon: '₹' },
              { label: 'Active Users', value: '2,450', change: '+8.1%', up: true, color: '#8b5cf6', icon: '👥' },
              { label: 'Open Projects', value: '128', change: '+3 new', up: true, color: '#10b981', icon: '◉' },
            ].map((m) => (
              <div key={m.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.label}</p>
                  <span style={{ fontSize: 9, color: m.color }}>{m.icon}</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: 'white', marginBottom: 3 }}>{m.value}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: `${m.color}18`, borderRadius: 4, padding: '1px 4px' }}>
                  <span style={{ fontSize: 7, color: m.color }}>↑ {m.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Revenue Overview</p>
              <div style={{ display: 'flex', gap: 3 }}>
                {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
                  <span key={q} style={{ fontSize: 6, padding: '1px 4px', borderRadius: 3, background: i === 3 ? 'rgba(37,99,235,0.25)' : 'rgba(255,255,255,0.04)', color: i === 3 ? '#60a5fa' : 'rgba(255,255,255,0.25)' }}>{q}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
              {barData.map((val, i) => (
                <AnimatedBar key={i} val={val} i={i} isHighlight={i === 10} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              {barLabels.map((l) => (
                <div key={l} style={{ flex: 1, textAlign: 'center', fontSize: 5.5, color: 'rgba(255,255,255,0.15)' }}>{l}</div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Active Projects</p>
              <span style={{ fontSize: 6.5, color: '#60a5fa' }}>View All →</span>
            </div>
            {projects.map((p) => (
              <div key={p.name} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{p.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.25)' }}>Due {p.due}</span>
                    <span style={{ fontSize: 7.5, fontWeight: 700, color: p.color }}>{p.progress}%</span>
                  </div>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.progress}%`, background: p.color, borderRadius: 2, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
