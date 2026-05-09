import {
  Building2,
  Construction,
  Flame,
  Paintbrush,
  Settings,
  Thermometer,
  Volume2,
  Wrench,
} from 'lucide-react'
import { company } from '../lib/company'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

const services = [
  { name: 'Isolamento térmico', Icon: Thermometer },
  { name: 'Acústico quente e frio', Icon: Volume2 },
  { name: 'Mecânica industrial', Icon: Settings },
  { name: 'Montagem de estruturas metálicas', Icon: Building2 },
  { name: 'Caldeiraria', Icon: Wrench },
  { name: 'Pinturas industrial e comercial', Icon: Paintbrush },
  { name: 'Refratários', Icon: Flame },
  { name: 'Montagem de andaimes', Icon: Construction },
] as const

export function Servicos() {
  return (
    <section
      id="servicos"
      className="border-t border-slate-200 bg-slate-50 py-16"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="NOSSOS SERVIÇOS"
            title="Especialidades para a indústria"
            subtitle="Soluções completas com mão de obra qualificada — do planejamento à execução."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ name, Icon }, idx) => (
            <Reveal key={name} delayMs={70 * idx} y={12}>
              <div className="group drm-card-interactive rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 transition-[background-color] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:bg-white">
                    <Icon className="h-5 w-5 text-drm-blue-800 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:scale-[1.05]" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                    DRM
                  </span>
                </div>
                <p className="mt-5 text-base font-semibold leading-snug text-slate-950">
                  {name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Atendimento alinhado às demandas do mercado industrial, com
                  foco em qualidade e segurança.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-10 drm-card-interactive rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-950">Cobertura:</span>{' '}
              {company.services.join(' • ')}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

