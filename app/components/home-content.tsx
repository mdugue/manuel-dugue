import { Button } from '@base-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { items } from '@/app/[lang]/items/data'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export function HomeContent({
  lang,
  dict,
}: {
  lang: Locale
  dict: Dictionary['home']
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {dict.instructions}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {dict.lookingForPrefix}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              {dict.templates}
            </a>
            {dict.or}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              {dict.learning}
            </a>
            {dict.centerSuffix}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            {dict.deployNow}
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.documentation}
          </a>
        </div>
        <Button className="flex items-center justify-center h-10 px-3.5 m-0 outline-0 border border-gray-200 rounded-md bg-gray-50 font-inherit text-base font-normal leading-6 text-gray-900 select-none hover:data-[disabled]:bg-gray-50 hover:bg-gray-100 active:data-[disabled]:bg-gray-50 active:bg-gray-200 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] active:border-t-gray-300 active:data-[disabled]:shadow-none active:data-[disabled]:border-t-gray-200 focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1 data-[disabled]:text-gray-500">
          {dict.submit}
        </Button>
        <section
          aria-labelledby="url-modals-heading"
          className="mt-4 flex w-full flex-col gap-4 sm:items-start"
        >
          <h2
            id="url-modals-heading"
            className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            {dict.modalsTitle}
          </h2>
          <p className="max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {dict.modalsHint}
          </p>
          <ul className="flex w-full flex-col gap-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${lang}/items/${item.id}` as Route}
                  className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-blue-700 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                >
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
