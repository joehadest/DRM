import { ContatoFooter } from './components/ContatoFooter.tsx'
import { HeaderHero } from './components/HeaderHero.tsx'
import { Portfolio } from './components/Portfolio.tsx'
import { Projetos } from './components/Projetos.tsx'
import { Servicos } from './components/Servicos.tsx'
import { Sobre } from './components/Sobre.tsx'

export default function App() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <HeaderHero />
      <main>
        <Sobre />
        <Servicos />
        <Projetos />
        <Portfolio />
        <ContatoFooter />
      </main>
    </div>
  )
}
