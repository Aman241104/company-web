'use client'
import { useEffect, RefObject } from 'react'

const DEFAULT_BREAKPOINT = 768 // matches Tailwind `md`
const DEFAULT_FALLBACK = 90 // sane guess before the publisher's first paint

/**
 * Guards a set of block-level elements from ever visually landing under a
 * fixed, bottom-anchored element (the mobile dock, the floating WhatsApp
 * button) on initial render, at any mobile viewport height — AND while the
 * user scrolls.
 *
 * Why this can't be a fixed pixel margin: the fixed element's footprint is
 * constant *measured from the bottom of the viewport*, but slides up/down in
 * document-space as viewport height changes — a static margin tuned for one
 * device lands a block squarely under the button on another. The only
 * robust fix is to read the publisher's real rendered size (via the CSS
 * custom property it publishes through a ResizeObserver — see
 * `FloatingWhatsApp.jsx` / `MobileDock.jsx`) and the actual viewport height
 * at runtime, then nudge any block that would land in the danger band just
 * past the bottom of the viewport, where it's below the fold rather than
 * hidden behind the button.
 *
 * Why this needs a scroll listener (round 3 finding): a block sitting in
 * normal document flow moves through viewport-space as the page scrolls, so
 * a correction computed once at mount only holds for the scroll position it
 * was computed at. A fixed WhatsApp button/dock occupies a constant band
 * *in viewport coordinates*, and any scrolling content will eventually pass
 * through that band unless the check re-runs continuously. Mount + resize +
 * orientationchange alone cannot catch this — scrolling is the one event
 * the original bug is about, so this hook re-applies the same clearance
 * check on every scroll frame (passive listener, rAF-throttled) as well.
 *
 * `cssVarName` accepts either one clearance variable or an array of them
 * (e.g. both `--whatsapp-clearance` and `--mobile-dock-clearance`, when a
 * block can be covered by either fixed element independently) — the danger
 * zone used is the tallest (most restrictive) of all provided clearances.
 *
 * `deps` lets a caller force an immediate re-check when something other
 * than mount/resize/scroll changes an element's layout (e.g. an accordion
 * panel toggling open/closed) instead of waiting for the next scroll event.
 *
 * Generalized from the per-field guard `ContactPage.jsx` already ran against
 * `--mobile-dock-clearance` — reused here (and by any future caller) against
 * whichever clearance variable(s) it's pointed at.
 */
export function useClearanceGuard(
  cssVarName: string | string[],
  refs: RefObject<HTMLElement | null>[],
  options: { breakpoint?: number; fallback?: number } = {},
  deps: unknown[] = []
) {
  const { breakpoint = DEFAULT_BREAKPOINT, fallback = DEFAULT_FALLBACK } = options
  const cssVarNames = Array.isArray(cssVarName) ? cssVarName : [cssVarName]

  useEffect(() => {
    const applyClearance = () => {
      refs.forEach((ref) => {
        if (ref.current) ref.current.style.marginTop = ''
      })

      if (typeof window === 'undefined' || window.innerWidth >= breakpoint) return

      const clearance = cssVarNames.reduce((max, name) => {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
        const value = parseFloat(raw)
        return Number.isFinite(value) ? Math.max(max, value) : max
      }, 0) || fallback
      const dangerZoneTop = window.innerHeight - clearance

      refs.forEach((ref) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        // Require a meaningful overlap (not a sub-pixel graze) before
        // correcting — a fraction-of-a-pixel touch of the danger zone
        // shouldn't trigger a full push-past-the-viewport correction.
        const overlap = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, dangerZoneTop)
        const wouldBeCovered = rect.top < window.innerHeight && overlap > 16
        if (wouldBeCovered) {
          const push = Math.ceil(window.innerHeight - rect.top) + 14
          el.style.marginTop = `${push}px`
        }
      })
    }

    applyClearance()
    // Re-check shortly after mount in case fonts/images reflowed content
    // after the first pass, and whenever the viewport itself changes.
    const settleTimer = setTimeout(applyClearance, 350)

    // Re-check continuously while scrolling — passive + rAF-throttled so it
    // never blocks the scroll thread, but still catches a fixed-vs-scrolling
    // overlap that only exists transiently mid-scroll.
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        applyClearance()
        ticking = false
      })
    }

    window.addEventListener('resize', applyClearance)
    window.addEventListener('orientationchange', applyClearance)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener('resize', applyClearance)
      window.removeEventListener('orientationchange', applyClearance)
      window.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refs, ...deps])
}
