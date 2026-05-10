import { Container, SectionHeading } from './ui'
import { Reveal } from './Reveal'
import { PROJECT_SLIDES } from '../data/projects'
import { CircularTestimonials, type CircularTestimonial } from './ui/circular-testimonials'

export function Projetos() {
  const items: CircularTestimonial[] = PROJECT_SLIDES.map((s) => {
    const src = s.image ? (s.image.startsWith('/') ? s.image : `/${s.image}`) : ''
    return {
      quote: s.description,
      name: s.label,
      designation: 'Serviço industrial',
      src: encodeURI(src),
    }
  }).filter((i) => Boolean(i.src))

  return (
    <section
      id="projetos"
      className="scroll-mt-24 overflow-hidden bg-drm-blue-950 py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading
            dark
            eyebrow="PROJETOS"
            title="Serviços em destaque"
            subtitle="Navegue pelo portfólio e conheça cada especialidade da DRM."
          />
        </Reveal>
        <div className="mt-12">
          <Reveal delayMs={100}>
            <CircularTestimonials
              testimonials={items}
              autoplay
              colors={{
                name: '#ffffff',
                designation: 'rgba(255,255,255,0.5)',
                testimony: 'rgba(255,255,255,0.7)',
                arrowBackground: 'rgba(255,255,255,0.08)',
                arrowForeground: '#ffffff',
                arrowHoverBackground: '#f5c400',
              }}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

