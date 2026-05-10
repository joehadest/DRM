import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from './button'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from './carousel'

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

export function Gallery4({
  title,
  description,
  items,
}: Gallery4Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-14 md:py-18 lg:py-20">
      {title || description ? (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between md:mb-12">
            <div className="flex flex-col gap-3">
              {title ? (
                <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="w-full">
        <div className="relative">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              breakpoints: {
                '(max-width: 768px)': {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="max-w-[320px] pl-[20px] lg:max-w-[380px]"
                >
                  <a
                    href={item.href}
                    className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drm-yellow-500/60"
                  >
                    <div className="relative h-full min-h-[26rem] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm shadow-slate-900/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.06]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.10),rgba(2,6,23,0.55),rgba(2,6,23,0.82))]" />

                      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-7">
                        <div className="mb-2 text-xl font-extrabold leading-snug tracking-tight md:text-2xl">
                          {item.title}
                        </div>
                        <div className="line-clamp-2 text-sm leading-relaxed text-white/80">
                          {item.description}
                        </div>
                        <div className="mt-6 flex items-center text-sm font-semibold text-white/90">
                          Ver detalhes
                          <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-3 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="pointer-events-auto disabled:pointer-events-auto bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/15 transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-white"
              aria-label="Voltar"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="pointer-events-auto disabled:pointer-events-auto bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/15 transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-white"
              aria-label="Avançar"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-drm-blue-800' : 'bg-slate-300'
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

