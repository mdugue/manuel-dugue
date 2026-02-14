const skillCategories = [
	{
		title: "Languages",
		skills: [
			"TypeScript",
			"JavaScript",
			"HTML",
			"CSS",
			"SASS",
			"LESS",
			"XML",
			"XSLT",
			"SQL",
		],
	},
	{
		title: "Frameworks",
		skills: [
			"React",
			"Next.js",
			"Svelte",
			"D3.js",
			"GraphQL",
			"Node.js",
			"Tailwind CSS",
		],
	},
	{
		title: "Specializations",
		skills: [
			"Accessibility",
			"SEO",
			"Performance",
			"InfoVis",
			"Maps & GEO",
			"SVG",
			"WebGL",
		],
	},
	{
		title: "Spoken",
		skills: ["German", "French", "English", "Spanish", "Portuguese", "Dutch"],
	},
] as const;

export default function SkillsSection() {
	return (
		<section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
			<h2 className="mb-12 text-center font-display text-2xl text-gray-800 md:text-3xl dark:text-gray-200">
				<span className="bg-linear-to-r from-teal-600 to-teal-400 text-gradient">
					What I work with
				</span>
			</h2>
			<div className="grid gap-10 sm:grid-cols-2">
				{skillCategories.map((category) => (
					<div key={category.title}>
						<h3 className="mb-4 font-inline text-lg text-teal-600 dark:text-teal-400">
							{category.title}
						</h3>
						<div className="flex flex-wrap gap-2">
							{category.skills.map((skill) => (
								<span
									className="rounded-full border border-gray-200 bg-white px-3 py-1.5 font-sans text-gray-700 text-sm transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-teal-600 dark:hover:bg-teal-900/30 dark:hover:text-teal-300"
									key={skill}
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
