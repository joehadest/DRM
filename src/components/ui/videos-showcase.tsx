import { useMemo, useRef, useState } from 'react'
import { Play, Pause, BadgeCheck } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from './button'

export type VideoShowcaseItem = { id: string; text: string }

export type VideoShowcaseProps = {
  title: string
  description: string
  items: VideoShowcaseItem[]
  videoUrl: string
  className?: string
}

export function VideoShowcase({
  title,
  description,
  items,
  videoUrl,
  className,
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const safeItems = useMemo(() => items.filter(Boolean).slice(0, 8), [items])

  const togglePlayback = async () => {
    const el = videoRef.current
    if (!el) return
    try {
      if (el.paused) {
        await el.play()
        setIsPlaying(true)
      } else {
        el.pause()
        setIsPlaying(false)
      }
    } catch {
      // Autoplay / play() pode ser bloqueado; mantém UI sem quebrar.
      setIsPlaying(false)
    }
  }

  return (
    <div className={cn('grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12', className)}>
      <div className="lg:col-span-6">
        <div className="drm-card-interactive relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-sm shadow-slate-900/10">
          <video
            ref={videoRef}
            className="h-[22rem] w-full object-cover md:h-[26rem]"
            src={videoUrl}
            controls={false}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.10),rgba(2,6,23,0.65),rgba(2,6,23,0.85))] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isPlaying ? 'opacity-40' : 'opacity-100',
            )}
          />

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6 md:p-7">
            <div
              className={cn(
                'min-w-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isPlaying
                  ? 'pointer-events-none translate-y-2 opacity-0'
                  : 'translate-y-0 opacity-100',
              )}
              aria-hidden={isPlaying}
            >
              <h3 className="truncate text-lg font-extrabold tracking-tight text-white md:text-xl">
                {title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                {description}
              </p>
            </div>
            <Button
              type="button"
              size="icon"
              onClick={togglePlayback}
              className="h-12 w-12 shrink-0 rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/25"
              aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="flex h-full flex-col justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm md:p-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-drm-yellow-500">
              NOSSO TRABALHO EM VÍDEO
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Bastidores, padrão e entrega
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Veja como organizamos o canteiro, a fabricação e a execução em campo — com foco em
              segurança, qualidade e produtividade.
            </p>

            <div className="mt-8 grid gap-3">
              {safeItems.map((it) => (
                <div
                  key={it.id}
                  className="drm-card-interactive-sm group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                >
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-drm-yellow-500 transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-sm leading-relaxed text-white/75">{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

