import { drmCanteiroSpotlight, drmSlideSpotlight } from '../data/video-spotlight'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'
import { VideoShowcase } from './ui/videos-showcase'

export function Videos() {
  const slide = drmSlideSpotlight
  const canteiro = drmCanteiroSpotlight

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
            title="Conheça a DRM em vídeo"
            subtitle="Veja quem somos, como trabalhamos e a qualidade que entregamos em cada projeto."
          />
        </Reveal>

        <div className="mt-12">
          <Reveal delayMs={90}>
            <VideoShowcase
              title={slide.title}
              description={slide.description}
              items={[...slide.items]}
              videoUrl={slide.videoUrl}
            />
          </Reveal>
        </div>

        <div className="mt-10 border-t border-white/10 pt-10">
          <Reveal delayMs={120}>
            <VideoShowcase
              title={canteiro.title}
              description={canteiro.description}
              items={[...canteiro.items]}
              videoUrl={canteiro.videoUrl}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
