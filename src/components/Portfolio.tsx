import { Building2, Handshake, Images, MapPin, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { company } from '../lib/company'
import { PROJECT_SLIDES } from '../data/projects'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { cn } from '../lib/utils'

type TabKey = 'clientes' | 'parceiros' | 'galeria'

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-drm-yellow-500/10 ring-1 ring-drm-yellow-500/25">
        <Icon className="h-5 w-5 text-drm-yellow-500" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-[0.18em] text-white/50">
          {label}
        </div>
        <div className="text-base font-black tracking-tight text-white">
          {value}
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  const [tab, setTab] = useState<TabKey>('galeria')

  const gallery = useMemo(() => {
    return PROJECT_SLIDES.map((s) => ({
      id: s.id,
      title: s.label,
      description: s.description,
      icon: s.icon,
      image: s.image ? encodeURI(s.image.startsWith('/') ? s.image : `/${s.image}`) : undefined,
    }))
  }, [])

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 bg-drm-blue-950 py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading
            dark
            eyebrow="PORTFÓLIO"
            title="Experiência que gera confiança"
            subtitle="Vasta atuação em grandes obras e clientes da indústria, diretamente ou via terceirizadas."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Reveal y={10}>
            <StatPill icon={Building2} label="CLIENTES" value={`${company.portfolio.bigClients.length}+`} />
          </Reveal>
          <Reveal delayMs={80} y={10}>
            <StatPill icon={Handshake} label="PARCEIROS" value={`${company.portfolio.partners.length}+`} />
          </Reveal>
          <Reveal delayMs={160} y={10}>
            <StatPill icon={ShieldCheck} label="FOCO" value="Segurança e qualidade" />
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {([
            { key: 'galeria', icon: Images, label: 'Galeria' },
            { key: 'clientes', icon: Building2, label: 'Grandes clientes' },
            { key: 'parceiros', icon: Handshake, label: 'Parceiros' },
          ] as const).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200',
                tab === key
                  ? 'border-drm-yellow-500 bg-drm-yellow-500 text-drm-blue-950'
                  : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === 'galeria' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g, idx) => {
                const Icon = g.icon
                return (
                  <Reveal key={g.id} delayMs={Math.min(220, idx * 60)} y={10}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="group relative w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
                        >
                          <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                            {g.image ? (
                              <img
                                src={g.image}
                                alt={g.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.10),rgba(2,6,23,0.62),rgba(2,6,23,0.80))]" />
                            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white/85 backdrop-blur-sm">
                              <Icon className="h-4 w-4 text-drm-yellow-500" />
                              DRM
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h3 className="text-lg font-extrabold tracking-tight text-white">
                                  {g.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
                                  {g.description}
                                </p>
                              </div>
                              <MapPin className="h-5 w-5 shrink-0 text-drm-yellow-500/70" />
                            </div>
                            <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-white/35">
                              Clique para ver detalhes
                            </p>
                          </div>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl overflow-hidden p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="relative min-h-[240px] bg-slate-950">
                            {g.image ? (
                              <img
                                src={g.image}
                                alt={g.title}
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.55),rgba(2,6,23,0.78))]" />
                          </div>
                          <div className="p-6 md:p-7">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-black tracking-tight">
                                {g.title}
                              </DialogTitle>
                              <DialogDescription className="text-base leading-relaxed">
                                {g.description}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-sm leading-relaxed text-slate-700">
                                Se você quer uma equipe confiável para execução em campo, fale com a DRM e
                                receba um direcionamento rápido para o seu cenário.
                              </p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                Segurança
                              </span>
                              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                Qualidade
                              </span>
                              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                Industrial
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </Reveal>
                )
              })}
            </div>
          ) : null}

          {tab === 'clientes' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-drm-yellow-500/10 ring-1 ring-drm-yellow-500/25">
                    <Building2 className="h-5 w-5 text-drm-yellow-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-[0.22em] text-white/50">
                      GRANDES OBRAS / CLIENTES
                    </p>
                    <p className="mt-1 text-lg font-extrabold tracking-tight text-white">
                      Principais referências
                    </p>
                  </div>
                </div>
                <ul className="mt-8 grid gap-3">
                  {company.portfolio.bigClients.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm leading-snug text-white/75 transition-colors duration-200 hover:bg-white/10"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-drm-yellow-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/50">
                  COMO ATUAMOS
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white">
                  Execução direta ou via terceirizadas
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  A DRM se adapta ao modelo do cliente: apoio operacional, reforço de equipe ou execução
                  completa por escopo — sempre com foco em segurança e previsibilidade.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {['Planejamento', 'Mobilização', 'Execução', 'Entrega'].map((t) => (
                    <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:bg-white/10">
                      <p className="text-sm font-semibold text-white">{t}</p>
                      <p className="mt-1 text-sm text-white/50">
                        Rotina clara e comunicação direta.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {tab === 'parceiros' ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-drm-yellow-500/10 ring-1 ring-drm-yellow-500/25">
                  <Handshake className="h-5 w-5 text-drm-yellow-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/50">
                    PARCEIROS / TERCEIRIZADAS
                  </p>
                  <p className="mt-1 text-lg font-extrabold tracking-tight text-white">
                    Colaborações e execução
                  </p>
                </div>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {company.portfolio.partners.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-center text-sm font-semibold text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-3xl border border-drm-yellow-500/20 bg-drm-yellow-500/5 p-6">
                <p className="text-sm leading-relaxed text-white/70">
                  <span className="font-semibold text-white">Parceria em campo:</span> se você precisa
                  de suporte confiável, a DRM entra com a equipe certa para ajudar sua operação a ganhar
                  ritmo e previsibilidade.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
