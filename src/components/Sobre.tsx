import { motion, useInView } from 'framer-motion'
import { Award, MapPin, ShieldCheck, Target, Users } from 'lucide-react'
import { useRef } from 'react'
import { company } from '../lib/company'

const OBRA_IMG = '/projetos/montagem%20industrial.jpeg'

const stats = [
  { value: '16+', label: 'Anos em Pernambuco' },
  { value: '6+',  label: 'Grandes clientes' },
  { value: '8',   label: 'Serviços especializados' },
  { value: '100%', label: 'Foco em segurança' },
]

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Segurança',
    description: 'Operamos com os mais altos padrões de segurança exigidos pela indústria pesada.',
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Equipe treinada e certificada para entregar excelência em cada etapa da obra.',
  },
  {
    icon: Target,
    title: 'Comprometimento',
    description: 'Prazo, escopo e resultado: cumprimos o que prometemos para cada cliente.',
  },
]

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm sm:items-start"
    >
      <span className="text-3xl font-bold tracking-tight text-drm-yellow-500 sm:text-4xl">
        {value}
      </span>
      <span className="mt-1 text-xs font-medium tracking-wide text-white/70">{label}</span>
    </motion.div>
  )
}

export function Sobre() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="scroll-mt-24 overflow-hidden bg-drm-blue-950"
    >
      {/* ── BLOCO PRINCIPAL: texto + imagem ── */}
      <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]">

        {/* Coluna esquerda — conteúdo */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 lg:py-20 xl:px-20">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold tracking-[0.25em] text-drm-yellow-500"
          >
            SOBRE NÓS
          </motion.p>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Experiência que <br className="hidden sm:block" />
            <span className="text-drm-yellow-500">fala por si</span>
          </motion.h2>

          {/* História */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {company.story} Hoje atendemos os maiores nomes da indústria nacional,
            levando mão de obra especializada com rigor técnico e compromisso total
            com segurança e qualidade.
          </motion.p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </div>

          {/* Divisor */}
          <div className="my-10 h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

          {/* Equipe */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-drm-yellow-500/10 ring-1 ring-drm-yellow-500/30">
                <Users className="h-4 w-4 text-drm-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">FUNDADOR</p>
                <p className="text-sm font-semibold text-white">{company.founder}</p>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-drm-yellow-500/10 ring-1 ring-drm-yellow-500/30">
                <Users className="h-4 w-4 text-drm-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">SÓCIO</p>
                <p className="text-sm font-semibold text-white">{company.partner}</p>
              </div>
            </div>
          </motion.div>

          {/* Localização */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex items-center gap-2 text-sm text-white/40"
          >
            <MapPin className="h-4 w-4 shrink-0 text-drm-yellow-500/70" />
            Cabo de Santo Agostinho &bull; Pernambuco
          </motion.div>
        </div>

        {/* Coluna direita — imagem */}
        <div className="relative hidden lg:block">
          <img
            src={OBRA_IMG}
            alt="Equipe DRM em obra industrial"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {/* Overlay gradiente para integrar com a coluna esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-drm-blue-950 via-drm-blue-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-drm-blue-950/60 via-transparent to-transparent" />

          {/* Badge flutuante */}
          <div className="absolute bottom-8 right-6 rounded-2xl border border-white/10 bg-drm-blue-950/70 px-5 py-4 backdrop-blur-md">
            <p className="text-[10px] font-bold tracking-[0.2em] text-drm-yellow-500">NOSSO SLOGAN</p>
            <p className="mt-1 text-base font-bold text-white">{company.slogan}</p>
          </div>
        </div>
      </div>

      {/* ── PILARES ── */}
      <div className="border-t border-white/5 bg-drm-blue-800/20">
        <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3 px-8 py-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-drm-yellow-500/10 ring-1 ring-drm-yellow-500/25">
                  <Icon className="h-5 w-5 text-drm-yellow-500" />
                </div>
                <p className="text-sm font-bold tracking-wide text-white">{pillar.title}</p>
                <p className="text-sm leading-relaxed text-white/55">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── OBJETIVO — faixa amarela ── */}
      <div className="bg-drm-yellow-500 px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <Target className="h-8 w-8 shrink-0 text-drm-blue-950" />
          <p className="text-base font-semibold leading-relaxed text-drm-blue-950 sm:text-lg">
            {company.objective}
          </p>
        </div>
      </div>
    </section>
  )
}
