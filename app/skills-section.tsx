"use client";

import { EarthIcon, HeartIcon, TimerIcon, UsersIcon } from "@/animated-icons";
import type { Locale } from "@/i18n-config";

const highlights = {
	en: [
		{
			Icon: HeartIcon,
			title: "For everybody",
			body: "Accessibility and inclusion are not afterthoughts. I build experiences that work for real people on real devices.",
		},
		{
			Icon: TimerIcon,
			title: "Craft over hype",
			body: "Thoughtful performance, clean markup, and solid architecture. The boring stuff that makes great products.",
		},
		{
			Icon: EarthIcon,
			title: "Six languages",
			body: "German, French, English, Spanish, Portuguese, Dutch. I bring a global perspective to every project.",
		},
		{
			Icon: UsersIcon,
			title: "Teaching and building",
			body: "From mentoring junior developers to shipping production code. I enjoy both sides equally.",
		},
	],
	de: [
		{
			Icon: HeartIcon,
			title: "Für alle",
			body: "Barrierefreiheit und Inklusion sind kein Nachgedanke. Ich baue Erlebnisse, die für echte Menschen auf echten Geräten funktionieren.",
		},
		{
			Icon: TimerIcon,
			title: "Handwerk statt Hype",
			body: "Durchdachte Performance, sauberes Markup und solide Architektur. Die unspektakulären Dinge, die großartige Produkte ausmachen.",
		},
		{
			Icon: EarthIcon,
			title: "Sechs Sprachen",
			body: "Deutsch, Französisch, Englisch, Spanisch, Portugiesisch, Niederländisch. Ich bringe eine globale Perspektive in jedes Projekt.",
		},
		{
			Icon: UsersIcon,
			title: "Lehren und Bauen",
			body: "Vom Mentoring junger Entwickler bis zum Shipping von Produktionscode. Ich genieße beide Seiten gleichermaßen.",
		},
	],
} as const;

export default function SkillsSection({ locale }: { locale: Locale }) {
	const items = highlights[locale];

	return (
		<section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
			<div className="grid gap-8 sm:grid-cols-2">
				{items.map((item) => (
					<div
						className="group rounded-2xl border border-gray-100 bg-white/60 p-6 transition-colors hover:border-teal-200 hover:bg-teal-50/40 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-teal-800 dark:hover:bg-teal-900/20"
						key={item.title}
					>
						<item.Icon
							className="mb-3 text-teal-500 dark:text-teal-400"
							size={24}
							triggerOnView
						/>
						<h3 className="mb-2 font-inline text-gray-800 text-lg dark:text-gray-200">
							{item.title}
						</h3>
						<p className="text-gray-500 text-sm leading-relaxed dark:text-gray-400">
							{item.body}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
