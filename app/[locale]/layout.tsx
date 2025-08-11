import {
	RiCupFill,
	RiGithubFill,
	RiLinkedinBoxFill,
	RiOpenaiFill,
	RiTwitterXFill,
} from '@remixicon/react';
import type { Metadata } from 'next';
import {
	Bungee,
	Bungee_Inline,
	Bungee_Shade,
	Montserrat,
} from 'next/font/google';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Person, WithContext } from 'schema-dts';
import type { LocalePageType } from '@/[locale]/locale-page-type';
import ClaimCard from '@/claim-card';
import DocumentsNavigation from '@/documents-navigation';
import { getDictionary } from '@/get-dictionary';
import { i18n, type Locale } from '@/i18n-config';
import LandingPageQuote from '@/landing-page-quote';
import LocaleSwitcher from '@/locale-switcher';
import './globals.css';
import { ErrorBoundary } from 'react-error-boundary';

export const runtime = 'edge';
export const revalidate = 60; // 1 minute

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
});

const bungee = Bungee({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bungee',
});
const bungeeInline = Bungee_Inline({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bungee-inline',
});
const bungeeShade = Bungee_Shade({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bungee-shade',
});

export default async function MyApp({
	children,
	params,
}: LocalePageType & {
	children: React.ReactNode;
}) {
	const { locale } = await params;
	return (
		<html
			className={`${bungee.variable} ${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable}`}
			lang={locale}
		>
			<body className="flex min-h-screen flex-col bg-linear-to-b from-gray-100 to-white pb-40 dark:from-black dark:to-gray-800">
				<LegalSection locale={locale} />
				<div className="m-auto flex flex-col items-start gap-2 lg:flex-row">
					<ClaimCard />
					<Suspense
						fallback={
							<div className="animate-pulse font-display text-gray-400">
								<RiOpenaiFill className="inline size-4" /> GPT 4.1 reading my
								Skill Profile …
							</div>
						}
					>
						<ErrorBoundary
							fallback={
								<div
									className="belowMd:transform-none! contact prose lg:-ml-12 mx-2 mb-8 max-w-xl whitespace-break-spaces rounded-lg border border-pink-500 bg-linear-to-tl from-fuchsia-500 to-pink-400 px-6 py-5 font-medium prose-strong:font-bold prose-headings:text-amber-100 text-amber-50 shadow-xl md:mx-auto md:rounded-3xl md:px-10 md:py-9 dark:from-amber-800 dark:to-yellow-500"
									style={{
										transform:
											'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
									}}
								>
									<div>ohhhhhh noooooo</div>
									<h2 className="flex items-center gap-2 font-display">
										<RiCupFill /> What&apos;s the deal?
									</h2>
									<p>
										We&apos;ve likely reached our conversation limit with our AI
										assistant. This typically refreshes within 24 hours, but
										feel free to try again in a few minutes – sometimes these
										limits reset sooner than expected!
									</p>
									<p>
										Or{' '}
										<a className="text-inherit" href="mailto:mail@manuel.fyi">
											contact me directly
										</a>{' '}
										to get a personal summary.
									</p>
								</div>
							}
						>
							<LandingPageQuote locale={locale} />
						</ErrorBoundary>
					</Suspense>
				</div>
				<DocumentsNavigation locale={locale} />
				<div className="bottom-0 left-0 mb-4 ml-6 lg:fixed">
					<ContactAside />
				</div>
				{children}
			</body>
		</html>
	);
}

function ContactAside() {
	return (
		<aside className="flex flex-col md:bottom-12 md:left-0">
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<div className="mb-2 flex text-gray-300 dark:text-gray-500">
				<a
					className="mr-2 hover:text-teal-400"
					href="https://www.linkedin.com/in/manuel-dugue/"
					rel="noopener noreferrer"
					target="_blank"
				>
					<RiLinkedinBoxFill className="coarse:h-12 h-6 coarse:w-12 w-6" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://twitter.com/mdugue"
					rel="noopener noreferrer"
					target="_blank"
				>
					<RiTwitterXFill className="coarse:h-12 h-6 coarse:w-12 w-6" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://github.com/mdugue"
					rel="noopener noreferrer"
					target="_blank"
				>
					<RiGithubFill className="coarse:h-12 h-6 coarse:w-12 w-6" />
				</a>
			</div>
			<div className="bg-linear-to-tr from-indigo-500 to-teal-400 font-display text-2xl text-gradient">
				Manuel Dugué
			</div>
		</aside>
	);
}

async function LegalSection(props: { locale: Locale }) {
	const { locale } = props;
	const dictionary = await getDictionary(locale);
	return (
		<nav className="mx-2 flex gap-x-2 p-4 font-display coarse:text-lg text-gray-300 md:top-4 md:left-auto md:flex-col md:items-end md:text-right dark:text-gray-500">
			<LocaleSwitcher className="flex gap-2" currentLocale={locale} />
			<Link
				className="hover:text-gray-400"
				href={`${locale}/legal`}
				prefetch={false}
			>
				{dictionary.legal}
			</Link>
			<Link
				className="hover:text-gray-400"
				href={`${locale}/privacy`}
				prefetch={false}
			>
				{dictionary.privacy}
			</Link>
		</nav>
	);
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
};

export async function generateMetadata({
	params,
}: LocalePageType): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: {
			template: '%s – Manuel Dugué',
			default: 'Manuel Dugué – Freelance Web Development',
		},
		alternates: {
			canonical: `https://manuel.fyi/${locale}`,
			languages: Object.fromEntries(
				i18n.locales.map((locale) => [locale, `https://manuel.fyi/${locale}`])
			),
		},
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
	};
}
