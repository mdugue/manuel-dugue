import {
	RiEarthFill,
	RiGroupFill,
	RiHeart2Fill,
	RiTimerFlashFill,
} from "@remixicon/react";

const highlights = [
	{
		icon: RiHeart2Fill,
		title: "For everybody",
		body: "Accessibility and inclusion are not afterthoughts. I build experiences that work for real people on real devices.",
	},
	{
		icon: RiTimerFlashFill,
		title: "Craft over hype",
		body: "Thoughtful performance, clean markup, and solid architecture. The boring stuff that makes great products.",
	},
	{
		icon: RiEarthFill,
		title: "Six languages",
		body: "German, French, English, Spanish, Portuguese, Dutch. I bring a global perspective to every project.",
	},
	{
		icon: RiGroupFill,
		title: "Teaching and building",
		body: "From mentoring junior developers to shipping production code. I enjoy both sides equally.",
	},
] as const;

export default function SkillsSection() {
	return (
		<section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
			<div className="grid gap-8 sm:grid-cols-2">
				{highlights.map((item) => (
					<div
						className="group rounded-2xl border border-gray-100 bg-white/60 p-6 transition-colors hover:border-teal-200 hover:bg-teal-50/40 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-teal-800 dark:hover:bg-teal-900/20"
						key={item.title}
					>
						<item.icon className="mb-3 size-6 text-teal-500 transition-transform group-hover:scale-110 dark:text-teal-400" />
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
