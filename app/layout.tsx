import {
	Bungee,
	Bungee_Inline,
	Bungee_Shade,
	Montserrat,
} from '@next/font/google'
import { NextSeo } from 'next-seo'
import 'styles/global.css'

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
	subsets: ['latin'],
	variable: '--font-montserrat',
})

function MyApp({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${bungee.variable} ${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable} font-sans`}
		>
			<head>
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
			</head>
			<body>{children}</body>
		</html>
	)
}

export default MyApp
