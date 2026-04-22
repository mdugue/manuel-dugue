import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EB_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { hasLocale, localeParams } from '@/i18n/config'
import '../globals.css'

const ebGaramond = EB_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'manuel.fyi — Manuel Dugué',
  description:
    'Manuel Dugué — freelance technologist. Product, engineering, strategy; most often at the seam between them.',
}

export function generateStaticParams() {
  return localeParams()
}

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html
      lang={lang}
      className={`${ebGaramond.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body>
        {children}
        {modal}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="/stats/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            data-host-url="/stats"
            data-performance="true"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
