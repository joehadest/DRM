import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import type { ProjectSlide } from '../../data/projects'
import { PROJECT_SLIDES } from '../../data/projects'
import { cn } from '../../lib/utils'

const AUTO_PLAY_MS = 4000
const ITEM_HEIGHT = 65
/** Breakpoint Tailwind `lg` — abaixo disso o carrossel fica em coluna (chips verticais). */
const SWIPE_DRAG_MAX_PX = 140
const SWIPE_COMMIT_PX = 52

function useSwipeEnabledMatch() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return enabled
}

function wrap(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export type FeatureCarouselProps = {
  items?: ProjectSlide[]
  className?: string
}

export function FeatureCarousel({
  items = PROJECT_SLIDES,
  className,
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  const len = items.length
  const currentIndex = ((step % len) + len) % len

  const next = useCallback(() => setStep((s) => s + 1), [])
  const prev = useCallback(() => setStep((s) => s - 1), [])
  const swipeEnabled = useSwipeEnabledMatch()

  useEffect(() => {
    if (paused || len <= 1) return
    const t = setInterval(next, AUTO_PLAY_MS)
    return () => clearInterval(t)
  }, [paused, next, len])

  const goToChip = (index: number) => {
    const diff = (index - currentIndex + len) % len
    if (diff > 0) setStep((s) => s + diff)
  }

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex
    let n = diff
    if (diff > len / 2) n -= len
    if (diff < -len / 2) n += len
    if (n === 0) return 'active'
    if (n === -1) return 'prev'
    if (n === 1) return 'next'
    return 'hidden'
  }

  if (len === 0) return null

  return (
    <div className={cn('mx-auto w-full max-w-7xl sm:px-2 md:p-6 lg:p-8', className)}>
      <div className="drm-card-interactive relative flex min-h-[480px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/10 sm:min-h-[520px] sm:rounded-[2rem] lg:aspect-video lg:min-h-0 lg:flex-row lg:rounded-[3rem]">
        {/* Lista vertical — DRM azul */}
        <div className="relative z-30 flex min-h-[260px] w-full flex-col items-start justify-center overflow-hidden bg-gradient-to-b from-drm-blue-800 to-drm-blue-950 px-5 py-8 sm:min-h-[300px] sm:px-6 sm:py-10 md:min-h-[380px] md:px-12 lg:h-full lg:w-[42%] lg:min-h-0 lg:py-12 lg:pl-14 lg:pr-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-14 bg-gradient-to-b from-drm-blue-800 via-drm-blue-800/90 to-transparent md:h-20 lg:h-16" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-14 bg-gradient-to-t from-drm-blue-950 via-drm-blue-950/90 to-transparent md:h-20 lg:h-16" />

          <div className="relative z-20 flex h-[min(360px,52vh)] w-full items-center justify-center sm:h-[min(420px,55vh)] lg:h-full lg:justify-start">
            {items.map((feature, index) => {
              const isActive = index === currentIndex
              const distance = index - currentIndex
              const wrapped = wrap(-(len / 2), len / 2, distance)

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: 'fit-content' }}
                  animate={{
                    y: wrapped * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrapped) * 0.22,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 88,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    onClick={() => goToChip(index)}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className={cn(
                      'group relative flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-all duration-500 sm:px-5 sm:py-3 md:gap-4 md:px-8 md:py-4 lg:px-7',
                      isActive
                        ? 'z-10 border-white bg-white text-drm-blue-800 shadow-lg'
                        : 'border-white/25 bg-transparent text-white/55 hover:border-white/45 hover:text-white',
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center transition-colors duration-500',
                        isActive ? 'text-drm-blue-800' : 'text-white/45',
                      )}
                    >
                      <feature.icon className="h-[18px] w-[18px] shrink-0" />
                    </div>
                    <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-tight sm:text-xs md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Painel visual */}
        <div className="relative flex min-h-[360px] flex-1 flex-col items-center justify-center overflow-hidden border-t border-slate-200/60 bg-slate-50 px-4 py-10 sm:min-h-[420px] sm:px-5 sm:py-12 md:min-h-[480px] md:px-10 lg:h-full lg:min-h-0 lg:border-l lg:border-t-0 lg:py-14">
          <motion.div
            className={cn(
              'relative flex aspect-[4/5] w-full max-w-[340px] items-center justify-center sm:max-w-[400px] md:max-w-[420px]',
              swipeEnabled && len > 1 && 'cursor-grab touch-pan-x active:cursor-grabbing',
            )}
            drag={swipeEnabled && len > 1 ? 'x' : false}
            dragConstraints={{ left: -SWIPE_DRAG_MAX_PX, right: SWIPE_DRAG_MAX_PX }}
            dragElastic={0.12}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 420, bounceDamping: 28 }}
            onDragStart={() => swipeEnabled && len > 1 && setPaused(true)}
            onDragEnd={(_, { offset }) => {
              if (!swipeEnabled || len <= 1) return
              setPaused(false)
              if (offset.x > SWIPE_COMMIT_PX) prev()
              else if (offset.x < -SWIPE_COMMIT_PX) next()
            }}
            aria-label={
              swipeEnabled && len > 1
                ? 'Arraste para os lados para trocar o projeto'
                : undefined
            }
          >
            {items.map((feature, index) => {
              const status = getCardStatus(index)
              const active = status === 'active'
              const isPrev = status === 'prev'
              const nextCard = status === 'next'
              const Icon = feature.icon

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: active ? 0 : isPrev ? -90 : nextCard ? 90 : 0,
                    scale: active ? 1 : isPrev || nextCard ? 0.88 : 0.72,
                    opacity: active ? 1 : isPrev || nextCard ? 0.45 : 0,
                    rotate: isPrev ? -2.5 : nextCard ? 2.5 : 0,
                    zIndex: active ? 20 : isPrev || nextCard ? 10 : 0,
                    pointerEvents: active ? 'auto' : 'none',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 26,
                    mass: 0.85,
                  }}
                  className="drm-card-interactive-motion absolute inset-0 origin-center overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-2xl md:rounded-[2.25rem] md:border-[10px]"
                >
                  {feature.image ? (
                    <img
                      src={feature.image}
                      alt=""
                      className={cn(
                        'h-full w-full object-cover transition-all duration-700',
                        active ? 'brightness-100' : 'brightness-[0.72] blur-[1px]',
                      )}
                    />
                  ) : (
                    <div
                      className={cn(
                        'flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-drm-blue-800/15 via-slate-100 to-drm-yellow-500/20 p-8',
                        !active && 'opacity-80',
                      )}
                    >
                      <div className="drm-card-interactive-sm rounded-2xl bg-white/90 p-5 shadow-lg ring-1 ring-slate-200/80">
                        <Icon className="h-14 w-14 text-drm-blue-800 md:h-16 md:w-16" />
                      </div>
                      <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Imagem do projeto (em breve)
                      </p>
                    </div>
                  )}

                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-drm-blue-950/95 via-drm-blue-950/45 to-transparent p-6 pt-24 sm:p-8 sm:pt-28 md:p-10 md:pt-32"
                      >
                        <div className="mb-3 w-fit rounded-full border border-white/25 bg-white/95 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-drm-blue-950 shadow-md">
                          {index + 1} · {feature.label.split('—')[0]?.trim()}
                        </div>
                        <p className="text-base font-medium leading-snug tracking-tight text-white drop-shadow-md sm:text-lg md:text-xl">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      'absolute left-6 top-6 flex items-center gap-2 transition-opacity duration-300 md:left-8 md:top-8',
                      active ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-drm-yellow-400 shadow-[0_0_12px_rgba(245,196,0,0.9)]" />
                    <span className="font-mono text-[10px] font-normal uppercase tracking-[0.28em] text-white/85">
                      DRM
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCarousel
