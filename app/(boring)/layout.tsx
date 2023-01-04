import Sheet from 'components/Sheet'
import { NextSeo } from 'next-seo'

export default function BoringLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<NextSeo nofollow noindex useAppDir />
			<Sheet>
				<div className="prose lg:prose-lg prose-headings:font-display prose-headings:text-amber-500">
					{children}
				</div>
			</Sheet>
		</>
	)
}
