import * as React from 'react'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { GetStartedButton } from './get-started-button'

interface NavLink {
  label: string
  href: string
}

export interface AnimatedHeroProps {
  backgroundImageUrl: string
  logo: React.ReactNode
  navLinks: NavLink[]
  topRightAction?: React.ReactNode
  title: string
  description: string
  ctaButton: {
    text: string
    onClick: () => void
  }
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const easeOut = [0.16, 1, 0.3, 1] as const

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

export function AnimatedHero({
  backgroundImageUrl,
  logo,
  navLinks,
  topRightAction,
  title,
  description,
  ctaButton,
  className,
}: AnimatedHeroProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [isHeroVisible, setIsHeroVisible] = React.useState(true)
  const [isFooterVisible] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>('')
  const [scrollProgress, setScrollProgress] = React.useState(0)

  // Hero visibility
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { root: null, threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])


  // Active section tracking
  React.useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )
      io.observe(el)
      observers.push(io)
    })

    return () => observers.forEach((io) => io.disconnect())
  }, [navLinks])

  // Scroll progress bar
  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrolled = !isHeroVisible
  const hiddenOnFooter = isFooterVisible

  const handleMobileLink = (href: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 260)
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-slate-950',
        className,
      )}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(15,111,160,0.35),transparent_60%),radial-gradient(60%_60%_at_12%_12%,rgba(245,196,0,0.22),transparent_55%),radial-gradient(60%_60%_at_88%_18%,rgba(11,63,119,0.30),transparent_55%)]" />
      </div>

      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        data-scrolled={scrolled ? 'true' : 'false'}
        className={cn(
          'group fixed top-0 z-30 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out',
          hiddenOnFooter && 'pointer-events-none -translate-y-[120%] opacity-0',
          scrolled
            ? 'border-b border-white/8 bg-drm-blue-950/80 shadow-lg shadow-black/20 backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        {/* Inner row — height shrinks from 72px to 56px when scrolled */}
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[height,padding] duration-300 ease-out sm:px-8',
            scrolled ? 'h-14' : 'h-[72px]',
          )}
        >
          {/* Logo — scale down slightly when scrolled */}
          <div
            className={cn(
              'flex shrink-0 items-center gap-3 transition-transform duration-300 ease-out',
              scrolled ? 'scale-90 origin-left' : 'scale-100',
            )}
          >
            {logo}
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'group relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200',
                    isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white',
                  )}
                >
                  {link.label}
                  {/* Active / hover underline */}
                  <span
                    className={cn(
                      'absolute inset-x-3 bottom-1 h-[2px] rounded-full transition-all duration-200',
                      isActive
                        ? 'scale-x-100 bg-drm-yellow-500'
                        : 'scale-x-0 origin-left group-hover:scale-x-100',
                      'bg-drm-yellow-500',
                    )}
                  />
                </a>
              )
            })}
          </nav>

          {/* Desktop action + mobile hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">{topRightAction}</div>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        {scrolled && (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-drm-yellow-500"
              style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
              transition={{ duration: 0.05 }}
            />
          </div>
        )}

        {/* ── MOBILE MENU PANEL ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: easeOut }}
              className="border-t border-white/10 bg-drm-blue-950/90 px-5 pb-6 pt-3 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const id = link.href.replace('#', '')
                  const isActive = activeSection === id
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04, ease: easeOut }}
                      onClick={(e) => {
                        e.preventDefault()
                        handleMobileLink(link.href)
                      }}
                      className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-150',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/65 hover:bg-white/8 hover:text-white',
                    )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full transition-colors duration-200',
                          isActive ? 'bg-drm-yellow-500' : 'bg-white/30',
                        )}
                      />
                      {link.label}
                      {isActive && (
                        <span className="ml-auto text-[10px] font-bold tracking-widest text-drm-yellow-500">
                          ●
                        </span>
                      )}
                    </motion.a>
                  )
                })}
              </nav>

              {topRightAction && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  {topRightAction}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO CONTENT ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-5xl flex-col items-start justify-center px-6 pt-14 text-left text-white md:px-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {description}
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-x-4">
          <GetStartedButton
            label={ctaButton.text}
            onClick={ctaButton.onClick}
            className="bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

