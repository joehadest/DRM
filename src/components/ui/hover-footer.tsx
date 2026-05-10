import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

import { company } from '../../lib/company'
import { cn } from '../../lib/utils'

export function TextHoverEffect({
  text,
  duration,
  className,
}: {
  text: string
  duration?: number
  className?: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    if (!svgRef.current) return
    const svgRect = svgRef.current.getBoundingClientRect()
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    })
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn('select-none uppercase cursor-pointer', className)}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered ? (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          ) : null}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-white/45 font-[helvetica] text-7xl font-black"
        style={{ opacity: hovered ? 0.65 : 0 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-white/55 font-[helvetica] text-7xl font-black"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-black"
      >
        {text}
      </text>
    </svg>
  )
}

export function FooterBackgroundGradient() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: 'radial-gradient(125% 125% at 50% 10%, #0B0F1766 45%, #0F6FA033 100%)',
      }}
    />
  )
}

export function HoverFooter() {
  const links = [
    {
      title: 'Sobre',
      links: [
        { label: 'Quem somos', href: '#sobre' },
        { label: 'Portfólio', href: '#portfolio' },
        { label: 'Projetos', href: '#projetos' },
      ],
    },
    {
      title: 'Serviços',
      links: [
        { label: 'Ver serviços', href: '#servicos' },
        { label: 'Vídeos', href: '#videos' },
        { label: 'Contato', href: '#contato', pulse: true },
      ],
    },
  ] as const

  const phone = company.contact.phones[0] ?? ''
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined

  return (
    <footer
      id="fechamento-site"
      className="relative w-full overflow-hidden border-y border-white/10 bg-slate-950/40 text-white shadow-2xl shadow-slate-900/35"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/projetos/andaimes%20e%20acesso/andaimes%20e%20acesso.jpeg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[50%_45%] saturate-110 contrast-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/55" />
        <FooterBackgroundGradient />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 md:px-12">
        <div className="grid grid-cols-1 gap-12 pb-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo%20e%20banner/logo%20DRM.png"
                alt={company.name}
                className="h-10 w-auto"
                loading="lazy"
                decoding="async"
              />
              <span className="text-2xl font-black tracking-tight">{company.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              {company.slogan}. Mão de obra especializada para a indústria — segurança, qualidade e entrega.
            </p>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 text-lg font-bold text-white">{section.title}</h4>
              <ul className="space-y-3 text-sm text-white/80">
                {section.links.map((link) => (
                  <li key={link.href} className="relative">
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                    {'pulse' in link && link.pulse ? (
                      <span className="absolute -right-3 top-1 h-2 w-2 animate-pulse rounded-full bg-drm-yellow-500" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Contato</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-drm-yellow-500" />
                <span>{company.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-drm-yellow-500" />
                <span>CEP {company.contact.cep}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-drm-yellow-500" />
                {phoneHref ? (
                  <a href={phoneHref} className="transition-colors hover:text-white">
                    {phone}
                  </a>
                ) : (
                  <span>{company.contact.phones[0] ?? ''}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-t border-white/15" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/75 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
          </p>
          <p className="text-center md:text-right">CNPJ {company.contact.cnpj}</p>
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-white/75">
          {company.closingMessage}
        </p>
      </div>
    </footer>
  )
}

