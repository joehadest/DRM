/** Vídeos hospedados em `public/projetos/videos/` — nomes com acentos preservados na URL codificada. */
export const DRM_SLIDE_VIDEO_SRC = '/projetos/videos/slide.mp4'

export const DRM_CANTEIRO_PADRAO_VIDEO_SRC = encodeURI(
  '/projetos/videos/canteiro padrão da drm.mp4',
)

export const drmSlideSpotlight = {
  title: 'DRM — Conheça a empresa',
  description:
    'Uma visão geral da DRM: nossa história, estrutura, equipe e os segmentos em que atuamos com excelência.',
  items: [
    { id: 's1', text: 'Empresa especializada em montagem e manutenção industrial' },
    { id: 's2', text: 'Equipe técnica qualificada e comprometida com a segurança' },
    { id: 's3', text: 'Atuação em múltiplos segmentos da indústria' },
    { id: 's4', text: 'Soluções completas do planejamento à entrega' },
  ],
  videoUrl: DRM_SLIDE_VIDEO_SRC,
} as const

export const drmCanteiroSpotlight = {
  title: 'Canteiro padrão DRM — fabricação de peças de campo',
  description:
    'Registro do nosso padrão de canteiro para fabricação de peças de campo, com ênfase em funilaria e montagem industrial.',
  items: [
    { id: 'f1', text: 'Organização do canteiro e fluxo de fabricação' },
    { id: 'f2', text: 'Funilaria: conformação e acabamento de chapas metálicas' },
    {
      id: 'f3',
      text: 'Peças de campo sob demanda para montagens industriais',
    },
    {
      id: 'f4',
      text: 'Integração com montagem e demais serviços da DRM',
    },
  ],
  videoUrl: DRM_CANTEIRO_PADRAO_VIDEO_SRC,
} as const
