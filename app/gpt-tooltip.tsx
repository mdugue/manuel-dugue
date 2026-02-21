"use client";
import { Tooltip } from "@base-ui-components/react/tooltip";
import type { ReactNode } from "react";

export default function GPTTooltip(props: {
	children: ReactNode;
	locale: "de" | "en";
}) {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger delay={200} render={<span />}>
					{props.children}
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Positioner sideOffset={5}>
						<Tooltip.Popup className="select-none rounded-xl bg-gray-50/80 px-[15px] py-[10px] text-gray-500 text-sm shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] backdrop-blur-sm">
							<p>
								{props.locale === "en"
									? "Curious about the Prompt?"
									: "Wie sieht der Prompt aus?"}
							</p>
							<p>
								Check{" "}
								<a
									className="pb-7 text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900"
									href="https://github.com/mdugue/manuel-dugue/blob/main/app/landing-page-quote.tsx"
									rel="noreferrer"
									target="_blank"
								>
									source code
								</a>
							</p>
							<Tooltip.Arrow className="fill-white/75" />
						</Tooltip.Popup>
					</Tooltip.Positioner>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
