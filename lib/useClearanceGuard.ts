'use client'
import { useEffect, RefObject } from 'react'

const DEFAULT_BREAKPOINT = 768 // matches Tailwind `md`
const DEFAULT_FALLBACK = 90 // sane guess before the publisher's first paint

/**
 * Guards a set of block-level elements from ever visually landing under a
 * fixed, bottom-anchored element (the mobile dock, the floating WhatsApp
 * button) on initial render, at any mobile viewport height.
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
 * Generalized from the per-field guard `ContactPage.jsx` already ran against
 * `--mobile-dock-clearance` — reused here (and by any future caller) against
 * whichever clearance variable it's pointed at.
 */
export function useClearanceGuard(
  cssVarName: string,
  refs: RefObject<HTMLElement | null>[],
  options: { breakpoint?: number; fallback?: number } = {}
) {
  const { breakpoint = DEFAULT_BREAKPOINT, fallback = DEFAULT_FALLBACK } = options

  useEffect(() => {
    const applyClearance = () => {
      refs.forEach((ref) => {
        if (ref.current) ref.current.style.marginTop = ''
      })

      if (typeof window === 'undefined' || window.innerWidth >= breakpoint) return

      const clearanceRaw = getComputedStyle(document.documentElement)
        .getPropertyValue(cssVarName)
        .trim()
      const clearance = parseFloat(clearanceRaw) || fallback
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
    window.addEventListener('resize', applyClearance)
    window.addEventListener('orientationchange', applyClearance)
    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener('resize', applyClearance)
      window.removeEventListener('orientationchange', applyClearance)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs)
}
