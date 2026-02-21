"use cache";

import { Coffee, Sparkles } from "lucide-react";
import { GoogleIcon, OpenAiIcon } from "@/brand-icons";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { Locale } from "@/i18n-config";
import LandingPageQuote from "@/landing-page-quote";
import QuoteStackClient from "@/quote-stack-client";

export default async function AIQuoteStack({ locale }: { locale: Locale }) {
	cacheLife("hours");

	const gptCard = (
		<div className="h-full w-full" key="gpt">
			<Suspense
				fallback={
					<QuoteCard
						border="border-pink-500 dark:border-amber-700"
						gradient="from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500"
					>
						<div className="animate-pulse font-display text-amber-100/60">
							<OpenAiIcon className="inline size-4" />{" "}
							{locale === "en"
								? "GPT 5 reading my Skill Profile …"
								: "GPT 5 liest mein Skill Profile …"}
						</div>
					</QuoteCard>
				}
			>
				<ErrorBoundary
					fallback={
						<QuoteCard
							border="border-pink-500 dark:border-amber-700"
							gradient="from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500"
						>
							<QuoteError />
						</QuoteCard>
					}
				>
					<LandingPageQuote locale={locale} />
				</ErrorBoundary>
			</Suspense>
		</div>
	);

	const claudeCard = (
		<div className="h-full w-full" key="claude">
			<QuoteCard
				border="border-orange-400 dark:border-indigo-700"
				gradient="from-amber-500 to-orange-400 dark:from-indigo-800 dark:to-violet-600"
			>
				<blockquote className="whitespace-break-spaces font-medium text-amber-50">
					{locale === "en"
						? "Manuel brings a rare mix of technical depth and creative sensibility. His work with accessibility and multilingual interfaces shows genuine care for end users, and his academic background in media informatics gives him a thoughtful approach to interaction design that many engineers lack."
						: "Manuel verbindet technische Tiefe mit kreativem Gespür. Seine Arbeit mit Barrierefreiheit und mehrsprachigen Interfaces zeigt echte Empathie für Endnutzer, und sein akademischer Hintergrund in Medieninformatik gibt ihm einen durchdachten Ansatz für Interaktionsdesign."}
				</blockquote>
				<figcaption className="mt-3 flex items-center gap-1 text-right text-sm text-white/70">
					<span className="ml-auto flex items-center gap-1">
						– <Sparkles className="inline size-4" />{" "}
						{locale === "de" ? "Claude zu meinem " : "Claude after reading my "}
						<Link
							className="underline decoration-white/40 hover:decoration-white"
							href={`/${locale}/skill-profile`}
							prefetch={false}
						>
							Skill Profile
						</Link>
					</span>
				</figcaption>
			</QuoteCard>
		</div>
	);

	const geminiCard = (
		<div className="h-full w-full" key="gemini">
			<QuoteCard
				border="border-blue-400 dark:border-emerald-700"
				gradient="from-sky-500 to-blue-400 dark:from-emerald-800 dark:to-teal-600"
			>
				<blockquote className="whitespace-break-spaces font-medium text-sky-50">
					{locale === "en"
						? "What stands out is the breadth of experience, from digital exhibitions and data visualization to e-commerce platforms, combined with a genuine passion for making technology accessible. Six language fluency mirrors his approach to code: adaptable, precise, and always considering the audience."
						: "Was auffällt, ist die Breite der Erfahrung, von digitalen Ausstellungen und Datenvisualisierung bis zu E-Commerce Plattformen, kombiniert mit einer echten Leidenschaft, Technologie zugänglich zu machen. Sechs Sprachen spiegeln seinen Ansatz bei Code wider: anpassungsfähig, präzise und immer mit Blick auf das Publikum."}
				</blockquote>
				<figcaption className="mt-3 flex items-center gap-1 text-right text-sm text-white/70">
					<span className="ml-auto flex items-center gap-1">
						– <GoogleIcon className="inline size-4" />{" "}
						{locale === "de" ? "Gemini zu meinem " : "Gemini after reading my "}
						<Link
							className="underline decoration-white/40 hover:decoration-white"
							href={`/${locale}/skill-profile`}
							prefetch={false}
						>
							Skill Profile
						</Link>
					</span>
				</figcaption>
			</QuoteCard>
		</div>
	);

	return (
		<div className="mx-auto max-w-xl">
			<QuoteStackClient cards={[gptCard, claudeCard, geminiCard]} />
		</div>
	);
}

function QuoteCard({
	children,
	gradient,
	border,
}: {
	children: React.ReactNode;
	gradient: string;
	border: string;
}) {
	return (
		<div
			className={`h-full w-full rounded-2xl border bg-linear-to-tl ${gradient} ${border} px-6 py-5 shadow-xl md:rounded-3xl md:px-10 md:py-8`}
		>
			{children}
		</div>
	);
}

function QuoteError() {
	return (
		<div className="text-amber-50">
			<p className="mb-2">ohhhhhh noooooo</p>
			<p className="flex items-center gap-2 font-display text-sm">
				<Coffee className="size-4" /> Conversation limit reached. Try again
				later or{" "}
				<a className="underline" href="mailto:mail@manuel.fyi">
					contact me directly
				</a>
				.
			</p>
		</div>
	);
}
