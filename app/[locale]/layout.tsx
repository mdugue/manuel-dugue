"use cache";
import {
	RiGithubFill,
	RiLinkedinBoxFill,
	RiMailLine,
	RiTwitterXFill,
} from "@remixicon/react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import {
	Bungee,
	Bungee_Inline,
	Bungee_Shade,
	Montserrat,
} from "next/font/google";
import Link from "next/link";
import type { Person, WithContext } from "schema-dts";
import AIQuoteStack from "@/ai-quote-stack";
import { AuroraText } from "@/aurora-text";
import ClaimCard from "@/claim-card";
import { getDictionary } from "@/get-dictionary";
import { assertLocale, i18n, type Locale } from "@/i18n-config";
import LocaleSwitcher from "@/locale-switcher";
import SkillsSection from "@/skills-section";
import SocialProof from "@/social-proof";
import { AnimatedThemeToggler } from "@/theme-toggler";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
});

const bungee = Bungee({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-bungee",
});
const bungeeInline = Bungee_Inline({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-bungee-inline",
});
const bungeeShade = Bungee_Shade({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-bungee-shade",
});

export default async function MyApp({
	children,
	params,
}: LayoutProps<"/[locale]">) {
	cacheLife("hours");
	const { locale } = await params;
	assertLocale(locale);
	return (
		<html
			className={`${bungee.variable} ${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable} scroll-smooth`}
			lang={locale}
			suppressHydrationWarning
		>
			<body className="min-h-screen bg-linear-to-b from-gray-50 to-white font-sans dark:from-gray-950 dark:to-gray-900">
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: theme init must run before paint
					dangerouslySetInnerHTML={{
						__html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')})()`,
					}}
				/>
				<div data-vaul-drawer-wrapper="">
					<StickyNav locale={locale} />

					{/* Hero Section */}
					<section className="flex min-h-[100svh] flex-col items-center justify-center px-4 pt-16 pb-8">
						<ClaimCard />
					</section>

					{/* AI Quote Section */}
					<section className="px-4 py-8 md:py-16">
						<AIQuoteStack locale={locale} />
					</section>

					{/* Social Proof */}
					<SocialProof />

					{/* Skills */}
					<SkillsSection />

					{/* Contact */}
					<ContactSection />

					{/* Footer */}
					<Footer locale={locale} />
				</div>

				{/* Drawer overlays render outside the wrapper so Vaul's
				    scale-background transform doesn't break position:fixed */}
				{children}

				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					type="application/ld+json"
				/>
			</body>
		</html>
	);
}

function StickyNav({ locale }: { locale: Locale }) {
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 border-gray-200/50 border-b bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-950/80">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
				<Link className="font-display text-lg md:text-xl" href={`/${locale}`}>
					<AuroraText
						colors={["#6366f1", "#2dd4bf", "#0d9488", "#818cf8"]}
						speed={0.5}
					>
						Manuel Dugué
					</AuroraText>
				</Link>
				<div className="flex items-center gap-3 text-sm md:gap-5">
					<Link
						className="font-inline text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
						href={`/${locale}/cv`}
						prefetch={false}
					>
						CV
					</Link>
					<Link
						className="font-inline text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
						href={`/${locale}/skill-profile`}
						prefetch={false}
					>
						Skill Profile
					</Link>
					<LocaleSwitcher
						className="flex gap-1.5 font-display text-xs"
						currentLocale={locale}
					/>
					<AnimatedThemeToggler />
				</div>
			</div>
		</nav>
	);
}

function ContactSection() {
	return (
		<section className="px-6 py-16 md:py-24">
			<div className="mx-auto max-w-md text-center">
				<h2 className="mb-6 font-display text-2xl md:text-3xl">
					<AuroraText
						colors={["#0d9488", "#2dd4bf", "#6366f1", "#38bdf8"]}
						speed={0.4}
					>
						Get in touch
					</AuroraText>
				</h2>
				<p className="mb-8 text-gray-500 dark:text-gray-400">
					Based in Dresden, Germany. Available for projects worldwide.
				</p>
				<a
					className="mb-10 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-teal-500 to-teal-400 px-8 py-3 font-display text-white shadow-lg transition-shadow hover:shadow-xl dark:from-teal-600 dark:to-teal-500"
					href="mailto:mail@manuel.fyi"
				>
					<RiMailLine className="size-5" />
					mail@manuel.fyi
				</a>
				<div className="flex justify-center gap-4 text-gray-300 dark:text-gray-600">
					<a
						className="rounded-full p-3 transition-colors hover:bg-teal-50 hover:text-teal-500 dark:hover:bg-teal-900/20 dark:hover:text-teal-400"
						href="https://www.linkedin.com/in/manuel-dugue/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<RiLinkedinBoxFill className="coarse:h-10 h-6 coarse:w-10 w-6" />
					</a>
					<a
						className="rounded-full p-3 transition-colors hover:bg-teal-50 hover:text-teal-500 dark:hover:bg-teal-900/20 dark:hover:text-teal-400"
						href="https://twitter.com/mdugue"
						rel="noopener noreferrer"
						target="_blank"
					>
						<RiTwitterXFill className="coarse:h-10 h-6 coarse:w-10 w-6" />
					</a>
					<a
						className="rounded-full p-3 transition-colors hover:bg-teal-50 hover:text-teal-500 dark:hover:bg-teal-900/20 dark:hover:text-teal-400"
						href="https://github.com/mdugue"
						rel="noopener noreferrer"
						target="_blank"
					>
						<RiGithubFill className="coarse:h-10 h-6 coarse:w-10 w-6" />
					</a>
				</div>
			</div>
		</section>
	);
}

async function Footer({ locale }: { locale: Locale }) {
	const dictionary = await getDictionary(locale);
	return (
		<footer className="border-gray-200/50 border-t px-6 py-8 dark:border-gray-800/50">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center text-gray-400 text-sm dark:text-gray-500">
				<div className="flex gap-4 font-display">
					<Link
						className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
						href={`/${locale}/legal`}
						prefetch={false}
					>
						{dictionary.legal}
					</Link>
					<Link
						className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
						href={`/${locale}/privacy`}
						prefetch={false}
					>
						{dictionary.privacy}
					</Link>
				</div>
				<p className="font-sans text-xs">
					Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
				</p>
			</div>
		</footer>
	);
}

const jsonLd: WithContext<Person> = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Manuel Dugué",
	birthDate: "1981-09-12",
	birthPlace: {
		"@type": "City",
		name: "Berlin",
	},
	nationality: ["German", "French"],
	email: "mail@manuel.fyi",
	url: "https://manuel.fyi",
	brand: "Handcrafting Web Experiences for Everybody",
	sameAs: [
		"https://www.linkedin.com/in/mdugue",
		"https://www.xing.com/profile/Manuel_Dugue",
		"https://github.com/mdugue",
		"https://www.instagram.com/manuel.dugue/",
		"https://www.facebook.com/manuel.dugue/",
	],
	address: {
		"@type": "PostalAddress",
		addressLocality: "Dresden",
		postalCode: "01099",
		addressCountry: "Germany",
	},
	knowsLanguage: [
		"German",
		"French",
		"English",
		"Spanish",
		"Portuguese",
		"Dutch",
	],
	knowsAbout: [
		"TypeScript",
		"JavaScript",
		"React",
		"Next.js",
		"Svelte",
		"GraphQL",
		"InfoVis",
		"Maps",
		"GEO",
		"SVG",
		"JSON",
		"CSS",
		"LESS",
		"SASS",
		"WebGL",
		"XML",
		"XSLT",
	],
	hasOccupation: {
		"@type": "Occupation",
		name: "Media Computer Scientist",
		occupationLocation: {
			"@type": "Country",
			name: ["Germany", "France", "Spain", "England", "Portugal"],
		},
	},
	disambiguatingDescription: "Media Computer Scientist",
	hasCredential: {
		"@type": "EducationalOccupationalCredential",
		credentialCategory: "Diploma",
	},
	alumniOf: {
		"@type": "EducationalOrganization",
		name: "TU Dresden",
		sameAs: ["https://tu-dresden.de", "https://wikipedia.org/wiki/TU_Dresden"],
	},
	award: [
		"Arctic Code Vault Contributor",
		"2nd Place Photo Competition 'Go-Out Studying'",
		"1st Price Logo Pitch at Microcomputer Chair",
	],
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: {
			template: "%s – Manuel Dugué",
			default: "Manuel Dugué – Freelance Web Development",
		},
		alternates: {
			canonical: `https://manuel.fyi/${locale}`,
			languages: Object.fromEntries(
				i18n.locales.map((availableLocale) => [
					availableLocale,
					`https://manuel.fyi/${availableLocale}`,
				])
			),
		},
		description:
			"Handcrafting web experiences since 2008. Teaching, analyzing, coding. For consumers, experts & bots.",
		openGraph: {
			url: "https://manuel.fyi/",
			title: "Manuel Dugué – Freelance Web Development",
			siteName: "Manuel Dugué – freelance web developer",
		},
		twitter: {
			creator: "@mdugue",
			site: "@mdugue",
			card: "summary_large_image",
		},
		applicationName: "Portfolio of Manuel Dugué",
		referrer: "origin-when-cross-origin",
		keywords: [
			"Web Development",
			"React",
			"Next.js",
			"TypeScript",
			"SEO",
			"Accessibility",
			"Performance",
			"Design",
		],
	};
}

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ locale }));
}
