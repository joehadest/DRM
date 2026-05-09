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

const HERO_BG = '/logo%20e%20banner/banner%20DRM.png'

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
  backgroundImageSrc = HERO_BG,
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
      className="relative w-full scroll-mt-24 overflow-hidden border-t border-slate-200"
    >
      <div className="relative min-h-[min(100dvh,900px)] w-full">
        <div
          className="absolute inset-0 bg-white bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImageSrc})`,
            backgroundSize: '100% auto',
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.93),rgba(255,255,255,0.82)_48%,rgba(255,255,255,0.55)_100%)]" />

          <div
            className="absolute inset-0 z-0 overflow-hidden"
            aria-hidden
          >
            {BUBBLE_PRESETS.map((b, i) => (
              <div
                key={i}
                className="drm-contact-bubble absolute rounded-full bg-white/35"
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
        </div>

        <div className="relative z-10 py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-end px-1 pb-2 lg:pb-8">
                <p className="text-xs font-semibold tracking-[0.22em] text-slate-600">
                  CONTATO
                </p>
                <h2 className="mt-3 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-drm-blue-950 drop-shadow-sm sm:text-5xl lg:text-6xl">
                  {title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-700">
                  Conte o que precisa: retornamos pelo{' '}
                  <span className="font-semibold text-drm-blue-800">WhatsApp</span>{' '}
                  com agilidade — sem e-mail corporativo, atendimento direto com a
                  equipe.
                </p>
              </div>

              <div className="drm-card-interactive rounded-2xl border border-slate-200 bg-white/92 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-md md:p-8">
                <h3 className="text-xl font-bold text-slate-950 md:text-2xl">
                  {mainMessage}{' '}
                  <span aria-hidden className="inline-block">
                    👋
                  </span>
                </h3>

                <div className="mt-6 border-b border-slate-200 pb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    WhatsApp
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {whatsappPhone}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <p className="text-sm text-slate-600">
                    Preencha para gerarmos uma mensagem pronta no WhatsApp.
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Seu nome</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-mail (opcional)</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">
                      Conte brevemente sua necessidade
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Local, prazo, tipo de obra…"
                      className="min-h-[100px]"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={2000}
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-800">
                      Serviços de interesse{' '}
                      <span className="font-normal text-slate-500">
                        (marque um ou mais)
                      </span>
                    </p>
                    {serviceError ? (
                      <p className="text-sm font-medium text-red-600" role="alert">
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
                              'drm-card-interactive-sm flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5',
                              formData.projectType.includes(option) &&
                                'border-drm-blue-500/30 bg-white ring-1 ring-drm-yellow-500/25',
                            )}
                          >
                            <Checkbox
                              id={cid}
                              checked={formData.projectType.includes(option)}
                              onCheckedChange={(v) =>
                                handleCheckboxChange(option, v === true)
                              }
                            />
                            <Label
                              htmlFor={cid}
                              className="cursor-pointer text-sm font-normal leading-snug text-slate-800"
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
                    className="w-full gap-2 bg-drm-blue-800 hover:bg-drm-blue-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Enviar pelo WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
