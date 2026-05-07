import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { company } from '../lib/company'
import { buildWhatsAppLink, toE164BR } from '../lib/links'
import { Reveal } from './Reveal'
import { Container } from './ui'

const primaryWhatsApp = company.contact.phones[0]
const whatsappHref = buildWhatsAppLink(
  primaryWhatsApp,
  'Olá! Vim pelo site da DRM SERVIÇOS e gostaria de falar sobre um orçamento.',
)

export function ContatoFooter() {
  return (
    <section
      id="contato"
      className="border-t border-slate-200 bg-slate-50 py-16"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-600">
                CONTATO
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Vamos conversar sobre sua necessidade
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                Atendimento rápido via WhatsApp e telefone. Envie sua demanda e
                retornamos com agilidade.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-drm-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 ring-1 ring-drm-yellow-500/35 transition-[transform,background-color,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:bg-drm-blue-700 hover:shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-[transform,border-color,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-md"
                >
                  Ver serviços
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={90} y={12}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-[transform,box-shadow] duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.92)] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/12">
              <div className="grid gap-5">
              <div className="flex gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                  <MapPin className="h-5 w-5 text-drm-blue-800" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Endereço</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {company.contact.address}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    CEP: {company.contact.cep}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                  <Phone className="h-5 w-5 text-drm-blue-800" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-950">
                    Telefones / WhatsApp
                  </p>
                  <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                    {company.contact.phones.map((p) => (
                      <li key={p} className="flex flex-wrap items-center gap-3">
                        <a
                          className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                          href={`tel:+${toE164BR(p)}`}
                        >
                          {p}
                        </a>
                        <a
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 hover:border-slate-300"
                          href={buildWhatsAppLink(p)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-600">
                  CNPJ
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  {company.contact.cnpj}
                </p>
              </div>
            </div>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={140}>
          <footer className="mt-12 border-t border-slate-200 pt-8">
            <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
              {company.closingMessage}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              © {new Date().getFullYear()} {company.name}. Todos os direitos
              reservados.
            </p>
          </footer>
        </Reveal>
      </Container>
    </section>
  )
}

