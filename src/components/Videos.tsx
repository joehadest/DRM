import { drmCanteiroSpotlight } from '../data/video-spotlight'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'
import { OnboardingChecklist } from './ui/onboarding-checklist'

export function Videos() {
  const data = drmCanteiroSpotlight

  return (
    <section
      id="videos"
      className="scroll-mt-24 border-t border-slate-200 bg-white py-16"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="VÍDEOS"
            title="Conheça nosso trabalho em vídeo"
            subtitle="Destaque do canteiro padrão DRM e da linha de fabricação com foco em funilaria e peças de campo."
          />
        </Reveal>
        <div className="mt-12">
          <Reveal delayMs={90}>
            <OnboardingChecklist
              title={data.title}
              description={data.description}
              items={[...data.items]}
              videoUrl={data.videoUrl}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
