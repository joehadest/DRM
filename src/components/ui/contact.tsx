import * as React from 'react'
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

import { company } from '../../lib/company'
import { buildWhatsAppLink } from '../../lib/links'
import {
  composeWhatsAppFromContactForm,
  getContactServiceOptions,
  type ContactFormPayload,
} from '../../lib/whatsapp-contact-form'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { Container } from '../ui'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'

/** Posições fixas (sem Math.random) para evitar diferenças de hidratação. */
const BUBBLE_PRESETS = [
  { w: 11, top: 78, left: 4, dur: 20, delay: 0, drift: 18 },
  { w: 16, top: 88, left: 14, dur: 26, delay: 2, drift: -28 },
  { w: 9, top: 70, left: 22, dur: 17, delay: 4, drift: 22 },
  { w: 13, top: 82, left: 34, dur: 23, delay: 1, drift: -14 },
  { w: 14, top: 90, left: 48, dur: 21, delay: 6, drift: 32 },
  { w: 10, top: 74, left: 58, dur: 19, delay: 3, drift: -22 },
  { w: 17, top: 86, left: 68, dur: 24, delay: 5, drift: 12 },
  { w: 12, top: 80, left: 78, dur: 22, delay: 2, drift: -30 },
  { w: 15, top: 92, left: 88, dur: 27, delay: 7, drift: 24 },
  { w: 8, top: 72, left: 92, dur: 16, delay: 1, drift: -18 },
  { w: 13, top: 68, left: 42, dur: 21, delay: 8, drift: 26 },
  { w: 11, top: 76, left: 52, dur: 18, delay: 4, drift: -10 },
  { w: 18, top: 84, left: 8, dur: 25, delay: 6, drift: 20 },
  { w: 10, top: 88, left: 38, dur: 19, delay: 9, drift: -24 },
  { w: 14, top: 70, left: 62, dur: 23, delay: 0, drift: 14 },
] as const

function optionId(option: string) {
  return `svc-${option.normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/gi, '')}`
}

export interface ContactSectionProps {
  title?: string
  mainMessage?: string
  whatsappPhone?: string
  backgroundImageSrc?: string
  onSubmit?: (data: ContactFormPayload) => void
}

export function ContactSection({
  title = 'Vamos tirar seu projeto do papel',
  mainMessage = 'Fale com a DRM',
  whatsappPhone = company.contact.phones[0] ?? '',
  backgroundImageSrc,
  onSubmit,
}: ContactSectionProps) {
  const serviceOptions = getContactServiceOptions()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: [] as string[],
  })
  const [serviceError, setServiceError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setServiceError(false)
    setFormData((prev) => {
      const cur = prev.projectType
      if (checked) return { ...prev, projectType: [...cur, type] }
      return { ...prev, projectType: cur.filter((t) => t !== type) }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.projectType.length === 0) {
      setServiceError(true)
      return
    }
    setServiceError(false)
    const payload: ContactFormPayload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      projectType: formData.projectType,
    }
    onSubmit?.(payload)
    const text = composeWhatsAppFromContactForm(payload)
    window.open(
      buildWhatsAppLink(whatsappPhone, text),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section
      id="contato"
      className="relative w-full scroll-mt-24 overflow-hidden bg-drm-blue-950"
    >
      {backgroundImageSrc ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImageSrc})` }}
          aria-hidden
        />
      ) : null}
      {/* Subtle floating particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {BUBBLE_PRESETS.map((b, i) => (
          <div
            key={i}
            className="drm-contact-bubble absolute rounded-full bg-drm-yellow-500/10"
            style={
              {
                width: b.w,
                height: b.w,
                top: `${b.top}%`,
                left: `${b.left}%`,
                ['--bubble-dur' as string]: `${b.dur}s`,
                ['--bubble-delay' as string]: `${b.delay}s`,
                ['--bubble-drift' as string]: `${b.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: headline */}
            <div className="flex flex-col justify-center px-1">
              <p className="text-xs font-semibold tracking-[0.22em] text-drm-yellow-500">
                CONTATO
              </p>
              <h2 className="mt-3 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                Conte o que precisa: retornamos pelo{' '}
                <span className="font-semibold text-drm-yellow-500">WhatsApp</span>{' '}
                com agilidade — sem e-mail corporativo, atendimento direto com a
                equipe.
              </p>
            </div>

            {/* Right: form card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                {mainMessage}{' '}
                <span aria-hidden className="inline-block">
                  👋
                </span>
              </h3>

              <div className="mt-6 border-b border-white/10 pb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm font-semibold text-white/80">
                  {whatsappPhone}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <p className="text-sm text-white/50">
                  Preencha para gerarmos uma mensagem pronta no WhatsApp.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-white/70">Seu nome</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-drm-yellow-500/60 focus-visible:ring-drm-yellow-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-white/70">E-mail (opcional)</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-drm-yellow-500/60 focus-visible:ring-drm-yellow-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-white/70">
                    Conte brevemente sua necessidade
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Local, prazo, tipo de obra…"
                    className="min-h-[100px] border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-drm-yellow-500/60 focus-visible:ring-drm-yellow-500/20"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-white/80">
                    Serviços de interesse{' '}
                    <span className="font-normal text-white/40">
                      (marque um ou mais)
                    </span>
                  </p>
                  {serviceError ? (
                    <p className="text-sm font-medium text-red-400" role="alert">
                      Selecione ao menos um serviço.
                    </p>
                  ) : null}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {serviceOptions.map((option) => {
                      const cid = optionId(option)
                      return (
                        <div
                          key={option}
                          className={cn(
                            'flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-colors duration-200',
                            formData.projectType.includes(option)
                              ? 'border-drm-yellow-500/40 bg-drm-yellow-500/10'
                              : 'hover:bg-white/10',
                          )}
                        >
                          <Checkbox
                            id={cid}
                            checked={formData.projectType.includes(option)}
                            onCheckedChange={(v) =>
                              handleCheckboxChange(option, v === true)
                            }
                            className="border-white/30 data-[state=checked]:border-drm-yellow-500 data-[state=checked]:bg-drm-yellow-500 data-[state=checked]:text-drm-blue-950"
                          />
                          <Label
                            htmlFor={cid}
                            className="cursor-pointer text-sm font-normal leading-snug text-white/70"
                          >
                            {option}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-drm-yellow-500 font-bold text-drm-blue-950 hover:bg-drm-yellow-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar pelo WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
