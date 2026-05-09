/** Vídeo hospedado em `public/projetos/videos/` — nome do arquivo com acentos preservados na URL codificada. */
export const DRM_CANTEIRO_PADRAO_VIDEO_SRC = encodeURI(
  '/projetos/videos/canteiro padrão da drm.mp4',
)

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
