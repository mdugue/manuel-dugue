import 'styles/global.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo
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
			<Component {...pageProps} />;
		</>
	)
}

export default MyApp
