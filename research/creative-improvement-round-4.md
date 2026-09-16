# Creative Improvement — Round 4

Implements the round-4 review's ranked top-5 items (items 1, 2, 4 fully; item 3 verified as
already-implemented; item 5 explicitly skipped, see rationale). Method: same as the review —
`npm run build && npm run start` on an isolated port (4175), Playwright/Chromium at 1440×900,
768×1024, and 375×812, with `document.documentElement.style.scrollBehavior = 'auto'` forced
before any scroll/interaction sampling. Colors were re-resolved from the computed `lab(...)`
serialization to canvas RGB rather than trusted by class name, matching the review's own method.

---

## Item 1 — Retire the two-tone headline as the default section-title component

Converted 4 of the highest-traffic instances named by the review to a single, consistent
"mono eyebrow (icon + uppercase blue label) + solid black headline" treatment — the same
recipe already used well on `/status` and `/work/[slug]`. No more black+blue split on these
titles.

| File | Section | Before | After |
|---|---|---|---|
| `components/sections/Services.jsx` | Home "Complete Digital Solutions" | `text-neutral-900` headline with `<span className="text-blue-600">For Your Business</span>` | Eyebrow `WHAT WE DO` (Layers icon) + solid `text-neutral-950` headline, 0 colored spans |
| `components/sections/WhyUs.jsx` | Home "Why Businesses Choose Us." | `<span className="text-blue-600">Us.</span>` on the sticky H2 | Eyebrow `WHY US` (ShieldCheck icon) + solid `text-neutral-950` headline, 0 colored spans |
| `components/pages/LocationsIndexPage.jsx` | Locations index page H1 | `glow-pill` badge + `<span className="text-blue-600">real local work.</span>` | Eyebrow `WHERE WE WORK` (MapPin icon, replacing the glow-pill) + solid `text-neutral-950` H1, 0 colored spans |
| `components/sections/Pricing.jsx` | Home "Fixed pricing. No surprise invoices." | `<span className="text-blue-600">No surprise invoices.</span>` | Eyebrow `PRICING` (Check icon) + solid `text-neutral-950` headline, 0 colored spans |

**Verification (production build, canvas-resolved RGB, not class names):**

```
servicesH2:  text="Complete Digital Solutions For Your Business", coloredSpans=0, color=rgb(10,10,10)
servicesEyebrow: color=rgb(21,93,252)   [same blue-600 the hero's "Customers." uses]
whyUsH2:     text="Why Businesses Choose Us.", coloredSpans=0, color=rgb(10,10,10)
whyUsEyebrow: color=rgb(21,93,252)
pricingH2:   text="Fixed pricing. No surprise invoices.", coloredSpans=0, color=rgb(10,10,10)
pricingEyebrow: color=rgb(21,93,252)
locationsH1: text="Remote-first delivery, real local work.", coloredSpans=0, color=rgb(10,10,10)
locationsEyebrow: color=rgb(21,93,252)

Regression check — homepage hero H1 (round 3's fix, should be untouched):
heroH1: text="Websites That Turn Visitors Into Customers.",
        coloredSpans=[{text:"Customers.", color:rgb(21,93,252)}]  ← still exactly 1 colored word
```

Confirmed visually at 1440px, 768px, and 375px (screenshots taken during the session) — eyebrow
+ icon sits above a fully solid-black headline on all four sections, no clipping or wrapping
issues at any width, and the homepage hero's own (already-restrained) single-colored-word
treatment is unaffected.

Not touched this round (explicitly out of scope per the review's "3-4 instances, not all 15+"
guidance): Home hero (already fixed round 3, kept as a legitimate "opener"), Portfolio
"Built For Amazing Businesses," FAQ "Questions we get before every project," Products/Vibo
section, About, Services, Work, and Solutions page H1s. These remain real, known debt for a
future round.

---

## Item 2 — Vary the icon-in-rounded-square card component

Differentiated the two instances the review named as easiest:

**Solutions' industry sidebar** (`components/pages/SolutionsPage.jsx`) — removed the per-row
`<Icon>` (Factory, FlaskConical, HardHat, etc.) entirely and replaced it with a mono numeral
(`01`–`08`), turning the nav into an explicit numbered list. The large `w-14 h-14 rounded-2xl
bg-blue-600` icon square in the right-hand detail panel is untouched (it's a single, prominent
element, not a repeated small-card pattern, so it wasn't part of the "5+ identical instances"
problem).

Verified live: `hasSquareIconDiv: false` for all three sampled sidebar buttons; each renders
its `01`/`02`/`03` numeral span correctly (screenshot confirms clean numbered-list rendering
at 1440px).

**Locations city feature cards** (`components/pages/LocationPage.jsx`, the `focusPoints` grid
on every `/locations/[city]` page) — removed the `w-9 h-9 rounded-lg bg-blue-50 border
border-blue-100` icon square (it held a purely decorative `CheckCircle2`, no unique information)
and replaced it with a thin top rule + mono index label (`01 / 03`, `02 / 03`, `03 / 03`),
matching the mono-label vocabulary already used elsewhere on the site (`/status`'s "What You
Can Expect", case-study category labels).

Verified live on `/locations/ahmedabad`: zero elements remain matching the
`bg-blue-50` + `border-blue-100` + `items-center` + `justify-center` icon-square selector;
`indexLabelsFound: ["01","02","03"]` confirms the new index labels render. Confirmed visually
at 375px and 768px (screenshots) — no layout breakage, cards remain legible with identical
information content.

Home service cards (`Services.jsx`) and Home's "Why Businesses Choose Us" list keep the
icon-square/bare-icon vocabulary unchanged — the review named Solutions' sidebar and city
cards specifically as the two to fix this round.

---

## Item 3 — Extend clip-wipe motion to the Locations accordion

**Finding: already implemented in the current source** — `components/pages/LocationsIndexPage.jsx`
already imports `clipWipe` from `lib/motionVariants.ts` (line 7) and applies it directly via
`variants={clipWipe}` on each row's `AnimatePresence` panel (line 69), identical to how
`SolutionsPage.jsx` applies it to the industry detail panel. The round-4 report's claim that
this was "still unaddressed" does not match the current source — no code change was needed,
but per the task's instruction to verify motion claims with real computed values rather than
trust the report, the mechanism was independently re-tested end to end in the production build:

**Enter (Ahmedabad → Surat, `#location-panel-surat`), sampled every ~40ms:**
```
t=40ms   clip-path: inset(0px 0px 70.76%)   opacity: 0.292
t=127ms  clip-path: inset(0px 0px 22.46%)   opacity: 0.775
t=247ms  clip-path: inset(0px 0px 3.07%)    opacity: 0.969
t=408ms  clip-path: inset(0px 0px 0.019%)   opacity: 0.9998
t=489ms  clip-path: inset(0px 0px 0%)       opacity: 1
```
This matches `clipWipe.animate`: `clipPath: inset(0 0 0% 0)`, `opacity: 1`, `duration: 0.45`,
easing `[0.22,1,0.36,1]` — fast initial movement, decelerating into place.

**Exit (Ahmedabad closing when Nadiad opens, `#location-panel-ahmedabad`):**
```
t=40ms   clip-path: inset(0px 0px 1.87%)    opacity: 0.981
t=124ms  clip-path: inset(0px 0px 23.42%)   opacity: 0.766
t=204ms  clip-path: inset(0px 0px 68.99%)   opacity: 0.310
t=284ms  REMOVED (unmounted)
```
This matches `clipWipe.exit`: `clipPath: inset(0 0 100% 0)`, `opacity: 0`, `duration: 0.25`,
`ease: 'easeIn'` — element unmounts once the exit tween completes, consistent with a ~250ms
exit duration.

Both enter and exit precisely reproduce the named `clipWipe` variant's numeric parameters
(duration and clip-path direction), not just a visually-similar effect — this is the same
object reference imported into both `SolutionsPage.jsx` and `LocationsIndexPage.jsx`, so the
two "swap" interactions are now confirmed to use literally the same motion signature. No
further code change was made for this item.

---

## Item 4 — Tone down the `/locations/[city]` H1 color

`components/pages/LocationPage.jsx`'s H1 previously colored the entire second line
(`<span className="text-blue-600">Website Development Agency.</span>`) solid blue. Reduced to
a single colored word, matching the homepage hero's round-3 restraint (only "Customers." is
blue there):

```diff
- Website Development <span className="text-blue-600">Agency.</span>   (before: whole phrase blue)
+ Website Development <span className="text-blue-600">Agency.</span>   (after: only "Agency." blue)
```

(The phrase already ends in "Agency." as its last word, so scoping the `<span>` to just that
word — instead of the full "Website Development Agency." line — was the entire fix; the rest
of the line is now the H1's base `text-neutral-950`.)

**Verification on `/locations/ahmedabad` (production build, canvas-resolved RGB):**
```
Before: coloredSpans = [{ text: "Website Development Agency.", color: rgb(21,93,252) }]
After:  coloredSpans = [{ text: "Agency.",                     color: rgb(21,93,252) }]
        h1BaseColor  = rgb(10,10,10)  (neutral-950, unchanged)
```
Confirmed visually at 375px, 768px, and 1440px — city name and "Website Development" now
render in solid black, only "Agency." carries the accent. Applies to all 5 city pages
(Ahmedabad, Surat, Nadiad, Mumbai, Gujarat) since they share the one `LocationPage` component.

---

## Item 5 — Copy-structure pass on city feature-card copy: **skipped**

Per the review's own stated priority ("lowest urgency... skip entirely if it would compromise
verification time on items 1-3"), this was not done. Reviewed `lib/locations.ts`'s five
`focusPoints` arrays directly: the underlying facts are already genuinely distinct per city
(catalog architecture for Surat's B2B trade, right-sized scope for Nadiad, remote-first
delivery for Mumbai, industrial B2B catalogs for the Gujarat rollup page, image-heavy
portfolios for Ahmedabad) — this is real content, not fabricated, and rewriting sentence
shapes across 15 copy blocks under time pressure risked introducing subtle factual drift or
eating into the verification budget for items 1-4, which the review explicitly weights higher.
No content changes were made to `lib/locations.ts` this round.

---

## Build/Lint status

```
npm run lint   →  0 errors, 28 warnings (all pre-existing, none in files touched this round)
npm run build  →  Compiled successfully; all 39 static pages + dynamic city/work routes generated cleanly
```

No debug `console.log` statements or scratch files were left in the repo. The production
server started for verification (port 4175) was stopped at the end of the session.

## Files changed
- `components/sections/Services.jsx`
- `components/sections/WhyUs.jsx`
- `components/sections/Pricing.jsx`
- `components/pages/LocationsIndexPage.jsx`
- `components/pages/LocationPage.jsx`
- `components/pages/SolutionsPage.jsx`
