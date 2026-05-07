import { MapPin, Target, User } from 'lucide-react'
import { company } from '../lib/company'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

export function Sobre() {
  return (
    <section id="sobre" className="border-t border-slate-200 bg-white py-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="SOBRE NÓS"
            title="Nossa história e objetivo"
            subtitle="Uma empresa criada com propósito: gerar oportunidades e entregar excelência para a indústria."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal y={12}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-[transform,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/12">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <User className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                  FUNDADOR
                </p>
                <p className="text-base font-semibold text-slate-950">
                  {company.founder}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {company.origin}
            </p>
            </div>
          </Reveal>

          <Reveal delayMs={90} y={12} className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-[transform,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/12">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <MapPin className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                  ORIGEM
                </p>
                <p className="text-base font-semibold text-slate-950">
                  Cabo de Santo Agostinho • Pernambuco
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {company.story}
            </p>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={140} y={10}>
          <div className="mt-6 rounded-2xl border border-drm-blue-500/15 bg-[linear-gradient(135deg,rgba(245,196,0,0.18),rgba(15,111,160,0.10))] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-drm-blue-500/10 ring-1 ring-drm-blue-500/20">
              <Target className="h-5 w-5 text-drm-blue-800" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-drm-blue-800/90">
                OBJETIVO
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-900">
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

