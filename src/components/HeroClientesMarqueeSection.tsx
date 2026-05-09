import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Factory,
  Flame,
  HardHat,
  Landmark,
  Ship,
} from 'lucide-react'

import { Container } from './ui'

type Client = {
  name: string
  icon: ComponentType<{ className?: string }>
}

const MARQUEE_CLIENTS: Client[] = [
  { name: 'PETROBRÁS', icon: Ship },
  { name: 'Vale do Rio Doce', icon: Landmark },
  { name: 'Alunorte', icon: Factory },
  { name: 'Alumar', icon: Flame },
  { name: 'Jari Celulose', icon: Building2 },
  { name: 'Bracell', icon: HardHat },
]

/** Card de “Grandes obras” fora da primeira vista; aparece com rolagem. */
export function HeroClientesMarqueeSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="grandes-obras-marquee-heading"
      className="relative z-10 scroll-mt-6 pb-16 pt-10 sm:pb-24 sm:pt-14"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{ once: true, amount: 0.28, margin: '80px 0px 0px 0px' }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="drm-card-interactive-glass relative mx-auto overflow-hidden rounded-3xl border border-white/80 bg-white/80 py-7 shadow-[0_22px_50px_-34px_rgba(7,28,51,0.28)] backdrop-blur-xl lg:max-w-4xl">
            <h2
              id="grandes-obras-marquee-heading"
              className="mb-5 px-7 text-base font-semibold text-slate-700"
            >
              Grandes obras / clientes
            </h2>

            <div
              className="relative flex overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
              }}
            >
              <div className="drm-marquee flex gap-10 whitespace-nowrap px-6">
                {[...MARQUEE_CLIENTS, ...MARQUEE_CLIENTS].map((client, i) => {
                  const Icon = client.icon
                  return (
                    <div
                      key={`${client.name}-${i}`}
                      className="flex items-center gap-2 opacity-70 transition-[opacity,transform,filter] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:opacity-100 hover:scale-[1.02] hover:grayscale-0 grayscale"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-drm-blue-800" />
                      <span className="text-base font-extrabold tracking-tight text-drm-blue-950">
                        {client.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="mt-5 px-7 text-xs leading-relaxed text-slate-600">
              Também via parceiras: Reframax, Priner, Conenge-SC, Possebon,
              Isolenge, entre outras.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
