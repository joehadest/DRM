import * as React from 'react'
import { motion } from 'framer-motion'

import { cn } from '../../lib/utils'

export type HeroProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  gradient?: boolean
  blur?: boolean
  backgroundImageSrc?: string
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      children,
      gradient = true,
      blur = true,
      backgroundImageSrc,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          /* ~1ª dobra: só o bloco principal visível; marquee fica abaixo */
          'relative isolate z-0 flex min-h-[calc(100svh-5.25rem)] w-full flex-col items-stretch justify-center overflow-hidden py-10 sm:py-12 lg:py-14',
          className,
        )}
        {...props}
      >
        {backgroundImageSrc ? (
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImageSrc}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[8%_center] saturate-110 contrast-110 sm:object-[14%_center] lg:object-[18%_center]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78)_42%,rgba(255,255,255,0.32)_72%,rgba(255,255,255,0.10))]" />
          </div>
        ) : null}

        {gradient && (
          <div className="absolute top-0 z-0 flex w-screen flex-1 items-start justify-center">
            {blur && (
              <div className="absolute top-0 z-10 h-44 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            <div className="absolute inset-auto z-10 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-drm-blue-500/35 opacity-80 blur-3xl" />

            <motion.div
              initial={{ width: '8rem' }}
              viewport={{ once: true }}
              transition={{ ease: 'easeInOut', delay: 0.25, duration: 0.8 }}
              whileInView={{ width: '16rem' }}
              className="absolute top-0 z-10 h-36 -translate-y-[20%] rounded-full bg-drm-blue-500/30 blur-2xl"
            />

            <motion.div
              initial={{ width: '14rem' }}
              viewport={{ once: true }}
              transition={{ ease: 'easeInOut', delay: 0.25, duration: 0.8 }}
              whileInView={{ width: '28rem' }}
              className="absolute inset-auto z-10 h-0.5 -translate-y-[-10%] bg-drm-yellow-500/50"
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{ ease: 'easeOut', delay: 0.1, duration: 0.55 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          {children ?? null}
        </motion.div>
      </section>
    )
  },
)
Hero.displayName = 'Hero'

export { Hero }
