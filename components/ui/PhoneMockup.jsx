export default function PhoneMockup({ children, className = '' }) {
  return (
    <div
      className={`relative inline-flex flex-col rounded-[2.5rem] overflow-hidden border border-white/[0.1] ${className}`}
      style={{
        background: '#0d0d14',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
        width: '100%',
        maxWidth: '280px',
      }}
    >
      {/* Side buttons — volume */}
      <div className="absolute left-[-3px] top-20 w-[3px] h-8 rounded-l bg-white/10" />
      <div className="absolute left-[-3px] top-32 w-[3px] h-8 rounded-l bg-white/10" />
      {/* Side buttons — power */}
      <div className="absolute right-[-3px] top-24 w-[3px] h-12 rounded-r bg-white/10" />

      {/* Notch */}
      <div className="flex justify-center pt-3 pb-1 px-4" style={{ background: '#0d0d14' }}>
        <div className="w-24 h-5 rounded-full flex items-center justify-center gap-2" style={{ background: '#080810' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }} />
          <div className="w-1 h-1 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Screen content */}
      <div className="flex-1 overflow-hidden" style={{ minHeight: '480px' }}>
        {children}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center py-2" style={{ background: '#0d0d14' }}>
        <div className="w-20 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  )
}
