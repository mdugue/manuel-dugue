import Content from './content'

export default async function DefaultPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <Content lang={lang} />
}
