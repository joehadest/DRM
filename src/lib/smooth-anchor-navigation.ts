const SCROLL_DURATION_MS = 760

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getScrollMarginTopPx(el: HTMLElement): number {
  const v = getComputedStyle(el).scrollMarginTop
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 0
}

function getTargetScrollY(el: HTMLElement): number {
  const rect = el.getBoundingClientRect()
  return rect.top + window.scrollY - getScrollMarginTopPx(el)
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

function animateScrollTo(targetY: number, onDone: () => void): void {
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  )
  const clamped = Math.min(maxScroll, Math.max(0, targetY))
  const startY = window.scrollY
  const dist = clamped - startY

  if (prefersReducedMotion()) {
    window.scrollTo(0, clamped)
    onDone()
    return
  }

  if (Math.abs(dist) < 1.5) {
    onDone()
    return
  }

  const t0 = performance.now()

  function frame(now: number) {
    const elapsed = now - t0
    const t = Math.min(1, elapsed / SCROLL_DURATION_MS)
    const y = startY + dist * easeOutCubic(t)
    window.scrollTo(0, y)
    if (t < 1) {
      requestAnimationFrame(frame)
    } else {
      onDone()
    }
  }

  requestAnimationFrame(frame)
}

function pulseTarget(el: HTMLElement): void {
  if (prefersReducedMotion()) return
  el.classList.add('drm-anchor-pulse')
  window.setTimeout(() => {
    el.classList.remove('drm-anchor-pulse')
  }, 1000)
}

/**
 * Intercepta cliques em `a[href^="#"]` (âncoras na mesma página), anima o scroll
 * e aplica um breve realce no destino. Devolve função de cleanup.
 */
export function initSmoothAnchorNavigation(): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented) return
    if (e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    const el = e.target
    if (!(el instanceof Element)) return

    const anchor = el.closest('a')
    if (!anchor) return

    const hrefAttr = anchor.getAttribute('href')
    if (!hrefAttr || !hrefAttr.startsWith('#')) return
    if (hrefAttr === '#') return

    const id = decodeURIComponent(hrefAttr.slice(1))
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    e.preventDefault()

    const y = getTargetScrollY(target)
    animateScrollTo(y, () => {
      pulseTarget(target)
      history.pushState(null, '', hrefAttr)

      if (target instanceof HTMLElement) {
        const hadTabIndex = target.hasAttribute('tabindex')
        const prev = target.getAttribute('tabindex')
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
        if (!hadTabIndex) target.removeAttribute('tabindex')
        else if (prev !== null) target.setAttribute('tabindex', prev)
      }
    })
  }

  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
