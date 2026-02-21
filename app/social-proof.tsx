import type { Locale } from "@/i18n-config";
import Marquee from "@/marquee";

const companies = [
	"T-Systems MMS",
	"Bundesliga.de",
	"Franz Haniel & Cie.",
	"SAXOPRINT",
	"Baselworld",
	"Estino",
	"Comvel",
	"JoDDiD",
] as const;

const headings = {
	en: "Working with",
	de: "Zusammenarbeit mit",
} as const;

export default function SocialProof({ locale }: { locale: Locale }) {
	return (
		<section className="py-16 md:py-24">
			<p className="mb-8 text-center font-display text-gray-400 text-sm uppercase tracking-widest">
				{headings[locale]}
			</p>
			<Marquee duration="40s">
				{companies.map((name) => (
					<span
						className="whitespace-nowrap font-display text-gray-300 text-lg transition-colors hover:text-teal-500 md:text-xl dark:text-gray-600 dark:hover:text-teal-400"
						key={name}
					>
						{name}
					</span>
				))}
			</Marquee>
		</section>
	);
}
