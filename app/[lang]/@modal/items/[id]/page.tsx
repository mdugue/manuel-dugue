import { notFound } from 'next/navigation'
import { ItemDetail } from '@/app/components/item-detail'
import { Modal } from '@/app/components/modal'
import { getItem, items } from '@/app/[lang]/items/data'

export function generateStaticParams() {
  return items.map((item) => ({ id: item.id }))
}

export default async function ItemModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = getItem(id)
  if (!item) notFound()

  return (
    <Modal>
      <ItemDetail item={item} asDialog />
    </Modal>
  )
}
