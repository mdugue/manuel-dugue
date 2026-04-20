import { Dialog } from '@base-ui/react'
import type { Item } from '@/app/[lang]/items/data'

export function ItemDetail({ item, asDialog }: { item: Item; asDialog: boolean }) {
  const Title = asDialog ? Dialog.Title : 'h1'
  const Description = asDialog ? Dialog.Description : 'p'

  return (
    <article className="flex flex-col gap-3 pr-8">
      <Title className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {item.title}
      </Title>
      <Description className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </Description>
      <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.body}</p>
    </article>
  )
}
