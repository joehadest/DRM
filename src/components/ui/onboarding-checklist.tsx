import { motion } from 'framer-motion'
import { CheckCircle2, PlayCircle } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Dialog, DialogContent, DialogTrigger } from './dialog'

function isHostedVideoEmbed(src: string) {
  return (
    /^https?:\/\//i.test(src) &&
    (/youtube\.com\/embed\//i.test(src) ||
      /youtube-nocookie\.com\/embed\//i.test(src) ||
      /player\.vimeo\.com\/video\//i.test(src))
  )
}

export interface ChecklistItem {
  id: number | string
  text: string
  helperText?: string
  helperLink?: {
    href: string
    text: string
  }
}

export interface OnboardingChecklistProps {
  title: string
  description: string
  items: ChecklistItem[]
  /** Só usado para vídeos embed (YouTube/Vimeo). Imagem de capa; arquivos MP4 usam o 1.º frame do vídeo. */
  videoThumbnailUrl?: string
  /** URL do vídeo: arquivo local (`/...`), ou embed (YouTube/Vimeo). */
  videoUrl: string
  className?: string
}

const easeOut = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOut,
      when: 'beforeChildren' as const,
      staggerChildren: 0.12,
    },
  },
}

const columnVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.42,
      ease: easeOut,
    },
  },
}

const columnVariantsRight = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.42,
      ease: easeOut,
    },
  },
}

function VideoModalPlayer({ src, title }: { src: string; title: string }) {
  if (isHostedVideoEmbed(src)) {
    return (
      <iframe
        src={src}
        title={title}
        className="h-full w-full rounded-lg bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    )
  }

  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      className="h-full w-full rounded-lg bg-black object-contain"
    >
      Seu navegador não suporta reprodução de vídeo HTML5.
    </video>
  )
}

export function OnboardingChecklist({
  title,
  description,
  items,
  videoThumbnailUrl,
  videoUrl,
  className,
}: OnboardingChecklistProps) {
  const thumbFromEmbed = isHostedVideoEmbed(videoUrl)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px' }}
      variants={containerVariants}
      className={cn(
        'drm-card-interactive-motion mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-slate-950 shadow-sm shadow-slate-900/5 md:grid-cols-2',
        className,
      )}
    >
        <motion.div variants={columnVariants} className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight text-drm-blue-950">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col">
                <div className="flex items-start">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="ml-3 text-sm font-medium leading-snug text-slate-800">
                    {item.text}
                  </span>
                </div>
                {item.helperText && item.helperLink ? (
                  <div className="ml-8 mt-1 text-xs text-slate-600">
                    {item.helperText}{' '}
                    <a
                      href={item.helperLink.href}
                      className="rounded-sm font-medium text-drm-blue-800 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-drm-yellow-500/60 focus:ring-offset-2"
                    >
                      {item.helperLink.text}
                    </a>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={columnVariantsRight}
          className="group relative aspect-video w-full overflow-hidden rounded-xl"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="relative inline-flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drm-yellow-500/70 focus-visible:ring-offset-2"
              >
                {thumbFromEmbed ? (
                  <img
                    src={videoThumbnailUrl ?? ''}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={videoUrl}
                    muted
                    playsInline
                    preload="metadata"
                    tabIndex={-1}
                    aria-hidden
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoadedData={(e) => {
                      const el = e.currentTarget
                      try {
                        el.pause()
                        el.currentTime = 0.001
                      } catch {
                        /* ignore */
                      }
                    }}
                  />
                )}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 transition-colors duration-300 group-hover:bg-black/40">
                  <PlayCircle className="h-16 w-16 text-white/90 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                </span>
                <span className="sr-only">Assistir vídeo em tela cheia</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl border border-white/15 bg-slate-950 p-4 shadow-2xl ring-0 [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100 [&>button]:focus:ring-offset-slate-950">
              <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
                <VideoModalPlayer src={videoUrl} title={title} />
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
    </motion.div>
  )
}
