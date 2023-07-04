import { SiGithub, SiLinkedin, SiTwitter } from '@icons-pack/react-simple-icons'
import ClaimCard from 'components/ClaimCard'
import DocumentsNavigation from 'components/DocumentsNavigation'
import LandingPageQuote from 'components/LandingPageQuote'
import { Metadata } from 'next'
import {
	Bungee,
	Bungee_Inline,
	Bungee_Shade,
	Montserrat,
} from 'next/font/google'
import Link from 'next/link'
import { Suspense } from 'react'
import { Person, WithContext } from 'schema-dts'
import './globals.css'
import { getDictionary } from 'get-dictionary'
import { Locale } from 'i18n-config'

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
})

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

export default function MyApp({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: Locale }
}) {
	return (
		<html
			lang={locale}
			className={`${bungee.variable} ${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable}`}
		>
			<body className="dark:from-black dark:to-gray-800 bg-gradient-to-b from-gray-200 to-white min-h-screen flex flex-col pb-40">
				<LegalSection locale={locale} />
				<div className="m-auto flex items-start flex-col lg:flex-row">
					<ClaimCard />
					<Suspense
						fallback={
							<div className="text-gray-400 font-display">
								Loading GPT Quote...
							</div>
						}
					>
						{/* <LandingPageQuote /> */}
					</Suspense>
				</div>
				<DocumentsNavigation />
				<div className="lg:fixed bottom-0 left-0 mb-4 ml-6">
					<ContactAside />
				</div>
				{children}
			</body>
		</html>
	)
}

function ContactAside() {
	return (
		<aside className="md:bottom-12 md:left-0 flex flex-col">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="flex text-gray-300 dark:text-gray-500 mb-2">
				<a
					className="mr-2 hover:text-teal-400"
					href="https://www.linkedin.com/in/manuel-dugue/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<SiLinkedin className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://twitter.com/mdugue"
					target="_blank"
					rel="noopener noreferrer"
				>
					<SiTwitter className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://github.com/mdugue"
					target="_blank"
					rel="noopener noreferrer"
				>
					<SiGithub className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
			</div>
			<div className="text-gradient bg-gradient-to-tr from-indigo-500 to-teal-400 font-display text-2xl">
				Manuel Dugué
			</div>
		</aside>
	)
}

async function LegalSection(props: { locale: Locale }) {
	const { locale } = props
	const dictionary = await getDictionary(locale)
	return (
		<nav className="font-display md:left-auto md:top-4 flex md:flex-col md:text-right text-gray-300 dark:text-gray-500 p-4">
			<Link
				href="/legal"
				prefetch={false}
				locale={locale}
				className="mb-2 hover:text-gray-400 mx-2"
			>
				{dictionary.legal}
			</Link>
			<Link
				href="/privacy"
				prefetch={false}
				locale={locale}
				className="mb-2 hover:text-gray-400 mx-2"
			>
				{dictionary.privacy}
			</Link>
		</nav>
	)
}

const jsonLd: WithContext<Person> = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Manuel Dugué',
	birthDate: '1981-09-12',
	birthPlace: {
		'@type': 'City',
		name: 'Berlin',
	},
	nationality: ['German', 'French'],
	email: 'mail@manuel.fyi',
	url: 'https://manuel.fyi',
	brand: 'Handcrafting Web Experiences for Everybody',
	sameAs: [
		'https://www.linkedin.com/in/mdugue',
		'https://www.xing.com/profile/Manuel_Dugue',
		'https://github.com/mdugue',
		'https://www.instagram.com/manuel.dugue/',
		'https://www.facebook.com/manuel.dugue/',
	],
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Dresden',
		postalCode: '01099',
		addressCountry: 'Germany',
	},
	knowsLanguage: [
		'German',
		'French',
		'English',
		'Spanish',
		'Portuguese',
		'Dutch',
	],
	knowsAbout: [
		'TypeScript',
		'JavaScript',
		'React',
		'Next.js',
		'Svelte',
		'GraphQL',
		'InfoVis',
		'Maps',
		'GEO',
		'SVG',
		'JSON',
		'CSS',
		'LESS',
		'SASS',
		'WebGL',
		'XML',
		'XSLT',
	],
	hasOccupation: {
		'@type': 'Occupation',
		name: 'Media Computer Scientist',
		occupationLocation: {
			'@type': 'Country',
			name: ['Germany', 'France', 'Spain', 'England', 'Portugal'],
		},
	},
	disambiguatingDescription: 'Media Computer Scientist',
	hasCredential: {
		'@type': 'EducationalOccupationalCredential',
		credentialCategory: 'Diploma',
	},
	alumniOf: {
		'@type': 'EducationalOrganization',
		name: 'TU Dresden',
		sameAs: ['https://tu-dresden.de', 'https://wikipedia.org/wiki/TU_Dresden'],
	},
	award: [
		'Arctic Code Vault Contributor',
		"2nd Place Photo Competition 'Go-Out Studying'",
		'1st Price Logo Pitch at Microcomputer Chair',
	],
}

export const metadata: Metadata = {
	title: {
		template: '%s – Manuel Dugué',
		default: 'Manuel Dugué – Freelance Web Development',
	},
	alternates: { canonical: `https://manuel.fyi/` },
	description:
		'Handcrafting web experiences since 2008. Teaching, analyzing, coding. For consumers, experts & bots.',
	openGraph: {
		url: 'https://manuel.fyi/',
		title: "default: 'Manuel Dugué – Freelance Web Development",
		siteName: 'Manuel Dugué – freelance web developer',
	},
	twitter: {
		creator: '@mdugue',
		site: '@mdugue',
		card: 'summary_large_image',
	},
	applicationName: 'Portfolio of Manuel Dugué',
	referrer: 'origin-when-cross-origin',
	keywords: [
		'Web Development',
		'React',
		'Next.js',
		'TypeScript',
		'SEO',
		'Accessibility',
		'Performance',
		'Design',
	],
}
