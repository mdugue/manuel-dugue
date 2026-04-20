import { createMarkdownPdfRoute } from '@/app/components/markdown-pdf'

export const GET = createMarkdownPdfRoute({
  slug: 'curriculum-vitae',
  filename: 'curriculum-vitae-manuel-dugue.pdf',
  title: 'Curriculum Vitae — Manuel Dugué',
  author: 'Manuel Dugué',
  language: 'de-DE',
})
