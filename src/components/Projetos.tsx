import { FeatureCarousel } from './ui/feature-carousel'
import { Container, SectionHeading } from './ui'
import { Reveal } from './Reveal'

export function Projetos() {
  return (
    <section
      id="projetos"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16"
    >
      <Container>
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
      </Container>
    </section>
  )
}
