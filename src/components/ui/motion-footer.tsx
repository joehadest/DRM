import * as React from 'react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp, MapPin, MessageCircle } from 'lucide-react'

import { company } from '../../lib/company'
import { cn } from '../../lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/** Mesmo asset do `<Hero backgroundImageSrc={...}>` em `HeaderHero.tsx`. */
const HERO_BANNER_IMAGE_SRC = '/logo%20e%20banner/banner%20DRM.png'

const STYLES = `
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(245,196,0,0.35)); }
  25% { transform: scale(1.15); filter: drop-shadow(0 0 12px rgba(245,196,0,0.55)); }
  50% { transform: scale(1); }
}
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 48s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 100%);
  box-shadow:
    0 12px 32px -14px rgba(7, 28, 51, 0.18),
    inset 0 1px 1px rgba(255,255,255,0.98);
  border: 1px solid rgba(15, 111, 160, 0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 100%);
  border-color: rgba(245, 196, 0, 0.42);
  box-shadow:
    0 18px 36px -16px rgba(7, 28, 51, 0.22),
    inset 0 1px 1px rgba(255,255,255,1);
}
.footer-giant-bg-text {
  font-size: min(28vw, 17rem);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(7, 28, 51, 0.06);
  background: linear-gradient(180deg, rgba(7,28,51,0.07) 0%, transparent 58%);
  -webkit-background-clip: text;
  background-clip: text;
}
`

function useMagneticHover<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const hx = rect.width / 2
        const hy = rect.height / 2
        const x = e.clientX - rect.left - hx
        const y = e.clientY - rect.top - hy

        gsap.to(el, {
          x: x * 0.38,
          y: y * 0.38,
          scale: 1.05,
          ease: 'power2.out',
          duration: 0.38,
        })
      }

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          ease: 'elastic.out(1, 0.35)',
          duration: 1.05,
        })
      }

      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, el)

    return () => ctx.revert()
  }, [ref])
}

function MagneticAnchor({
  className,
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagneticHover(ref)
  return (
    <a
      ref={ref}
      href={href}
      className={cn('inline-flex cursor-pointer items-center justify-center', className)}
      {...props}
    >
      {children}
    </a>
  )
}

function MagneticButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  useMagneticHover(ref)
  return (
    <button
      ref={ref}
      type="button"
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </button>
  )
}

function MarqueeStrip() {
  const renderLoop = (suffix: string) => (
    <>
      {company.services.map((s, i) => (
        <span key={`${suffix}-svc-${i}`} className="flex items-center gap-10">
          <span>{s}</span>
          <span className="text-drm-yellow-500/70">✦</span>
        </span>
      ))}
      <span className="flex items-center gap-10">
        <span>{company.slogan}</span>
        <span className="text-drm-blue-500/60">✦</span>
      </span>
    </>
  )
  return (
    <div className="flex w-max animate-footer-scroll-marquee text-[10px] font-bold uppercase tracking-[0.28em] text-slate-600 md:text-xs">
      <div className="flex shrink-0 items-center px-6">{renderLoop('a')}</div>
      <div className="flex shrink-0 items-center px-6" aria-hidden>
        {renderLoop('b')}
      </div>
    </div>
  )
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const wrap = wrapperRef.current
    if (!wrap) return

    const ctx = gsap.context(() => {
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: '8vh', scale: 0.88, opacity: 0 },
          {
            y: '0vh',
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 1,
            },
          },
        )
      }

      const revealTargets = [headingRef.current, linksRef.current].filter(Boolean)
      if (revealTargets.length) {
        gsap.fromTo(
          revealTargets,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 55%',
              end: 'bottom bottom',
              scrub: 1,
            },
          },
        )
      }
    }, wrap)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section
        id="fechamento-site"
        className="relative scroll-mt-24"
        aria-labelledby="cinematic-footer-heading"
      >
        <div
          ref={wrapperRef}
          className="relative h-[min(100dvh,920px)] w-full"
          style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
          <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-[min(100dvh,920px)] w-full flex-col justify-between overflow-hidden text-slate-900">
            <div className="pointer-events-none absolute inset-0 z-0">
              <img
                src={HERO_BANNER_IMAGE_SRC}
                alt=""
                aria-hidden
                className="h-full w-full object-cover object-[8%_center] saturate-110 contrast-110 sm:object-[14%_center] lg:object-[18%_center]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78)_42%,rgba(255,255,255,0.32)_72%,rgba(255,255,255,0.10))]" />
            </div>

            <div
              ref={giantTextRef}
              className="footer-giant-bg-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
              aria-hidden
            >
              DRM
            </div>

            <div className="absolute inset-x-0 top-10 z-10 overflow-hidden border-y border-slate-200/70 bg-white/45 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-md md:top-12 md:py-4">
              <div className="flex w-full justify-center">
                <MarqueeStrip />
              </div>
            </div>

            <div className="relative z-10 mx-auto mt-16 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 md:mt-20 md:px-8">
              <h2
                id="cinematic-footer-heading"
                ref={headingRef}
                className="mb-8 bg-gradient-to-b from-drm-blue-950 via-drm-blue-800 to-drm-blue-950 bg-clip-text text-center text-4xl font-black tracking-tighter text-transparent md:mb-10 md:text-7xl lg:text-8xl"
              >
                Pronto para o próximo projeto?
              </h2>

              <p className="mb-8 max-w-xl text-center text-sm leading-relaxed text-slate-700 md:text-base">
                <span className="inline-flex items-start justify-center gap-2 text-left">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-drm-blue-800" />
                  <span>
                    {company.contact.address}
                    <span className="mt-1 block text-xs text-slate-600">
                      CEP {company.contact.cep}
                    </span>
                  </span>
                </span>
              </p>

              <div
                ref={linksRef}
                className="flex w-full flex-col items-center gap-6"
              >
                <div className="flex w-full justify-center">
                  <MagneticAnchor
                    href="#contato"
                    className="footer-glass-pill inline-flex gap-3 rounded-full px-10 py-4 text-sm font-bold text-drm-blue-950 md:px-12 md:text-base"
                  >
                    <MessageCircle className="h-6 w-6 text-drm-yellow-500" />
                    WhatsApp
                  </MagneticAnchor>
                </div>

                <div className="mt-1 flex flex-wrap justify-center gap-2 md:gap-3">
                  {(
                    [
                      ['Sobre', '#sobre'],
                      ['Serviços', '#servicos'],
                      ['Vídeos', '#videos'],
                      ['Projetos', '#projetos'],
                      ['Portfólio', '#portfolio'],
                    ] as const
                  ).map(([label, href]) => (
                    <MagneticAnchor
                      key={href}
                      href={href}
                      className="footer-glass-pill rounded-full px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-drm-blue-950 md:text-sm"
                    >
                      {label}
                    </MagneticAnchor>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-5 pb-8 pt-4 md:flex-row md:px-10 md:pb-10">
              <div className="order-2 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:order-1 md:text-left md:text-xs">
                <p>
                  © {year} {company.name}. Todos os direitos reservados.
                </p>
                <p className="mt-2 normal-case tracking-normal text-slate-600">
                  CNPJ {company.contact.cnpj}
                </p>
              </div>
              <MagneticButton
                onClick={scrollToTop}
                className="group footer-glass-pill order-3 flex h-12 w-12 items-center justify-center rounded-full text-drm-blue-800 hover:text-drm-blue-950"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
              </MagneticButton>
            </div>

            <p className="relative z-20 mx-auto max-w-3xl px-6 pb-6 text-center text-xs leading-relaxed text-slate-600 md:text-sm">
              {company.closingMessage}
            </p>
          </footer>
        </div>
      </section>
    </>
  )
}
