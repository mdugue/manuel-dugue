import Content from './content'

export default async function Vanilla({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <Content lang={lang} />
}
