import type { LucideIcon } from 'lucide-react'
import {
  HardHat,
  ShieldCheck,
  Flame,
  Factory,
  Construction,
  Wrench,
  Paintbrush,
  Settings,
} from 'lucide-react'

/** Slides do carrossel “Projetos/Serviços” — troque textos/imagens quando tiver fotos reais. */
export type ProjectSlide = {
  id: string
  label: string
  description: string
  /** URL opcional; sem imagem usa placeholder em gradiente (industrial). */
  image?: string
  icon: LucideIcon
}

export const PROJECT_SLIDES: ProjectSlide[] = [
  {
    id: 'montagem-industrial',
    label: 'Montagem industrial',
    description:
      'Execução em campo com foco em segurança, qualidade e produtividade para paradas e rotinas de manutenção.',
    icon: HardHat,
    image: '/projetos/montagem industrial.jpeg',
  },
  {
    id: 'manutencao-industrial',
    label: 'Manutenção industrial',
    description:
      'Manutenção preventiva e corretiva, com planejamento e equipe qualificada para ambientes industriais.',
    icon: Wrench,
    image: '/projetos/manutencao-industrial.jpeg',
  },
  {
    id: 'caldeiraria',
    label: 'Caldeiraria e fabricação',
    description:
      'Fabricação e montagem de componentes e estruturas conforme projeto, com controle dimensional e acabamento.',
    icon: Factory,
    image: '/projetos/caldeiraria.jpeg',
  },
  {
    id: 'refratarios',
    label: 'Refratários',
    description:
      'Aplicação e manutenção de refratários para operação segura em altas temperaturas.',
    icon: Flame,
    image: '/projetos/refratarios.jpeg',
  },
  {
    id: 'isolamento-termico',
    label: 'Isolamento térmico',
    description:
      'Aplicação de isolamento térmico em tubulações, equipamentos e áreas críticas, reduzindo perdas e aumentando eficiência.',
    icon: ShieldCheck,
    image: '/projetos/isolamento-termico.jpeg',
  },
  {
    id: 'andaimes-acesso',
    label: 'Andaimes e acesso',
    description:
      'Montagem e desmontagem com segurança, inspeções e adequação às normas para trabalhos em altura.',
    icon: Construction,
    image: 'projetos/andaimes e acesso/andaimes e acesso.jpeg',
  },
  {
    id: 'pintura-industrial',
    label: 'Pintura industrial',
    description:
      'Preparação de superfície e pintura com foco em proteção anticorrosiva e durabilidade.',
    icon: Paintbrush,
    image: '/projetos/pintura industrial/pintura industrial .jpeg',
  },
  {
    id: 'estruturas-metalicas',
    label: 'Estruturas metálicas',
    description:
      'Montagem de estruturas metálicas com precisão, rastreabilidade e atendimento a especificações de projeto.',
    icon: Settings,
    image: 'projetos/estruturas metalicas/estruturas metalicas.jpeg',
  },
]
