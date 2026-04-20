import { createMarkdownPdfRoute } from '@/app/components/markdown-pdf'

export const GET = createMarkdownPdfRoute({
  slug: 'skill-profile',
  filenameBase: 'skill-profile-manuel-dugue',
  author: 'Manuel Dugué',
  getDocMeta: (dict) => dict.portfolio.docs.profile,
})
