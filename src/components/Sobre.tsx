import { MapPin, Target, User } from 'lucide-react'
import { company } from '../lib/company'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

export function Sobre() {
  return (
    <section
      id="sobre"
      className="scroll-mt-24 border-t border-slate-200 bg-white py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="SOBRE NÓS"
            title="Nossa história e objetivo"
            subtitle="Uma empresa criada com propósito: gerar oportunidades e entregar excelência para a indústria."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          <Reveal y={12}>
            <div className="group drm-card-interactive flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:p-7">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 transition-[background-color] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:bg-white">
                  <User className="h-5 w-5 text-drm-blue-800 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:scale-[1.05]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.22em] text-slate-600">
                    Equipe
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                    Quem conduz a DRM
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                    FUNDADOR
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {company.founder}
                  </p>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                    SÓCIO
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {company.partner}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={90} y={12} className="lg:col-span-2">
            <div className="group drm-card-interactive flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:p-7">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 transition-[background-color] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:bg-white">
                  <MapPin className="h-5 w-5 text-drm-blue-800 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:scale-[1.05]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.22em] text-slate-600">
                    ORIGEM
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                    Cabo de Santo Agostinho • Pernambuco
                  </p>
                </div>
              </div>
              <p className="mt-8 text-sm leading-relaxed text-slate-700 md:text-base">
                {company.story}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={140} y={10}>
          <div className="mt-8 drm-card-interactive rounded-2xl border border-drm-blue-500/20 bg-[linear-gradient(135deg,rgba(245,196,0,0.14),rgba(15,111,160,0.08))] p-6 shadow-sm shadow-drm-blue-950/10 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/80 ring-1 ring-drm-blue-500/25 shadow-sm">
                <Target className="h-5 w-5 text-drm-blue-800" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-[0.22em] text-drm-blue-800">
                  OBJETIVO
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-900 md:text-lg">
                  {company.objective}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
