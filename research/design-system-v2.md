# Design System v2 — reference-driven rebuild (2026-09-22)

> **2026-11-05: palette and fonts superseded by official Brand Guidelines v1.0** (`design-references/brand/`). Token names unchanged; values are now Midnight/Cobalt/Cloud + Montserrat/Inter (see `app/globals.css`). Layout and motion principles here still apply.

## Why this doc exists, and why it supersedes `design-references/DESIGN_REFERENCES.md`

The v1 creative-score-loop (5 rounds, logged in `research/creative-score-log.md`) plateaued
at 77/100 with a blunt verdict: *"would not clear a 90+ Awwwards-style bar — the two-tone-
headline/icon-square vocabulary repeating across most of the site remains the single
highest-leverage lever, unaddressed on 5 of 7 page templates."* Score-loop rounds only ever
retired a handful of instances per pass (4 of 15 two-tone headlines, 2 of ~7 icon-square
cards by round 5) because the underlying *system* those instances were copy-pasted from was
never replaced — only patched.

Root cause, visible in hindsight: `design-references/DESIGN_REFERENCES.md` (the v1 grounding
doc) was itself a board of generic "AI SaaS hero" Pinterest/Dribbble screenshots — dark navy
backgrounds, vertical light beams, particle fields, pill badges, gradient headline text,
purple dome glows. That is close to a checklist of what `avoid-ai-design` hunts for. No
amount of score-loop polishing fixes a brief that was AI-slop from the source. **v1's
reference doc is retired. Do not pull direction from it or from any component/pattern it
describes (SpotlightCard glow, BorderBeam, ShinyText, liquid-glass-button, pill-badge-above-
headline, gradient/two-tone headline text as a default, icon-in-rounded-square as a default
card decoration).**

The client (Mehta's own manager) has now given a concrete, high-taste reference instead of a
vibe board: **composite.global** (a real NYC Webflow/UX agency site). This doc is the
Phase 0–4 synthesis from that reference (per the `reference-driven-design` skill), extracted
— not copied — into an original direction for `mehta-next`. Every implementation agent
working on this rebuild must read this file first and build from it, not from memory of the
old dark-mode system or from re-searching references independently.

**Confidence: HIGH** (concrete URL, screenshotted hero/services/work/testimonial/footer at
desktop width). Reference-driven-design's "extract, never copy" table applies literally:
take composite's layout principles, proportions, spacing rhythm, typography relationships,
interaction concepts, motion principles — never its logo, copy, or exact imagery. All copy,
stats, client names, and project images in the rebuild must be Mehta's own real content
already present in the codebase (`public/*.png`, `components/sections/Portfolio.jsx`'s real
project list, real Ahmedabad address/schema in `app/layout.tsx`). **Never fabricate** a
stat, testimonial, client logo, or claim — this is a hard, non-negotiable workspace rule
(see `research/client-notes.md`), unchanged by this rebuild.

## What composite.global actually does (synthesis, not transcription)

- **Base is warm and light, not dark-mode-by-default.** Cream/off-white background as the
  primary surface. A deep forest-green does double duty as (a) headline ink color on light
  sections and (b) the background of inverted dark sections (footer, one testimonial band) —
  one hue used two ways, which reads cohesive instead of "light theme + unrelated black
  footer bolted on" (which is what `mehta-next` currently has — `app/layout.tsx` still
  hardcodes `bg-[#07080C] text-white` on `<body>` from the old dark system, even though
  pages render light on top of it).
  Screenshot the plain color, no glow/blur, no particle field.
- **Single accent color, warm (coral/orange), used sparingly** — solid-fill primary CTA
  pills and small marks only. Not a gradient. Not blue. (`mehta-next`'s existing
  `blue-600` two-tone-headline habit is exactly the pattern to retire — pick a genuinely
  different accent family so the retirement is structural, not cosmetic.)
- **Headlines are not colored by formula.** Composite's headlines are single-color (the
  forest green ink) the large majority of the time. Color/weight emphasis, when used, is
  applied to a phrase because of what it means in that specific sentence, not as a template
  rule reapplied verbatim on every section. This is the single most important fix: the v1
  score log flagged "two-tone black+blue headline repeats 5-7 times per page, 7 times on the
  homepage alone" as the top-ranked unresolved issue for 3 straight rounds. **Default to a
  plain, single-color headline. Earn the exception per-section, don't apply it as a rule.**
- **Asymmetric hero composition.** Headline block, description+CTA block, and a floating
  secondary element (e.g. "All projects →" pill) are positioned as independent pieces, not
  stacked dead-center in one column. Generous whitespace is used deliberately, as negative
  space around distinct elements — not as "the page ran out of content" (which is closer to
  what `mehta-next`'s current homepage screenshot shows: huge empty gray bands between
  sections with nothing composed in them).
- **Section backgrounds alternate** (cream → white → light-gray → dark-forest-green → cream)
  to create rhythm across a single scroll, rather than the current flat white-white-gray-
  white-black pattern.
- **Work/case-study presentation is bespoke per item, not templated.** Each project card is
  full-bleed real photography or a real product screenshot, art-directed with *that client's
  own brand color* as the card's background/accent (a red block for an automotive brand, a
  green field photo for an infrastructure brand) — never a uniform white card with an
  icon-in-rounded-square. Tags are outlined pill chips overlaid on the image; stats (when
  real) are set directly into the photography, large, not in a separate stat-strip
  component. A horizontal-scroll carousel with manual prev/next circular arrow buttons is
  used for the case-study rail.
  `mehta-next` already has the real assets for this — `public/*.png` thumbnails and
  `components/sections/Portfolio.jsx`'s real project list (SV Space Designs, Prihaan Spices
  & Agro, The Silver Spoon/Argentum, CMJ Events) — the fix is presentation, not new content.
- **Button/affordance system, reused consistently**: solid pill primary (accent color),
  outlined pill secondary (ink-on-transparent or white-on-dark), and a small circular
  icon-only arrow button for "next/see more" affordances — three primitives, reused
  everywhere, not reinvented per section.
- **Real logo marquee, real single testimonial with name+title** — no invented stat
  carousels. `mehta-next` has a logo marquee already; keep the mechanism, restyle it.
- **Typography**: a display sans with real personality (rounded/geometric, not
  aggressive-black-weight) for headlines, sentence case, tight leading, large scale
  (headline ~56–88px desktop). `mehta-next` already loads Sora (`--font-syne` variable,
  confusingly named but it's Sora) for display and Inter for body — **keep these fonts,
  they're a fine match for this direction** — the fix is how they're used (weight, scale,
  color, no gradient-fill text), not which fonts are loaded.
- **Motion**: restrained scroll-reveal (fade + slight rise) per section, varied slightly by
  section type/stagger rather than the exact same single tween instance reused everywhere
  (v1 round 2 flagged this explicitly: "every section reuses one identical Framer Motion
  fade-in-up tween"). Hover lifts on cards/buttons. No particle/glow/blob motion.

## Design budget (reference-driven-design Phase 2 — do not exceed this)

1. **Primary visual idea**: warm editorial agency composition — cream/white base, forest-
   green ink (doing double duty as dark-section background too), one coral accent, asymmetric
   hero, alternating section backgrounds for rhythm.
2. **Signature interaction**: horizontal-scroll, manually-controlled case-study rail where
   each project card is bespoke art-directed (own accent color drawn loosely from that
   client's real brand/site, real screenshot, real name) — not a uniform grid.
3. **Supporting motion language**: section-varied scroll-reveal (fade+rise, staggered
   children, 2–3 distinct timing/offset presets rotated by section type, not one global
   tween) + hover lift on interactive surfaces. Respect `prefers-reduced-motion` (hook
   already exists at `lib/usePrefersReducedMotion.ts` — reuse it).
4. **Restrained primitives everywhere else**: the 3-button system above, outlined tag pills,
   plain surfaces. No new effect gets added unless it traces back to one of the 3 items
   above — this is the hard budget line from `reference-driven-design` Phase 2.

**Retire on sight, wherever encountered**: `components/ui/SpotlightCard.jsx`,
`components/ui/BorderBeam.jsx`, `components/ui/ShinyText.jsx`,
`components/ui/liquid-glass-button.tsx`, any pill-badge-above-headline, any gradient-fill
headline text, any icon-in-rounded-square used as a default card decoration, any repeated
stat-strip component reused verbatim between pages (v1 round 5 flagged Home/About sharing
one verbatim stat-strip as a generic-tell). Replace with the button/tag/card primitives
above. If a component file becomes fully unused after this, delete it rather than leaving
dead code.

## New token direction (implemented centrally in `app/globals.css` — do not reinvent per page)

- `--color-bg`: warm cream/off-white (replaces near-black `#07080C`)
- `--color-ink`: deep forest green (replaces flat `#000`/`neutral-900` for headlines, and
  replaces the dark-section black — one color, two jobs)
- `--color-accent`: warm coral/orange (replaces `blue-600`/`blue-*` family as *the* accent)
- Neutral warm grays for secondary text/borders (replace cool `neutral-*` where it reads
  cold against the new warm palette)
- `<body>` in `app/layout.tsx` and `viewport.themeColor` must be updated off the old
  `#07080C` dark default.

## Non-negotiables (apply to every implementation agent, every page)

1. **No fabrication.** Real copy, real project names/images/links, real Ahmedabad address,
   real schema data only. If a section's honest content is thin, present that honestly
   (composite's own "one real case study, confidently framed" pattern) — never pad with
   invented stats/testimonials/logos.
2. **Verify, don't assume.** Run lint/build after changes. For any scroll-triggered or
   interaction-driven motion, sample actual computed state at real scroll increments (per
   `creative-score-loop.md`'s mandatory-verification note) — a visual skim is not enough;
   this exact bug class (a fix that looks right on a skim but is broken underneath) has
   already bitten this project's history once (round 3's WhatsApp/clearance-guard defect).
3. **Stay in your file ownership lane** (assigned per-agent by the coordinator) to avoid
   merge collisions — if a shared file needs a change outside your lane, note it in your
   changelog instead of editing it.
4. **Fully responsive** — derive tablet/mobile from the design system extracted above, not
   by shrinking desktop pixel values.
