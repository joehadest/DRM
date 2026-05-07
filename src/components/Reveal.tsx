import type { ReactNode } from 'react'
import { useInView } from '../lib/useInView'

export function Reveal({
  children,
  className = '',
  delayMs = 0,
  y = 10,
  once = true,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
  y?: number
  once?: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.14,
  })

  return (
    <div
      ref={ref}
      className={[
        'will-change-transform',
        'transition-[opacity,transform,filter] duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 blur-[2px]',
        className,
      ].join(' ')}
      style={{
        transform: inView ? undefined : `translateY(${y}px)`,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  )
}

