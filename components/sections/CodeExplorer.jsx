'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Copy, Check, Code2, ShieldCheck, Zap, Database } from 'lucide-react'

const snippets = [
  {
    id: 'nextjs',
    title: 'Next.js 15 Server Action & Cache Revalidation',
    filename: 'app/actions/checkout.ts',
    lang: 'TypeScript',
    tag: 'Frontend Architecture',
    code: `'use server'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const CheckoutSchema = z.object({
  tierId: z.string().uuid(),
  tenantId: z.string().uuid(),
  couponCode: z.string().optional(),
})

export async function processCheckoutAction(input: z.infer<typeof CheckoutSchema>) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized session')

  const parsed = CheckoutSchema.parse(input)
  
  // Atomic database transaction with tenant schema isolation
  const order = await db.$transaction(async (tx) => {
    return await tx.orders.create({
      data: {
        userId: session.user.id,
        tenantId: parsed.tenantId,
        tierId: parsed.tierId,
        status: 'PROCESSING',
      }
    })
  })

  revalidateTag(\`tenant-\${parsed.tenantId}-billing\`)
  return { success: true, orderId: order.id }
}`,
  },
  {
    id: 'rls',
    title: 'PostgreSQL Multi-Tenant Row-Level Security',
    filename: 'supabase/migrations/004_tenant_rls.sql',
    lang: 'SQL',
    tag: 'Database Isolation',
    code: `-- Enable Row-Level Security on critical enterprise tables
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy using authenticated JWT claims
CREATE POLICY tenant_isolation_policy ON invoices
  FOR ALL
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  )
  WITH CHECK (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

-- Immutable audit trail insert policy
CREATE POLICY audit_log_insert ON audit_logs
  FOR INSERT
  WITH CHECK (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );`,
  },
  {
    id: 'stripe',
    title: 'Idempotent Subscription Webhook Pipeline',
    filename: 'app/api/webhooks/stripe/route.ts',
    lang: 'TypeScript',
    tag: 'Payment Systems',
    code: `import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object
      await db.invoices.update({
        where: { stripeInvoiceId: invoice.id },
        data: { status: 'PAID', paidAt: new Date() }
      })
      break
    }
  }

  return Response.json({ received: true })
}`,
  },
  {
    id: 'ratelimit',
    title: 'Global Edge Sliding-Window Rate Limiter',
    filename: 'middleware.ts',
    lang: 'TypeScript',
    tag: 'Edge Security',
    code: `import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse, type NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '10 s'),
  analytics: true,
})

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'X-RateLimit-Reset': reset.toString() }
    })
  }

  return NextResponse.next()
}`,
  },
]

export default function CodeExplorer() {
  const [selectedId, setSelectedId] = useState('nextjs')
  const [copied, setCopied] = useState(false)
  const activeSnippet = snippets.find((s) => s.id === selectedId) || snippets[0]

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="code-explorer" className="py-24 md:py-32 max-w-[1360px] mx-auto px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Production Architecture & Code
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Production-grade engineering.{' '}
          <span className="text-gradient-accent">Zero boilerplate fluff.</span>
        </h2>
        <p className="text-base sm:text-lg text-white/50 leading-relaxed">
          Inspect actual production patterns we implement for multi-tenancy, sub-second edge routing, and automated billing.
        </p>
      </div>

      {/* Terminal Mockup Window */}
      <div className="rounded-3xl bg-[#090B12] border border-white/[0.12] overflow-hidden shadow-2xl shadow-black/90">
        
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-black/60 border-b border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <span className="font-mono text-xs text-white/60">
              {activeSnippet.filename}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {activeSnippet.tag}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-xs font-mono transition-colors"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-3 border-b border-white/[0.08] bg-white/[0.01] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {snippets.map((s) => {
            const isSelected = s.id === selectedId
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-white/40 hover:text-white hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                {s.title}
              </button>
            )
          })}
        </div>

        {/* Code Content */}
        <div className="p-6 sm:p-8 bg-[#06070B] overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>

        {/* Terminal Status Bar */}
        <div className="px-6 py-3 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Typecheck: Passed (0 errors)</span>
          </div>
          <span>Language: {activeSnippet.lang}</span>
        </div>

      </div>
    </section>
  )
}
