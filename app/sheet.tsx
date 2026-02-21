import type { SheetContent } from "@/types/content";

export default function Sheet({ content }: { content: SheetContent }) {
	return (
		<div className="grid grid-cols-1 gap-x-4 gap-y-1 leading-6 md:grid-cols-[auto_1fr_1fr_1fr]">
			{content.map((section) => (
				<section
					className="contents"
					key={section.sectionTitle}
				>
					<h2 className="mt-4 mb-2 hyphens-auto break-words bg-linear-to-tr from-teal-500 to-teal-600 font-bold text-base text-gradient capitalize md:justify-self-end md:text-right">
						{section.sectionTitle}
					</h2>
					<div className="col-span-1 md:col-span-3">
						{section.entries.map((entry, entryIndex) => (
							<div
								className="mb-3"
								key={`${section.sectionTitle}-${String(entryIndex)}`}
							>
								{entry.date && (
									<span className="text-gray-400 text-sm dark:text-gray-500">
										{entry.date}
									</span>
								)}
								{entry.title && (
									<h3 className="bg-linear-to-tr from-teal-700 to-teal-600 font-bold text-base text-gradient capitalize">
										{entry.title}
									</h3>
								)}
								{entry.content && (
									<div className="text-gray-800 dark:text-gray-300">
										{entry.content.split("\n").map((paragraph, paragraphIndex) => (
											<p
												className="mb-1"
												key={`${section.sectionTitle}-${String(entryIndex)}-p-${String(paragraphIndex)}`}
											>
												{paragraph}
											</p>
										))}
									</div>
								)}
								{entry.links && entry.links.length > 0 && (
									<div className="mt-1 flex flex-wrap gap-2">
										{entry.links.map((link) => (
											<a
												className="inline-flex items-center gap-1 font-medium text-fuchsia-500 text-sm no-underline hover:underline dark:text-fuchsia-400"
												href={link}
												key={link}
												rel="noopener noreferrer"
												target="_blank"
											>
												{new URL(link).hostname.replace("www.", "")}
											</a>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</section>
			))}
		</div>
	);
}
