import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '../../lib/utils'

export interface CircularTestimonial {
  quote: string
  name: string
  designation: string
  src: string
}

export interface CircularTestimonialsColors {
  name?: string
  designation?: string
  testimony?: string
  arrowBackground?: string
  arrowForeground?: string
  arrowHoverBackground?: string
}

export interface CircularTestimonialsFontSizes {
  name?: string
  designation?: string
  quote?: string
}

export interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[]
  autoplay?: boolean
  colors?: CircularTestimonialsColors
  fontSizes?: CircularTestimonialsFontSizes
  className?: string
}

function calculateGap(width: number) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86
  // Em telas menores (mobile/tablet) o gap acompanha a largura do container
  // para os cards laterais não invadirem o card central.
  if (width <= minWidth) return Math.max(34, Math.min(minGap, width * 0.12))
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) {
  const colorName = colors.name ?? '#0a0a0a'
  const colorDesignation = colors.designation ?? '#475569'
  const colorTestimony = colors.testimony ?? '#334155'
  const colorArrowBg = colors.arrowBackground ?? '#0b3f77'
  const colorArrowFg = colors.arrowForeground ?? '#ffffff'
  const colorArrowHoverBg = colors.arrowHoverBackground ?? '#0f6fa0'

  const fontSizeName = fontSizes.name ?? '1.5rem'
  const fontSizeDesignation = fontSizes.designation ?? '0.95rem'
  const fontSizeQuote = fontSizes.quote ?? '1.05rem'

  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials])
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  )

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!autoplay || testimonialsLength <= 1) return
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength)
    }, 5200)
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
    }
  }, [autoplay, testimonialsLength])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [testimonialsLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [testimonialsLength])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleNext, handlePrev])

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth)
    const isCompact = containerWidth < 640
    const maxStickUp = gap * (isCompact ? 0.5 : 0.8)
    const sideScale = isCompact ? 0.78 : 0.86
    const sideRotate = isCompact ? 10 : 15
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index
    const isRight = (activeIndex + 1) % testimonialsLength === index

    const base: React.CSSProperties = {
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      transformOrigin: 'center',
    }

    if (isActive) {
      return {
        ...base,
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
      }
    }
    if (isLeft) {
      return {
        ...base,
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(${sideRotate}deg)`,
      }
    }
    if (isRight) {
      return {
        ...base,
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(-${sideRotate}deg)`,
      }
    }
    return {
      ...base,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
    }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  if (!testimonialsLength) return null

  return (
    <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div
            ref={imageContainerRef}
            className="relative h-[18rem] w-full [perspective:1000px] sm:h-[22rem] md:h-[26rem]"
          >
            {testimonials.map((t, index) => (
              <img
                key={`${t.src}-${index}`}
                src={t.src}
                alt={t.name}
                className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-[0_18px_48px_-26px_rgba(2,6,23,0.55)]"
                style={getImageStyle(index)}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="flex h-full flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-black tracking-tight" style={{ color: colorName, fontSize: fontSizeName }}>
                  {activeTestimonial.name}
                </h3>
                <p className="mt-1 font-semibold" style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>
                  {activeTestimonial.designation}
                </p>
                <motion.p className="mt-6 leading-relaxed" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
                  {activeTestimonial.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={`${word}-${i}`}
                      initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1], delay: 0.02 * i }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-4 md:mt-0">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5"
                style={{
                  backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                  boxShadow: '0 10px 24px -16px rgba(2,6,23,0.45)',
                }}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5" color={colorArrowFg} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5"
                style={{
                  backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                  boxShadow: '0 10px 24px -16px rgba(2,6,23,0.45)',
                }}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Próximo"
              >
                <ArrowRight className="h-5 w-5" color={colorArrowFg} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

