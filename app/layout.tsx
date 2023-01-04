import { Github, Linkedin, Twitter } from '@icons-pack/react-simple-icons'
import ClaimCard from 'components/ClaimCard'
import DocumentsNavigation from 'components/DocumentsNavigation'
import { Bungee, Bungee_Inline, Bungee_Shade } from '@next/font/google'
import { SocialProfileJsonLd } from 'next-seo'
import Link from 'next/link'
import './globals.css'

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

export default function MyApp({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${bungee.variable} ${bungeeInline.variable} ${bungeeShade.variable}`}
		>
			<body className="dark:from-black dark:to-gray-800 bg-gradient-to-b from-gray-200 to-white">
				<div className={`flex flex-col min-h-screen transform-gpu`}>
					<ClaimCard />
					<ContactAside />
					<LegalSection />
					<DocumentsNavigation />
				</div>
				{children}
			</body>
		</html>
	)
}

function ContactAside() {
	return (
		<aside className="lg:absolute ml-1 mt-16 lg:ml-20 lg:bottom-12 lg:left-0 flex flex-col">
			<SocialProfileJsonLd
				useAppDir
				type="Person"
				name="Manuel Dugué"
				url="https://manuel.fyi/"
				sameAs={[
					'https://www.linkedin.com/in/mdugue',
					'https://www.xing.com/profile/Manuel_Dugue',
					'https://github.com/mdugue',
					'https://www.instagram.com/manuel.dugue/',
					'https://www.facebook.com/manuel.dugue/',
				]}
			/>
			<div className="flex text-gray-300 dark:text-gray-500 mb-2">
				<a
					className="mr-2 hover:text-teal-400"
					href="https://www.linkedin.com/in/manuel-dugue/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://twitter.com/mdugue"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Twitter className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://github.com/mdugue"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
			</div>
			<div className="text-gradient bg-gradient-to-tr from-indigo-500 to-teal-400 font-display text-2xl">
				Manuel Dugué
			</div>
		</aside>
	)
}

function LegalSection() {
	return (
		<nav className="font-display absolute bottom-2 left-2 lg:bottom-auto lg:left-auto lg:top-4 lg:right-4 flex flex-col lg:text-right text-gray-300 dark:text-gray-500">
			<Link
				href="/legal"
				prefetch={false}
				className="coarse:h-12 mb-2 hover:text-gray-400"
			>
				legal note
			</Link>
			<Link
				href="/privacy"
				prefetch={false}
				className="coarse:h-12 mb-2 hover:text-gray-400"
			>
				privacy
			</Link>
		</nav>
	)
}
