'use client'
import { useState, useId } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Plus, ArrowRight } from 'lucide-react'

// Labs, rebuilt for design-system-v2 as an honest experiments list: three
// small client-side code generators, each a row you open to configure.
// No usage stats, stars or download counts are shown because none exist —
// the page says plainly what these are (starter code, generated in the
// browser, to be reviewed before shipping).
const tools = [
  {
    id: 'server-action',
    num: '01',
    name: 'Next.js 15 Server Action Scaffolder',
    tag: 'Frontend Architecture',
    blurb: 'Generates a typed Server Action with Zod validation, an auth check and cache revalidation.',
    checks: ['Zod schema runtime validation', 'Auth session check', 'Next.js server cache invalidation'],
  },
  {
    id: 'postgres-rls',
    num: '02',
    name: 'PostgreSQL Multi-Tenant RLS Policy Builder',
    tag: 'Database Security',
    blurb: 'Writes the row-level security policy that keeps one tenant from reading another tenant’s rows.',
    checks: ['Strict JWT claims isolation', 'Multi-tenant data leakage prevention', 'Supabase & vanilla PostgreSQL compatible'],
  },
  {
    id: 'stripe-webhook',
    num: '03',
    name: 'Stripe Webhook Route Handler Scaffolder',
    tag: 'Billing Systems',
    blurb: 'An App Router route handler with raw-body signature verification and an idempotent subscription upsert.',
    checks: ['Signature verification', 'Idempotent upsert on repeat events', 'Type-safe Stripe TypeScript SDK'],
  },
]

function Field({ label, value, onChange }) {
  const id = useId()
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/20 text-ink font-mono text-xs focus:outline-none focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/20"
      />
    </div>
  )
}

function CodePanel({ filename, code, copyLabel, copied, onCopy }) {
  return (
    <div className="rounded-2xl bg-ink-dim overflow-hidden min-w-0">
      <div className="px-4 sm:px-5 py-3 border-b border-white/10 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-white/70 truncate">{filename}</span>
        <button
          type="button"
          onClick={onCopy}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/25 text-white text-xs font-semibold hover:bg-white hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Copied' : copyLabel}</span>
        </button>
      </div>
      <pre className="p-5 sm:p-6 text-xs sm:text-[13px] font-mono text-white/85 overflow-x-auto leading-relaxed max-h-[520px]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function LabsPage() {
  const [openTool, setOpenTool] = useState('server-action')

  // Tool 1 State: Server Action
  const [actionName, setActionName] = useState('createOrganization')
  const [modelName, setModelName] = useState('Organization')
  const [tagToRevalidate, setTagToRevalidate] = useState('org-settings')

  // Tool 2 State: Postgres RLS
  const [tableName, setTableName] = useState('invoices')
  const [tenantColumn, setTenantColumn] = useState('tenant_id')

  // Copy feedback (per tool, so one row's "Copied" doesn't leak to another)
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500)
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
  const sig = (await headers()).get('stripe-signature')

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

  const panels = {
    'server-action': {
      fields: [
        { label: 'Action function name', value: actionName, onChange: setActionName },
        { label: 'Prisma / Drizzle model name', value: modelName, onChange: setModelName },
        { label: 'Cache revalidation tag', value: tagToRevalidate, onChange: setTagToRevalidate },
      ],
      filename: `app/actions/${actionName}.ts`,
      code: generatedServerAction,
      copyLabel: 'Copy code',
    },
    'postgres-rls': {
      fields: [
        { label: 'Target database table', value: tableName, onChange: setTableName },
        { label: 'Tenant ID column', value: tenantColumn, onChange: setTenantColumn },
      ],
      filename: `migrations/rls_policy_${tableName}.sql`,
      code: generatedPostgresRLS,
      copyLabel: 'Copy SQL',
    },
    'stripe-webhook': {
      fields: [],
      filename: 'app/api/webhooks/stripe/route.ts',
      code: generatedStripeWebhook,
      copyLabel: 'Copy handler',
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero — cream, compact: the experiments are the point */}
      <section className="bg-cream pt-32 sm:pt-40 pb-14 sm:pb-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-ink/55 mb-5">Mehta Tech Labs</div>
            <h1 className="font-display text-[40px] sm:text-6xl font-extrabold text-ink tracking-tight leading-[1.05] mb-6">
              Small, free tools for engineers and founders.
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              Three code generators built by our team. Fill in a few names and they write starter code right in your
              browser — nothing you type is sent anywhere. Treat the output as a starting point and review it before you ship.
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-9 grid grid-cols-3 lg:grid-cols-1 border-t border-border"
          >
            {[
              ['Experiments', String(tools.length)],
              ['Runs', 'In your browser'],
              ['Cost', 'Free'],
            ].map(([k, v]) => (
              <div key={k} className="py-3 lg:flex lg:items-baseline lg:justify-between lg:border-b lg:border-border pr-3 lg:pr-0">
                <dt className="text-[11px] font-mono uppercase tracking-wider text-ink/55">{k}</dt>
                <dd className="text-sm font-semibold text-ink mt-1 lg:mt-0">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Experiments list — white */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <ol className="border-t border-border">
            {tools.map((t, i) => {
              const isOpen = openTool === t.id
              const panel = panels[t.id]
              const panelId = `lab-panel-${t.id}`
              return (
                <motion.li
                  key={t.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border"
                >
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenTool(isOpen ? null : t.id)}
                      className="group w-full text-left grid grid-cols-[auto_1fr_auto] items-start sm:items-center gap-4 sm:gap-8 py-6 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
                    >
                      <span className="text-xs font-mono text-ink/55 pt-1 sm:pt-0">Lab {t.num}</span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1.5">
                          <span className="font-display text-lg sm:text-2xl font-extrabold text-ink tracking-tight leading-tight">
                            {t.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full border border-ink/15 text-[11px] font-medium text-ink/75">
                            {t.tag}
                          </span>
                        </span>
                        <span className="block text-sm text-ink-soft leading-relaxed max-w-2xl">{t.blurb}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-ink border-ink text-white rotate-45'
                            : 'border-ink/20 text-ink group-hover:border-ink/50'
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </h2>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 sm:pb-10">
                          <div className="lg:col-span-4 rounded-2xl bg-cream p-5 sm:p-6 space-y-4 self-start">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-ink/60">
                              {panel.fields.length ? 'Configure' : 'What it does'}
                            </div>
                            {panel.fields.map((f) => (
                              <Field key={f.label} {...f} />
                            ))}
                            <ul className="pt-4 border-t border-border space-y-2">
                              {t.checks.map((c) => (
                                <li key={c} className="flex gap-3 text-xs text-ink/80 leading-relaxed">
                                  <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="lg:col-span-8 min-w-0">
                            <CodePanel
                              filename={panel.filename}
                              code={panel.code}
                              copyLabel={panel.copyLabel}
                              copied={copiedId === t.id}
                              onCopy={() => handleCopy(t.id, panel.code)}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Closing — ink band */}
      <section className="bg-ink text-white">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-16 sm:py-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Want our team to build your complete production platform?
            </h2>
            <p className="text-base text-white/75 leading-relaxed">
              We engineer full-stack web platforms, mobile apps, and SaaS platforms with fixed timelines.
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start lg:self-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-7 py-3.5 text-sm hover:bg-accent-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book architecture discovery <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
