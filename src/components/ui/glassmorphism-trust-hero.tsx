import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, HardHat, Phone } from 'lucide-react'

import { company } from '../../lib/company'
import { cn } from '../../lib/utils'

const easeOut = [0.16, 1, 0.3, 1] as const

const heroCtaSpring = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 28,
  mass: 0.85,
}

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
      ease: easeOut,
      duration: 0.6,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 14, filter: 'blur(2px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ease: easeOut, duration: 0.6 },
  },
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-xl font-bold tracking-tight text-drm-blue-950 sm:text-2xl">
        {value}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export function GlassmorphismTrustHero({
  contactHref = '#contato',
}: {
  contactHref?: string
}) {
  return (
    <div className="relative">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10"
      >
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-6 pt-2">
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 shadow-sm shadow-slate-900/10 backdrop-blur-md">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 sm:text-xs">
                Experiência em grandes obras
                <BadgeCheck className="h-4 w-4 text-drm-blue-800" />
              </span>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h2 className="text-4xl font-semibold tracking-tight text-drm-blue-950 sm:text-5xl lg:text-6xl leading-[0.95]">
              Mão de obra especializada
              <br />
              <span className="bg-gradient-to-br from-drm-blue-950 via-drm-blue-800 to-drm-yellow-500 bg-clip-text text-transparent">
                para a indústria
              </span>
            </h2>
          </motion.div>

          <motion.div variants={item}>
            <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              A {company.name} nasceu com propósito: gerar oportunidades e
              entregar excelência. Atuamos com foco em segurança, qualidade e
              satisfação das empresas industriais.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={contactHref}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={heroCtaSpring}
              className={cn(
                'group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-bold',
                'bg-drm-blue-800 text-white shadow-lg shadow-drm-blue-950/20 ring-1 ring-drm-yellow-500/45',
                'transition-[box-shadow,background-color] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.92)]',
                'hover:bg-drm-blue-700 hover:shadow-xl hover:shadow-drm-blue-950/25',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drm-yellow-500/60',
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:translate-x-full"
              />
              WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.32,1)] group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href={contactHref}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={heroCtaSpring}
              className={cn(
                'group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-sm font-bold',
                'border border-slate-200 bg-white/75 text-slate-900 shadow-sm shadow-slate-900/10 backdrop-blur',
                'transition-[box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.92)]',
                'hover:border-drm-blue-500/35 hover:bg-white hover:shadow-md hover:shadow-slate-900/12',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drm-yellow-500/60 focus-visible:ring-offset-2',
              )}
            >
              Falar com a DRM
              <Phone className="h-4 w-4 text-drm-blue-800 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.32,1)] group-hover:-rotate-6 group-hover:scale-110" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <motion.div variants={item}>
            <div className="drm-card-interactive-glass relative overflow-hidden rounded-3xl border border-white/80 bg-white/72 p-7 shadow-[0_28px_64px_-34px_rgba(7,28,51,0.35)] backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-drm-yellow-500/18 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-drm-blue-500/12 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 ring-1 ring-slate-200/80">
                    <HardHat className="h-6 w-6 text-drm-blue-800" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-drm-blue-950">
                      Vasta experiência
                    </div>
                    <div className="text-sm text-slate-600">
                      Direto ou via terceirizadas
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Compromisso</span>
                    <span className="font-semibold text-drm-blue-950">
                      Alto padrão
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-drm-blue-800 to-drm-yellow-500" />
                  </div>
                </div>

                <div className="my-6 h-px w-full bg-slate-200/80" />

                <div className="grid grid-cols-3 items-center gap-3 text-center">
                  <StatItem value="16+" label="Anos em PE" />
                  <div className="mx-auto h-10 w-px bg-slate-200/80" />
                  <StatItem value="8" label="Serviços" />
                  <div className="mx-auto h-10 w-px bg-slate-200/80" />
                  <StatItem value="100%" label="Foco" />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-slate-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-drm-yellow-500/70 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-drm-yellow-500" />
                    </span>
                    ATIVO
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-drm-blue-800" />
                    INDUSTRIAL
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

