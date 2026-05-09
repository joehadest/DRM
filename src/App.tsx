import { useEffect } from 'react'
import { ContatoFooter } from './components/ContatoFooter.tsx'
import { HeaderHero } from './components/HeaderHero.tsx'
import { Portfolio } from './components/Portfolio.tsx'
import { Projetos } from './components/Projetos.tsx'
import { Servicos } from './components/Servicos.tsx'
import { Sobre } from './components/Sobre.tsx'
import { Videos } from './components/Videos.tsx'
import { initSmoothAnchorNavigation } from './lib/smooth-anchor-navigation.ts'

export default function App() {
  useEffect(() => initSmoothAnchorNavigation(), [])

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <HeaderHero />
      <main>
        <Servicos />
        <Projetos />
        <Videos />
        <Portfolio />
        <Sobre />
        <ContatoFooter />
      </main>
    </div>
  )
}
