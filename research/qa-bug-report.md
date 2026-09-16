# Stage 3 (QA / Bug-finder) report — Pricing + FAQ restoration

Scope reviewed: uncommitted working-tree diff on top of `eb8117b` —
`app/page.tsx`, `components/pages/ContactPage.jsx`,
`components/pages/ServicesPage.jsx`, `lib/faqs.ts` (modified), plus new
`lib/pricing.ts`, `components/sections/Pricing.jsx`,
`components/sections/FAQ.jsx`. Verified independently against the running
app; changelog claims were not taken on trust.

## Lint (fresh run)

```
✖ 3081 problems (30 errors, 3051 warnings)
```

Identical to Stage 2's reported count. Confirmed via `grep` on the full lint
output that:
- All 30 errors are in files this diff did not touch (`components/ui/highlighter.tsx`,
  `lib/usePrefersReducedMotion.ts`, `components/CustomCursor.jsx`,
  `components/Preloader.jsx`).
- The only lint lines touching diffed files are pre-existing unused-import
  warnings in `ServicesPage.jsx`/`ContactPage.jsx` (`Sparkles`, `Layers`,
  `ShieldCheck`, `Send`) — unrelated to the pricing-field edits on those
  same lines.
- `FAQ.jsx`, `Pricing.jsx`, `lib/pricing.ts`, `lib/faqs.ts` produced **zero**
  lint output (no warnings, no errors).

**Result: PASS, no regressions.**

## Build (fresh run)

`npm run build` — compiled successfully in 4.3s, TypeScript clean, all 39
static/SSG pages generated, same route table as Stage 2 reported.

**Result: PASS.**

## Live app testing (dev server, port 3003, real browser via Playwright)

- **Homepage section order**: confirmed via DOM query —
  Hero → Stats → Services → **Pricing** → Portfolio → WhyUs → Products →
  **FAQ** → CTA → Footer. Matches spec (Pricing after Services, FAQ before
  CTA).
- **FAQ accordion**: real click interaction tested, not just DOM presence.
  Item 0 open by default. Clicked "How is pricing structured?" — it opened
  (`aria-expanded=true`) and all 9 others (including the previously-open
  item 0) closed. Single-open accordion behavior confirmed working, not
  just styled.
- **Pricing section**: exactly 4 tier cards rendered (`#pricing .grid > div`
  count = 4), prices read ₹9,999 / ₹19,999 / ₹32,999 / ₹75,000 in that
  order. "Most Popular" badge present only on the Business Website card.
  Enterprise banner ("Enterprise & SaaS") renders as a separate block below
  the grid, confirmed **not** part of the 4-card grid (5th `.grid > div`
  does not exist).
- **JSON-LD**: exactly one `"@type":"FAQPage"` script block in the rendered
  HTML. `localBusinessSchema` now contains `areaServed` with `"India"`;
  `serviceArea` does not appear anywhere in the HTML (0 matches). All three
  homepage `<script type="application/ld+json">` blocks (`websiteSchema`,
  `localBusinessSchema`, `faqSchema`) — and every other JSON-LD block
  site-wide — are `JSON.stringify()` over module-level static objects, with
  no request/user-supplied data anywhere in the interpolation. No XSS/
  injection concern.
- **/services**: distinct on-page prices are ₹9,999 (Website Development
  floor), ₹75,000 (Mobile App, matches Growth MVP ceiling), and the two
  untouched monthly retainers ₹30,000/mo and ₹25,000/mo — no contradiction
  with the 4 published tiers. Console: 0 errors.
- **/contact**: budget-bucket dropdown's lowest option now reads
  "₹9,999 – ₹50,000" (previously ₹20,000 floor). Console: 0 errors.
- **Mobile (375px width)**: no horizontal overflow (`document.documentElement.scrollWidth`
  370px ≤ 375px viewport), no element in `#pricing`/`#faq` exceeds viewport
  width. Screenshots of both sections confirm no clipped text; FAQ
  accordion remains tappable and legible at this width.
- **Console**: 0 errors and 0 warnings caused by this diff on `/`,
  `/services`, `/contact`. One pre-existing warning appears on all three
  (`sv-space-designs-live.jpg` LCP/`loading="eager"` suggestion, from
  `Portfolio.jsx`) — unrelated to this change, not introduced by it.
- **`prefers-reduced-motion`**: neither `FAQ.jsx` nor `Pricing.jsx` handles
  it directly, but the whole app is wrapped in `MotionConfig
  reducedMotion="user"` (`components/MotionProvider.jsx`), which is how
  every other `motion.div` on the site gets this behavior too — confirmed
  by grepping for other direct `usePrefersReducedMotion()` usage (none in
  `components/sections/`). Changelog's claim here checked out.
- **Pricing CTA links**: real routes, not dead `#` links. All 4 tier
  buttons go to `/contact?service=<TierName>&budget=<price>`, Enterprise
  banner goes to `/contact`. Confirmed via `href` inspection and by loading
  one of the URLs directly.

## Bug found: pre-filled "Service Focus" dropdown silently fails to match (not fixed — needs a content decision)

**Severity: Low–Medium (UX papercut, not data loss, not a blocker).**

**Repro**: Click "Start your landing page" (or any tier's CTA) on the
homepage Pricing section → lands on `/contact?service=Landing%20Page&budget=9999`.

**Observed**: The "Estimated Budget" dropdown correctly pre-selects
"₹9,999 – ₹50,000" (its `budgetToBucket()` numeric-snapping logic already
handled this). The "Service Focus" `<select>`, however, shows the
placeholder "Select a service category" instead of anything related to
"Landing Page" — because `ContactPage.jsx`'s `services` array (the
`<option>` list: "Website Development", "Software Development & API",
"Mobile App (iOS & Android)", etc.) has no option whose value is "Landing
Page", "Starter", "Business Website", or "Growth MVP" (the 4 tier names
`Pricing.jsx` passes as the `service` query param). React's controlled
`<select>` with a `value` that matches no `<option>` renders with nothing
visually selected.

Verified this is cosmetic, not a data bug: `form.service` state is still
correctly initialized to `"Landing Page"` from the query param and *is*
included in the JSON body POSTed to `/api/contact` on submit (`{ ...form,
subjectPrefix: ... }`) even though the dropdown looks unselected — so a
submission without the user touching that field still carries the right
value server-side. The risk is UX, not data: a user who glances at a
blank-looking dropdown after clicking a tier CTA may assume their choice
wasn't captured and manually pick a different, less accurate category,
overwriting the correct pre-fill.

**Why not fixed directly**: fixing this requires a content/product
decision this diff's scope doesn't cover — either add the 4 tier names as
new `<option>`s in `ContactPage.jsx`'s `services` list, or have
`Pricing.jsx` map each tier name to whichever existing service-category
option is the closest fit. Either choice changes user-facing copy/options
beyond a typo-level fix, so it's left for the next stage rather than
guessed at here.

## Minor documentation inaccuracies (not bugs, no fix needed)

- Stage 2's changelog and the Stage 1 spec both say `lib/faqs.ts` has "9"
  Q&As; it actually has **10** (`grep -c "^\s*q:" lib/faqs.ts` → 10, and all
  10 render on the homepage FAQ accordion and appear in the `FAQPage`
  `mainEntity`). Content is real either way — this is a miscount in the
  prose, not fabricated or missing content, and doesn't affect behavior.
- Stage 2's changelog says the post-build HTML spot-check found `₹9,999`
  "present exactly once." A fresh grep of the rendered HTML shows it 3
  times: once in the Pricing tier card, and twice more from the FAQ
  pricing-answer text (once in the visible DOM, once duplicated in Next.js's
  RSC flight/hydration payload embedded in the page). This is normal
  Next.js SSR+hydration duplication, not a bug — flagging only because the
  changelog's specific count claim doesn't hold up under a fresh check.

## Code review (code-review skill, medium effort, run against this diff)

Scoped to the uncommitted working-tree diff (new `Pricing.jsx`/`FAQ.jsx`,
`lib/pricing.ts`, `lib/faqs.ts` wiring, `ContactPage.jsx`/`ServicesPage.jsx`
pricing reconciliation) — the already-committed light-theme commit ahead of
`origin/main` was also scanned but is pure Tailwind class renames plus
removal of unverifiable metrics, nothing flagged there. Three findings:

1. **`components/pages/ServicesPage.jsx:25` — pricing/description mismatch,
   left open, Low–Medium severity.** The "Website Development" service now
   advertises `From ₹9,999` (`cheapestTier`, the 3–5-day single-page Landing
   Page tier with no CMS), but that same service entry's own deliverables
   list ("Figma Design System", headless CMS integration, SEO Architecture,
   3–6 week timeline) describes something closer to the ₹32,999 Business
   Website tier. Before this diff the line read the static `'From ₹20,000'`,
   which sat closer to that feature set. Stage 2's changelog documents this
   as a deliberate choice ("this service line covers the same
   landing-page-through-business-website range as the tiers, so its stated
   floor now matches the site's own cheapest published tier"), i.e. `From
   ₹9,999` is meant as a category floor, not a quote for the specific
   feature list shown next to it. That's a defensible reading, but it's
   also a real risk that a prospect reads the ₹9,999 next to a headless-CMS/
   Figma-system feature list and is quoted well below the intended actual
   price for that scope. Not fixed here — this is a copy/positioning
   decision (does the feature list need trimming, or does the price need a
   qualifier like "From ₹9,999 for a single page"?), not a code bug.
2. **`lib/pricing.ts:116` — `pricingSummary` reconstructs tier order/labels
   positionally, undermining its own anti-drift purpose. Low severity today
   (output is currently correct), flagged for awareness.** `pricingSummary`
   hand-indexes `pricingTiers[0]`/`[1]`/`[2]`/`[3]` with hand-written English
   labels ("single-page campaign sites", "starter brand websites", "full
   business websites", "full-stack web/mobile MVPs") tied to today's array
   order — unlike `cheapestTier`/`flagshipTier` in the same file, which
   derive generically (`pricingTiers[0]` / `pricingTiers[pricingTiers.length
   - 1]`). If a future edit reorders, inserts, or removes a tier in
   `pricingTiers`, this sentence will silently pair the wrong price with the
   wrong description — no type error, no lint warning — which is exactly
   the class of drift bug `lib/pricing.ts`'s own header comment says the
   file exists to prevent. Currently correct, so not a live bug, but worth
   a follow-up to key it off `tier.id` instead of array position.
3. **`lib/pricing.ts:110` — `formatINR` is exported but never called
   anywhere in the codebase. Trivial, no functional impact.** Dead export;
   left as-is since it's a plausible utility for future consumers of this
   "single source of truth" module and removing a public export isn't a
   typo-level fix.

## Security check (JSON-LD / dangerouslySetInnerHTML)

Explicitly checked per task instructions: grepped every
`dangerouslySetInnerHTML` in `app/` and `components/` (16 call sites
site-wide, 3 of them new/touched by this diff). Every single one wraps
`JSON.stringify()` over a module-level object built from static imports
(`lib/faqs.ts`, `lib/pricing.ts`, hardcoded schema literals) — none
interpolate `searchParams`, form input, cookies, or any other
request-scoped/user-supplied value. No XSS/injection issue introduced or
pre-existing in this area.

## Fixed directly

None required. No typos, missing imports, off-by-one errors, or dead
links were found in the diff.

## Left open for next stage

1. Pricing-CTA → Contact-form "Service Focus" dropdown mismatch (see bug
   above) — needs a product decision on the mapping/option list, Low–Medium
   severity, not data-losing.

## Verdict

**Ship-with-noted-issues.** Lint and build are clean with zero regressions,
every claim in Stage 2's changelog was independently verified against the
running app (section order, accordion interactivity, tier count/prices,
Enterprise banner not being a 5th card, JSON-LD correctness, cross-page
pricing consistency, mobile rendering, console cleanliness), and the JSON-LD
security check confirms no injection risk. The one real bug found (Service
Focus dropdown not reflecting the Pricing CTA's pre-fill) is a UX papercut
with no data-loss impact and a clear repro; it's appropriately left for the
next stage since fixing it means picking new option copy, which is outside
what a QA pass should decide unilaterally.
