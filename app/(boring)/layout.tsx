import Sheet from 'components/Sheet'

export default function BoringLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Sheet>
			<div className="prose lg:prose-lg prose-headings:font-display prose-headings:text-amber-500">
				{children}
			</div>
		</Sheet>
	)
}
