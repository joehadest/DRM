import { useEffect, useMemo, useState } from 'react'

export function useInView<T extends Element>(options?: {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}) {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)

  const opts = useMemo(
    () => ({
      rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      threshold: options?.threshold ?? 0.12,
      once: options?.once ?? true,
    }),
    [options?.rootMargin, options?.threshold, options?.once],
  )

  useEffect(() => {
    if (!node) return
    if (typeof window === 'undefined') return

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reduceMotion) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (entry.isIntersecting) {
        setInView(true)
        if (opts.once) observer.disconnect()
      } else if (!opts.once) {
        setInView(false)
      }
    }, opts)

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, opts])

  return { ref: setNode, inView }
}

