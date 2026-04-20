import { createMarkdownPdfRoute } from '@/app/components/markdown-pdf'

export const GET = createMarkdownPdfRoute({
  slug: 'skill-profile',
  filename: 'skill-profile-manuel-dugue.pdf',
  title: 'Skill Profile — Manuel Dugué',
  author: 'Manuel Dugué',
  language: 'de-DE',
})
