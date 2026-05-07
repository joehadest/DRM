import { Building2, Handshake } from 'lucide-react'
import { company } from '../lib/company'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="border-t border-slate-200 bg-white py-16"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="PORTFÓLIO"
            title="Experiência que gera confiança"
            subtitle="Vasta atuação em grandes obras e clientes da indústria, diretamente ou via terceirizadas."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal y={12}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-[transform,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/12">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <Building2 className="h-5 w-5 text-drm-blue-800" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-600">
                  GRANDES OBRAS / CLIENTES
                </p>
                <p className="text-base font-semibold text-slate-950">
                  Principais referências
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-slate-800">
              {company.portfolio.bigClients.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
            </div>
          </Reveal>

          <Reveal delayMs={90} y={12}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-[transform,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/12">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <Handshake className="h-5 w-5 text-drm-blue-800" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-600">
                  PARCEIROS / TERCEIRIZADAS
                </p>
                <p className="text-base font-semibold text-slate-950">
                  Colaborações e execução
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-slate-800 sm:grid-cols-2">
              {company.portfolio.partners.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                Se você precisa de suporte confiável em campo, a DRM entra com a
                equipe certa para ajudar sua operação a ganhar ritmo e
                previsibilidade.
              </p>
            </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

