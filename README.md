# DRM SERVIÇOS — Site (React + Vite)

Site institucional da **D.R.M SERVIÇOS**.

## Como rodar

```bash
npm install
npm run dev
```

## Conteúdo editável (rápido)

- **Serviços (grade)**: `src/components/Servicos.tsx`
- **Serviços em destaque (carrossel / seção “Projetos”)**: `src/data/projects.ts`
- **Ordem das seções da página**: `src/App.tsx`
- **Contato / WhatsApp / Telefones**: `src/lib/company.ts` e `src/components/ContatoFooter.tsx`

## Adicionando fotos nos “Serviços em destaque”

As imagens ficam em `public/projetos/` e são referenciadas no carrossel em `src/data/projects.ts` via caminho web (começando com `/projetos/...`).

Exemplo:

- Arquivo: `public/projetos/refratarios.jpeg`
- Referência no código: `image: '/projetos/refratarios.jpeg'`

### Dica de organização (nomes de arquivo)

Evite nomes do WhatsApp. Prefira nomes curtos e descritivos, por exemplo:

- `isolamento-termico.jpeg`
- `manutencao-industrial.jpeg`
- `caldeiraria.jpeg`

Depois do rename, atualize o caminho em `src/data/projects.ts`.

## Contatos atuais

- **Sócio**: (84) 9 9147-3206
- **Empresa**: (81) 9 8183-5789
