import * as React from 'react'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

export type HoverGradientNavItem = {
  label: string
  href: string
  icon: LucideIcon
  gradient?: string
  iconClassName?: string
}

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  hover: {
    opacity: 1,
    scale: 1.6,
    transition: {
      opacity: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: 'spring', stiffness: 260, damping: 22 },
    },
  },
}

const sharedTransition = {
  type: 'spring' as const,
  stiffness: 90,
  damping: 18,
}

const defaultGradient =
  'radial-gradient(circle, rgba(15,111,160,0.18) 0%, rgba(10,47,87,0.08) 52%, rgba(7,28,51,0) 100%)'

export function HoverGradientNavBar({
  items,
  className,
}: {
  items: HoverGradientNavItem[]
  className?: string
}): React.JSX.Element {
  return (
    <motion.nav
      className={cn(
        'px-2 py-1.5 rounded-full',
        'bg-white/10 backdrop-blur-xl',
        'border border-white/30 shadow-sm shadow-slate-900/10',
        className,
      )}
      initial="initial"
      whileHover="hover"
    >
      <ul className="flex items-center justify-center gap-1 sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon
          const gradient = item.gradient ?? defaultGradient
          return (
            <motion.li key={item.href} className="relative">
              <motion.div
                className="block rounded-full overflow-visible group relative"
                style={{ perspective: '650px' }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-full"
                  variants={glowVariants}
                  style={{ background: gradient, opacity: 0 }}
                />

                <motion.a
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'px-3 py-2 sm:px-4',
                    'relative z-10 rounded-full',
                    'text-slate-600 group-hover:text-slate-950 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drm-yellow-500/60',
                    'text-xs sm:text-sm font-semibold',
                  )}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom',
                  }}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 sm:h-[18px] sm:w-[18px] transition-colors duration-[480ms] ease-out',
                      item.iconClassName ?? 'group-hover:text-drm-blue-800',
                    )}
                  />
                  <span className="hidden md:inline">{item.label}</span>
                </motion.a>

                <motion.a
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'px-3 py-2 sm:px-4',
                    'absolute inset-0 z-10 rounded-full',
                    'text-slate-600 group-hover:text-slate-950 transition-colors',
                    'text-xs sm:text-sm font-semibold',
                  )}
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center top',
                    transform: 'rotateX(90deg)',
                  }}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 sm:h-[18px] sm:w-[18px] transition-colors duration-[480ms] ease-out',
                      item.iconClassName ?? 'group-hover:text-drm-blue-800',
                    )}
                  />
                  <span className="hidden md:inline">{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </motion.nav>
  )
}

