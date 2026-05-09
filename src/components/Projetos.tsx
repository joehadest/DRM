import { FeatureCarousel } from './ui/feature-carousel'
import { Container, SectionHeading } from './ui'
import { Reveal } from './Reveal'

const BANNER_BG = '/logo%20e%20banner/banner%20DRM.png'

export function Projetos() {
  return (
    <section
      id="projetos"
      className="relative scroll-mt-24 overflow-hidden border-t border-slate-200 py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-white">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${BANNER_BG})`,
            backgroundSize: '100% auto',
            backgroundPosition: 'center center',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.93),rgba(255,255,255,0.82)_48%,rgba(255,255,255,0.55)_100%)]" />
      </div>

      <Container>
        <div className="relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="PROJETOS"
              title="Serviços em destaque"
              subtitle="Conheça as principais frentes de atuação da DRM — você pode substituir os placeholders por fotos reais quando quiser."
            />
          </Reveal>
          <div className="mt-12">
            <Reveal delayMs={100}>
              <FeatureCarousel />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

