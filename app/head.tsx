import { NextSeo } from 'next-seo'

export default function Head() {
	return (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<NextSeo
				useAppDir
				titleTemplate="Manuel Dugué – %s"
				title="freelance web developer"
				description="Handcrafting web experiences since 2008. Teaching, analyzing, coding. For consumers, experts & bots."
				openGraph={{
					locale: 'en_EN',
					url: 'https://manuel.fyi/',
					site_name: 'Manuel Dugué – freelance web developer',
				}}
				twitter={{
					handle: '@mdugue',
					site: '@mdugue',
					cardType: 'summary_large_image',
				}}
			/>
		</>
	)
}
