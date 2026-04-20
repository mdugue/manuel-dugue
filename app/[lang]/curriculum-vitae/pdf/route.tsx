import { createMarkdownPdfRoute } from '@/app/components/markdown-pdf'

export const GET = createMarkdownPdfRoute({
  slug: 'curriculum-vitae',
  filenameBase: 'curriculum-vitae-manuel-dugue',
  author: 'Manuel Dugué',
  titles: {
    en: 'Curriculum Vitae — Manuel Dugué',
    de: 'Lebenslauf — Manuel Dugué',
    fr: 'Curriculum Vitae — Manuel Dugué',
    es: 'Currículum Vitae — Manuel Dugué',
  },
})
