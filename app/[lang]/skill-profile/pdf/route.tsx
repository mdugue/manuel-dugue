import { createMarkdownPdfRoute } from '@/app/components/markdown-pdf'

export const GET = createMarkdownPdfRoute({
  slug: 'skill-profile',
  filenameBase: 'skill-profile-manuel-dugue',
  author: 'Manuel Dugué',
  titles: {
    en: 'Skill Profile — Manuel Dugué',
    de: 'Kompetenzprofil — Manuel Dugué',
    fr: 'Profil de compétences — Manuel Dugué',
    es: 'Perfil de competencias — Manuel Dugué',
  },
})
