import 'styles/global.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import {
	Bungee,
	Bungee_Inline,
	Bungee_Shade,
	Montserrat,
} from '@next/font/google'

const bungee = Bungee({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bungee',
})
const bungeeInline = Bungee_Inline({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bungee-inline',
})
const bungeeShade = Bungee_Shade({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bungee-shade',
})

/* TODO: Move to other pages */
const montserrat = Montserrat({
	weight: ['400', '600'],
	subsets: ['latin'],
	variable: '--font-montserrat',
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main
			className={`${bungee.variable} ${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable} font-sans`}
		>
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
		</main>
	)
}

export default MyApp
