import { createMarkdownPdfRoute } from '@/app/components/markdown-pdf'

export const GET = createMarkdownPdfRoute({
  slug: 'imprint',
  filenameBase: 'imprint-manuel-dugue',
  author: 'Manuel Dugué',
  getDocMeta: (dict) => dict.portfolio.legal.imprint,
})
