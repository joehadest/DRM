import {
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Info,
  Phone,
} from 'lucide-react'
import { company } from '../lib/company'
import { buildWhatsAppLink } from '../lib/links'
import { Hero } from './ui/hero'
import { HoverGradientNavBar } from './ui/hover-gradient-nav-bar'
import { HeroClientesMarqueeSection } from './HeroClientesMarqueeSection'
import { GlassmorphismTrustHero } from './ui/glassmorphism-trust-hero'
import { SneakyButton } from './ui/sneaky-button'
import { Container } from './ui'

const primaryWhatsApp = company.contact.phones[0]
const whatsappHref = buildWhatsAppLink(
  primaryWhatsApp,
  'Olá! Vim pelo site da DRM SERVIÇOS e gostaria de falar sobre um orçamento.',
)

export function HeaderHero() {
  return (
    <header className="relative isolate overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(15,111,160,0.28),transparent_60%),radial-gradient(60%_60%_at_12%_12%,rgba(245,196,0,0.18),transparent_55%),radial-gradient(60%_60%_at_88%_18%,rgba(11,63,119,0.22),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10">
        <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
          <Container>
            <div className="flex items-center justify-between py-4">
              <a
                href="#topo"
                className="group inline-flex items-center gap-3 font-semibold tracking-tight text-slate-950"
              >
                <img
                  src="/logo%20e%20banner/logo%20DRM.png"
                  alt={company.name}
                  className="h-10 w-auto"
                  loading="eager"
                  decoding="async"
                />
                <span className="sr-only">{company.name}</span>
              </a>

              <div className="hidden md:flex">
                <HoverGradientNavBar
                  items={[
                    {
                      label: 'Sobre',
                      href: '#sobre',
                      icon: Info,
                      gradient:
                        'radial-gradient(circle, rgba(15,111,160,0.22) 0%, rgba(10,47,87,0.10) 52%, rgba(7,28,51,0) 100%)',
                    },
                    {
                      label: 'Serviços',
                      href: '#servicos',
                      icon: BriefcaseBusiness,
                      gradient:
                        'radial-gradient(circle, rgba(245,196,0,0.22) 0%, rgba(245,196,0,0.10) 48%, rgba(245,196,0,0) 100%)',
                      iconClassName: 'group-hover:text-drm-yellow-500',
                    },
                    {
                      label: 'Portfólio',
                      href: '#portfolio',
                      icon: Building2,
                      gradient:
                        'radial-gradient(circle, rgba(11,63,119,0.18) 0%, rgba(15,111,160,0.10) 56%, rgba(7,28,51,0) 100%)',
                    },
                    {
                      label: 'Projetos',
                      href: '#projetos',
                      icon: FolderKanban,
                      gradient:
                        'radial-gradient(circle, rgba(245,196,0,0.20) 0%, rgba(15,111,160,0.12) 55%, rgba(7,28,51,0) 100%)',
                    },
                    {
                      label: 'Contato',
                      href: '#contato',
                      icon: Phone,
                      gradient:
                        'radial-gradient(circle, rgba(245,196,0,0.18) 0%, rgba(15,111,160,0.10) 55%, rgba(7,28,51,0) 100%)',
                    },
                  ]}
                />
              </div>

              <SneakyButton
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                label="WhatsApp"
              />
            </div>
          </Container>
        </div>

        <Hero id="topo" backgroundImageSrc="/logo%20e%20banner/banner%20DRM.png">
          <h1 className="sr-only">{company.name}</h1>
          <GlassmorphismTrustHero
            whatsappHref={whatsappHref}
            contactHref="#contato"
          />
        </Hero>
        <HeroClientesMarqueeSection id="grandes-obras-marquee" />
      </div>
    </header>
  )
}

