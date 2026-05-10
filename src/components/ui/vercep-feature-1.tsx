import { BadgeCheck, HardHat, ShieldCheck, Timer } from 'lucide-react'

import { company } from '../../lib/company'
import { cn } from '../../lib/utils'

const FEATURES = [
  {
    title: 'Segurança em primeiro lugar',
    description:
      'Equipe treinada e rotinas alinhadas às normas para reduzir riscos e elevar a confiabilidade em campo.',
    Icon: ShieldCheck,
  },
  {
    title: 'Qualidade e acabamento',
    description:
      'Execução com padrão industrial, inspeção e cuidado nos detalhes — da preparação à entrega.',
    Icon: BadgeCheck,
  },
  {
    title: 'Time especializado',
    description:
      'Profissionais com experiência em grandes obras e paradas, prontos para operar com eficiência.',
    Icon: HardHat,
  },
  {
    title: 'Agilidade com planejamento',
    description:
      'Prazos e produtividade com organização, comunicação direta e foco em resultado.',
    Icon: Timer,
  },
] as const

function ServicePill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-drm-yellow-500/40 hover:bg-drm-yellow-500/10 hover:text-white">
      {text}
    </span>
  )
}

export function NossosServicosSection({ className }: { className?: string }) {
  const services = company.services

  return (
    <section
      id="servicos"
      className={cn('relative w-full bg-drm-blue-800/30 bg-drm-blue-950 py-16 md:py-20', className)}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-drm-yellow-500">
            NOSSOS SERVIÇOS
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Especialidades para a indústria
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            Soluções completas com mão de obra qualificada — do planejamento à execução.
          </p>
        </div>

        {/* Services pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {services.map((s) => (
            <ServicePill key={s} text={s} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-2xl p-6 transition-colors duration-300 hover:bg-white/5 lg:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-drm-yellow-500/20 bg-drm-yellow-500/10 transition-colors duration-300 group-hover:bg-drm-yellow-500/20">
                <Icon className="h-6 w-6 text-drm-yellow-500" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

