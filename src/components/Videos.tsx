import { drmCanteiroSpotlight } from '../data/video-spotlight'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'
import { VideoShowcase } from './ui/videos-showcase'

export function Videos() {
  const data = drmCanteiroSpotlight

  return (
    <section
      id="videos"
      className="scroll-mt-24 bg-drm-blue-950 py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading
            dark
            eyebrow="VÍDEOS"
            title="Conheça nosso trabalho em vídeo"
            subtitle="Destaque do canteiro padrão DRM e da linha de fabricação com foco em funilaria e peças de campo."
          />
        </Reveal>
        <div className="mt-12">
          <Reveal delayMs={90}>
            <VideoShowcase
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
