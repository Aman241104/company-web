'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Database,
  Terminal,
  Zap,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react'

const tools = [
  { id: 'server-action', name: 'Next.js 15 Server Action Scaffolder', icon: Code2, tag: 'Frontend Architecture' },
  { id: 'postgres-rls', name: 'PostgreSQL Multi-Tenant RLS Policy Builder', icon: Database, tag: 'Database Security' },
  { id: 'stripe-webhook', name: 'Stripe Webhook Route Handler Scaffolder', icon: Terminal, tag: 'Billing Systems' },
]

export default function LabsPage() {
  const [activeTool, setActiveTool] = useState('server-action')
  
  // Tool 1 State: Server Action
  const [actionName, setActionName] = useState('createOrganization')
  const [modelName, setModelName] = useState('Organization')
  const [tagToRevalidate, setTagToRevalidate] = useState('org-settings')

  // Tool 2 State: Postgres RLS
  const [tableName, setTableName] = useState('invoices')
  const [tenantColumn, setTenantColumn] = useState('tenant_id')

  // Copy feedback
  const [copied, setCopied] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Generated Code for Tool 1
  const generatedServerAction = `'use server'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const ${modelName}InputSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).toLowerCase(),
})

export async function ${actionName}Action(input: z.infer<typeof ${modelName}InputSchema>) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized: Authentication required')
  }

  const parsed = ${modelName}InputSchema.parse(input)

  // Execute database transaction
  const record = await db.${modelName.toLowerCase()}.create({
    data: {
      ...parsed,
      userId: session.user.id,
      createdAt: new Date(),
    }
  })

  // Invalidate Next.js edge cache
  revalidateTag('${tagToRevalidate}')

  return { success: true, data: record }
}`

  // Generated Code for Tool 2
  const generatedPostgresRLS = `-- 1. Enable Row-Level Security on ${tableName}
ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;

-- 2. Tenant Isolation Policy (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY tenant_isolation_on_${tableName} ON ${tableName}
  FOR ALL
  USING (
    ${tenantColumn} = (auth.jwt() ->> 'tenant_id')::uuid
  )
  WITH CHECK (
    ${tenantColumn} = (auth.jwt() ->> 'tenant_id')::uuid
  );

-- 3. Verify Policy Application
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = '${tableName}';`

  // Generated Code for Tool 3
  const generatedStripeWebhook = `import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')

  if (!sig) return new Response('Missing stripe signature', { status: 400 })

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return new Response(\`Webhook Error: \${err.message}\`, { status: 400 })
  }

  // Handle billing lifecycle events with idempotency check
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      await db.subscriptions.upsert({
        where: { stripeCustomerId: session.customer as string },
        create: { stripeCustomerId: session.customer as string, status: 'ACTIVE' },
        update: { status: 'ACTIVE' }
      })
      break
    }
  }

  return Response.json({ received: true })
}`

  return (
    <div className="pt-32 pb-24 max-w-[1360px] mx-auto px-6 md:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Mehta Tech Open-Source Labs
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-4">
          Free production tools for{' '}
          <span className="text-gradient-accent">engineers & founders.</span>
        </h1>
        <p className="text-base sm:text-lg text-white/50 leading-relaxed">
          Open-source boilerplates, code scaffolders, and security builders engineered by our team to accelerate your product development.
        </p>
      </div>

      {/* Tool Selector */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {tools.map((t) => {
          const Icon = t.icon
          const isSelected = t.id === activeTool
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`px-5 py-3 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              <Icon size={14} />
              <span>{t.name}</span>
            </button>
          )
        })}
      </div>

      {/* Interactive Tool Playground Container */}
      <div className="rounded-3xl bg-[#090B12] border border-white/[0.1] p-6 sm:p-10 shadow-2xl shadow-black/80">
        
        {/* TOOL 1: Server Action Scaffolder */}
        {activeTool === 'server-action' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                Configure Action Parameters
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">Action Function Name</label>
                <input
                  type="text"
                  value={actionName}
                  onChange={(e) => setActionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">Prisma / Drizzle Model Name</label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">Cache Revalidation Tag</label>
                <input
                  type="text"
                  value={tagToRevalidate}
                  onChange={(e) => setTagToRevalidate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-xs text-white/55 space-y-1 font-mono">
                <div>✔ Zod schema runtime validation</div>
                <div>✔ Auth session check</div>
                <div>✔ Next.js 15 Server Cache invalidation</div>
              </div>
            </div>

            <div className="lg:col-span-8 rounded-2xl bg-[#06070B] border border-white/10 overflow-hidden">
              <div className="px-5 py-3 bg-black/60 border-b border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white/50">app/actions/{actionName}.ts</span>
                <button
                  onClick={() => handleCopy(generatedServerAction)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-mono transition-all"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-6 text-xs sm:text-sm font-mono text-white/80 overflow-x-auto leading-relaxed">
                <code>{generatedServerAction}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TOOL 2: Postgres RLS Builder */}
        {activeTool === 'postgres-rls' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                Configure RLS Parameters
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">Target Database Table</label>
                <input
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">Tenant ID Column</label>
                <input
                  type="text"
                  value={tenantColumn}
                  onChange={(e) => setTenantColumn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-xs text-white/55 space-y-1 font-mono">
                <div>✔ Strict JWT claims isolation</div>
                <div>✔ Multi-tenant data leakage prevention</div>
                <div>✔ Supabase & Vanilla PostgreSQL compatible</div>
              </div>
            </div>

            <div className="lg:col-span-8 rounded-2xl bg-[#06070B] border border-white/10 overflow-hidden">
              <div className="px-5 py-3 bg-black/60 border-b border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white/50">migrations/rls_policy_{tableName}.sql</span>
                <button
                  onClick={() => handleCopy(generatedPostgresRLS)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-mono transition-all"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre className="p-6 text-xs sm:text-sm font-mono text-white/80 overflow-x-auto leading-relaxed">
                <code>{generatedPostgresRLS}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TOOL 3: Stripe Webhook Scaffolder */}
        {activeTool === 'stripe-webhook' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                Webhook Architecture Specs
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Production-grade Next.js 15 App Router Route Handler with raw body verification, cryptographic HMAC signature matching, and database idempotency upserts.
              </p>
              <div className="pt-4 border-t border-white/[0.06] text-xs text-white/55 space-y-1 font-mono">
                <div>✔ Signature verification</div>
                <div>✔ Zero duplicate billing events</div>
                <div>✔ Type-safe Stripe TypeScript SDK</div>
              </div>
            </div>

            <div className="lg:col-span-8 rounded-2xl bg-[#06070B] border border-white/10 overflow-hidden">
              <div className="px-5 py-3 bg-black/60 border-b border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white/50">app/api/webhooks/stripe/route.ts</span>
                <button
                  onClick={() => handleCopy(generatedStripeWebhook)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-mono transition-all"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Handler'}</span>
                </button>
              </div>
              <pre className="p-6 text-xs sm:text-sm font-mono text-white/80 overflow-x-auto leading-relaxed">
                <code>{generatedStripeWebhook}</code>
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* Need Dedicated Engineering? */}
      <div className="mt-16 text-center p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
        <h2 className="text-2xl font-bold text-white mb-2">
          Want our team to build your complete production platform?
        </h2>
        <p className="text-xs sm:text-sm text-white/50 mb-6 max-w-lg mx-auto">
          We engineer full-stack web platforms, mobile apps, and SaaS platforms with fixed timelines.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all"
        >
          Book Architecture Discovery <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
