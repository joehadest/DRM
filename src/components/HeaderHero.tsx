import { MessageCircle } from 'lucide-react'
import { company } from '../lib/company'
import { AnimatedHero } from './ui/animated-hero-section-1'

const HERO_BANNER = '/logo%20e%20banner/banner%20novo.jpeg'

export function HeaderHero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header id="topo" className="relative">
      <AnimatedHero
        backgroundImageUrl={HERO_BANNER}
        logo={
          <>
            <img
              src="/logo%20e%20banner/logo%20DRM.png"
              alt={company.name}
              className="h-9 w-auto"
              loading="eager"
              decoding="async"
            />
            <span className="sr-only">{company.name}</span>
          </>
        }
        navLinks={[
          { label: 'Sobre', href: '#sobre' },
          { label: 'Serviços', href: '#servicos' },
          { label: 'Projetos', href: '#projetos' },
          { label: 'Vídeos', href: '#videos' },
          { label: 'Portfólio', href: '#portfolio' },
          { label: 'Contato', href: '#contato' },
        ]}
        topRightAction={
          <button
            type="button"
            onClick={() => scrollTo('#contato')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0 group-data-[scrolled=true]:border-drm-yellow-500/60 group-data-[scrolled=true]:bg-drm-yellow-500/20 group-data-[scrolled=true]:text-drm-yellow-400 group-data-[scrolled=true]:hover:bg-drm-yellow-500/30"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            WhatsApp
          </button>
        }
        title="Mão de obra especializada para a indústria"
        description={`${company.name}: foco em segurança, qualidade e entrega. Experiência em grandes obras, com time preparado para atuar direto ou via terceirizadas.`}
        ctaButton={{
          text: 'Saiba mais',
          onClick: () => scrollTo('#sobre'),
        }}
      />
    </header>
  )
}

