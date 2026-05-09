import { Building2, Handshake } from 'lucide-react'
import { company } from '../lib/company'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="PORTFÓLIO"
            title="Experiência que gera confiança"
            subtitle="Vasta atuação em grandes obras e clientes da indústria, diretamente ou via terceirizadas."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal y={12}>
            <div className="group drm-card-interactive rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:p-7">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 transition-[background-color] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:bg-white">
                  <Building2 className="h-5 w-5 text-drm-blue-800 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:scale-[1.05]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.22em] text-slate-600">
                    GRANDES OBRAS / CLIENTES
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                    Principais referências
                  </p>
                </div>
              </div>

              <ul className="mt-8 grid gap-3">
                {company.portfolio.bigClients.map((item) => (
                  <li
                    key={item}
                    className="drm-card-interactive-sm flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-snug text-slate-800 shadow-sm shadow-slate-900/[0.04]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-drm-yellow-500"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={90} y={12}>
            <div className="group drm-card-interactive rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:p-7">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 transition-[background-color] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:bg-white">
                  <Handshake className="h-5 w-5 text-drm-blue-800 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] group-hover:scale-[1.05]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.22em] text-slate-600">
                    PARCEIROS / TERCEIRIZADAS
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                    Colaborações e execução
                  </p>
                </div>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {company.portfolio.partners.map((item) => (
                  <li
                    key={item}
                    className="drm-card-interactive-sm rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-center text-sm font-medium text-slate-800 shadow-sm shadow-slate-900/[0.04]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 drm-card-interactive-sm rounded-2xl border border-slate-200 bg-slate-50/90 p-5 shadow-sm shadow-slate-900/[0.03]">
                <p className="text-sm leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-950">
                    Parceria em campo:
                  </span>{' '}
                  se você precisa de suporte confiável, a DRM entra com a equipe
                  certa para ajudar sua operação a ganhar ritmo e previsibilidade.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
