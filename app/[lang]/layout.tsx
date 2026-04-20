import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono } from 'next/font/google'
import { hasLocale, localeParams } from '@/i18n/config'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Manuel Dugué',
  description: 'Skill profile and curriculum vitae of Manuel Dugué.',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="root">{children}</div>
        {modal}
      </body>
    </html>
  )
}
