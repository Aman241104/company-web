export default function BrowserMockup({ children, className = '', url = 'mehtatechnologies.com' }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-white/[0.08] ${className}`}
      style={{
        background: '#0d0d14',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]"
        style={{ background: '#13131e' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar */}
        <div
          className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md mx-2"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[10px] text-white/25 font-mono truncate">{url}</span>
        </div>
        {/* Nav dots */}
        <div className="flex gap-1 opacity-30">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>
      {/* Content */}
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
