# Stage 2 (Developer) changelog — Zan benchmark gaps

Implements the 4 in-scope gaps from `research/build-spec-zan-benchmark.md`.
Gap 5 (trust-bar on-time %/SLA) is explicitly out of scope and was not
touched, per the spec.

## Files touched

- **`lib/pricing.ts`** (new) — single source of truth for pricing. Exports
  `pricingTiers` (the 4 confirmed tiers: Landing Page ₹9,999 / Starter
  ₹19,999 / Business Website ₹32,999 / Growth MVP ₹75,000), `enterpriseTier`
  (name/desc/timeline for the CTA-banner mention, no price — it's
  custom-scoped), `cheapestTier`/`flagshipTier` convenience exports, a
  `formatINR` helper, and `pricingSummary` — a generated sentence used by the
  FAQ pricing answer so the two can never drift. Follows the plain
  (non-`'use client'`) typed-data convention of `lib/faqs.ts`/`lib/locations.ts`.

- **`lib/faqs.ts`** (modified) — the pricing FAQ answer (`'How is pricing
  structured?'`) now imports and uses `pricingSummary` from `lib/pricing.ts`
  instead of a hardcoded string with its own copy of the four numbers.

- **`components/sections/FAQ.jsx`** (new) — rebuilt accordion FAQ section,
  `'use client'`, renders all 9 Q&As from `lib/faqs.ts`. Re-themed from the
  old dark-theme version (last existed at commit `eb8117b^`) to the site's
  current light theme: white/neutral-50 backgrounds, `neutral-900`/`blue-600`
  text, `neutral-200` borders — matched against `Services.jsx`/`Stats.jsx`
  since `design-references/DESIGN_REFERENCES.md` still documents the old dark
  hero references and predates the light-theme conversion. Same
  accordion/motion mechanics as the deleted version (single-open accordion,
  height/opacity `AnimatePresence` transitions, `prefers-reduced-motion`
  handled the same way the rest of the site's `motion.div`s are).

- **`components/sections/Pricing.jsx`** (new) — rebuilt 4-tier pricing grid,
  `'use client'`, reads tier data from `lib/pricing.ts`. Card visual language
  (rounded-2xl, `neutral-200` borders, blue-600 accent, `Check` bullet list,
  "Most Popular" badge on Business Website) matches `Services.jsx`. Enterprise
  is a CTA banner below the grid (not a 5th card) using the same
  bordered-banner-with-inline-CTA structure `CTA.jsx` and the pre-deletion
  Pricing.jsx used for its enterprise row, re-themed light.

- **`app/page.tsx`** (modified):
  - Added `Pricing` import + render, positioned after `Services` (per spec).
  - Added `FAQ` import + render, positioned before `CTA` (per spec).
  - Added `faqSchema` object built by mapping `lib/faqs.ts`'s `faqs` array
    into `FAQPage`/`Question`/`Answer` shape, exactly mirroring how
    `app/locations/[city]/page.tsx` builds its per-city `FAQPage` schema from
    `location.faqs`. Injected via a third
    `<script type="application/ld+json" dangerouslySetInnerHTML={...}>` tag,
    alongside the existing `websiteSchema`/`localBusinessSchema` tags.
  - Fixed `localBusinessSchema.serviceArea` → `areaServed` (same value,
    `{ "@type": "Country", name: "India" }`) — `serviceArea` was removed
    entirely rather than kept alongside `areaServed`, since the spec's
    stated reason for the fix (schema.org/Google reference the latter for
    `ProfessionalService` coverage area) means keeping both would just
    reintroduce an unused/incorrect property.

- **`components/pages/ServicesPage.jsx`** (modified) — reconciled two of the
  six per-service `pricing:` fields that contradicted the published tiers:
  - `Website Development`: `'From ₹20,000'` → `` `From ${cheapestTier.priceLabel}` `` (₹9,999) —
    this service line covers the same landing-page-through-business-website
    range as the tiers, so its stated floor now matches the site's own
    cheapest published tier instead of implying a higher minimum.
  - `Mobile App Development`: `'From ₹75,000'` → `` `From ${flagshipTier.priceLabel}` `` —
    already numerically identical to the Growth MVP tier (which explicitly
    covers "React Native mobile app"), now sourced from `lib/pricing.ts`
    instead of being a second hardcoded copy of the same number.
  - Left `Performance Marketing` (`'From ₹30,000/mo'`) and `Technical SEO`
    (`'From ₹25,000/mo'`) untouched — these are monthly retainer prices for
    a genuinely different engagement model (ongoing service, not a one-time
    project milestone), so they don't contradict the project-based tiers and
    aren't part of the 4 confirmed tiers.
  - Left `Backend Systems & API Architecture` and `Custom Software
    Development` at `'Custom Quote'` — consistent with the Enterprise/SaaS
    banner being custom-scoped, no number to reconcile.

- **`components/pages/ContactPage.jsx`** (modified) — the budget-bucket
  selector is a genuinely different concept (a broad intake range, not a
  price list) so it was kept per the spec's guidance, but its lowest bucket
  previously read `'₹20,000 – ₹50,000'`, which implied a ₹20k minimum spend
  when the site's own cheapest published tier is ₹9,999 — a prospect
  wanting the ₹9,999 Landing Page had no honest bucket to select. Changed the
  lower bound to read from `lib/pricing.ts`'s `cheapestTier.priceLabel`:
  `` `${cheapestTier.priceLabel} – ₹50,000` `` (renders as `'₹9,999 –
  ₹50,000'`). `budgetToBucket()`'s numeric-snapping logic (`<= 50000` →
  bucket 0, etc.) was untouched since it already correctly routes a 9999
  value into this bucket — only the display label was misleading.

## Deviations from spec, and why

1. **No interactive scope/cost calculator in the rebuilt `Pricing.jsx`.**
   The pre-deletion version had a "Configure Custom Scope" calculator with
   its own hardcoded `projectTypes`/`addOnOptions` price list (e.g.
   e-commerce ₹45,000, mobile app ₹85,000, SaaS/ERP ₹140,000, various
   add-on prices) that overlaps with but isn't identical to the 4 confirmed
   tiers. The spec's gap 2 and gap 4 only ask for the 4 confirmed tiers plus
   an Enterprise CTA banner — rebuilding the calculator would reintroduce a
   second, uncoordinated set of hardcoded prices the same day gap 4 is
   explicitly trying to eliminate duplicate pricing sources, and none of
   those extra figures were confirmed by Aman on 2026-09-15. Scoped this
   down to the 4-tier grid + banner only, matching the letter of gaps 2/4.
   Flagging for Aman: if the calculator is wanted back, its price list needs
   the same confirm-then-`lib/pricing.ts` treatment as the 4 tiers got.

2. **`serviceArea` removed rather than kept alongside `areaServed`.** The
   spec offered this as an option ("or add `areaServed` alongside if
   `serviceArea` is kept for compatibility"). Removed it instead, since
   nothing in the codebase or any known integration reads `serviceArea` off
   this object, and the spec's own reasoning was that `serviceArea` was the
   wrong property for this use case in the first place — keeping a
   known-wrong property "for compatibility" with nothing wouldn't add value.

3. **FAQ/Pricing re-themed light rather than restored verbatim.** The spec
   says "don't invent a new shape" for the FAQ schema (followed exactly —
   schema shape is untouched) but doesn't dictate pixel-for-pixel visual
   restoration of the deleted dark-theme components, and the
   09-12 site-wide light-theme conversion (`eb8117b`) would make a literal
   dark-theme restoration visually inconsistent with every other current
   section. Rebuilt both components using `Services.jsx`/`Stats.jsx`/
   `ServicesPage.jsx` as the live light-theme reference per the task
   instructions, keeping content, data wiring, and interaction patterns
   (accordion behavior, card grid + CTA banner) equivalent to the originals.

No other deviations. No new client logos, testimonials, stats, or
capability claims were added anywhere.

## Lint

`npm run lint` — baseline (stashed, pre-existing on `main` at `eb8117b`) and
post-change run both report:

```
✖ 3081 problems (30 errors, 3051 warnings)
```

Identical count before and after this stage's changes (verified via
`git stash` / `git stash pop` around the lint run). All 30 pre-existing
errors are in files this stage did not touch (`components/ui/highlighter.tsx`,
`lib/usePrefersReducedMotion.ts`, and others under `components/ui/`) and
predate this work. None of the new/modified files
(`FAQ.jsx`, `Pricing.jsx`, `lib/pricing.ts`, `lib/faqs.ts`, `app/page.tsx`,
`ServicesPage.jsx`, `ContactPage.jsx`) introduced new errors; the only
lint output touching them is pre-existing unused-import warnings in
`ServicesPage.jsx`/`ContactPage.jsx` for icons unrelated to this change
(`Sparkles`, `Layers`, `Send`, `ShieldCheck`, `Building2`).

**Result: PASS (no regressions).**

## Build

`npm run build` output:

```
▲ Next.js 16.2.9 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
✓ Compiled successfully in 4.4s
  Running TypeScript ...
  Finished TypeScript in 6.0s ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/39) ...
  Generating static pages using 15 workers (9/39)
  Generating static pages using 15 workers (19/39)
  Generating static pages using 15 workers (29/39)
✓ Generating static pages using 15 workers (39/39) in 734ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/contact
├ ○ /contact
├ ○ /labs
├ ○ /locations
├ ● /locations/[city]
│ ├ /locations/ahmedabad
│ ├ /locations/surat
│ ├ /locations/nadiad
│ └ [+2 more paths]
├ ○ /privacy
├ ○ /robots.txt
├ ○ /services
├ ○ /sitemap.xml
├ ○ /solutions
├ ○ /status
├ ○ /terms
├ ○ /work
└ ● /work/[slug]
  ├ /work/sv-space-designs
  ├ /work/prihaan-spices
  ├ /work/silver-spoon
  └ [+14 more paths]
```

**Result: PASS.** No TypeScript errors, all 39 static/SSG pages generated
successfully, `/` compiles clean.

Post-build spot-check of the prerendered homepage HTML confirmed: `FAQPage`
string present (new JSON-LD script), `areaServed` present (rename landed,
`serviceArea` gone), `"Fixed pricing"` heading text present (Pricing section
rendering), `"Questions we get"` heading text present (FAQ section
rendering), and `₹9,999` present exactly once (the Landing Page tier price,
sourced from `lib/pricing.ts`).
