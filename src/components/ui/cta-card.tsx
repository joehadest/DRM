import * as React from 'react'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from './button'
import { Input } from './input'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 16 },
  },
}

export function HeroGlassPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 backdrop-blur-xl md:p-8',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_22px_50px_-30px_rgba(7,28,51,0.35)]',
        'ring-1 ring-slate-200/70 ring-offset-2 ring-offset-white/35',
        'transition-[transform,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:shadow-[0_28px_64px_-32px_rgba(7,28,51,0.38)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-drm-yellow-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-drm-blue-500/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[-40%] top-[-60%] h-44 bg-gradient-to-b from-white/65 to-transparent opacity-70 transition-opacity duration-[600ms] ease-out group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

export function HeroAnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export function HeroMiniHighlightList({
  items,
}: {
  items: readonly string[]
}) {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      className="mt-6 grid gap-3 text-sm font-medium text-slate-800 sm:grid-cols-2"
    >
      {items.map((text) => (
        <motion.li
          key={text}
          variants={listItemVariants}
          className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white/95 via-white to-slate-50/90 px-4 py-3.5 shadow-sm shadow-slate-900/5 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-[480ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-px hover:border-drm-blue-500/30 hover:shadow-md hover:shadow-slate-900/8"
        >
          {text}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string
  title: string
  description: string
  inputPlaceholder?: string
  buttonText: string
  onLeadSubmit?: (email: string) => void
  variant?: 'glass' | 'dark'
}

const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  (
    {
      className,
      imageSrc,
      title,
      description,
      inputPlaceholder = 'Seu e-mail',
      buttonText,
      onLeadSubmit,
      variant = 'glass',
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = React.useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (onLeadSubmit) {
        onLeadSubmit(email)
      }
    }

    const isGlass = variant === 'glass'

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-3xl shadow-lg shadow-slate-900/15',
          isGlass ? 'border border-slate-200/80 bg-white/80 backdrop-blur-xl' : '',
          className,
        )}
        {...props}
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
              aria-hidden="true"
            />
            {!isGlass ? (
              <div className="absolute inset-0 bg-drm-blue-950/92" aria-hidden />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/55 to-transparent" />
            )}
          </>
        ) : null}

        <motion.div
          className={cn(
            'relative z-10 grid h-full grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:p-11 lg:p-14',
            !imageSrc && isGlass ? 'rounded-3xl' : '',
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <div
            className={cn(
              'flex flex-col items-start text-left',
              !isGlass ? 'text-white' : 'text-slate-950',
            )}
          >
            <motion.h2
              variants={itemVariants}
              className={cn(
                'text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.65rem]',
                !isGlass ? 'drop-shadow-sm' : 'text-drm-blue-950',
              )}
            >
              {title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className={cn(
                'mt-4 max-w-xl text-base leading-relaxed md:text-lg',
                !isGlass ? 'text-slate-200' : 'text-slate-600',
              )}
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            className="flex w-full max-w-md flex-col items-stretch gap-4 justify-self-start md:justify-self-end"
            variants={itemVariants}
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <Input
                type="email"
                placeholder={inputPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={inputPlaceholder}
                required
                className={cn(isGlass ? 'bg-white sm:flex-1' : 'flex-1 border-white/20 bg-white/10 text-white')}
              />
              <Button
                type="submit"
                size="lg"
                className={cn(
                  'inline-flex whitespace-nowrap',
                  isGlass
                    ? 'bg-drm-blue-800 text-white hover:bg-drm-blue-700'
                    : 'border-0 bg-drm-yellow-500 text-drm-blue-950 hover:bg-drm-yellow-400',
                )}
              >
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden />
              </Button>
            </form>
            <p
              className={cn(
                'text-xs',
                !isGlass ? 'text-slate-300' : 'text-slate-500',
              )}
            >
              Solicite contato pela equipe comercial da DRM — respondemos pelo
              canal que preferir.
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  },
)
CtaCard.displayName = 'CtaCard'

export { CtaCard }
