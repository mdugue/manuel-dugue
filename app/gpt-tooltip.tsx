'use client';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

export default function GPTTooltip(props: {
	children: ReactNode;
	locale: 'de' | 'en';
}) {
	return (
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger asChild>{props.children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="select-none rounded-xl bg-gray-50/80 px-[15px] py-[10px] text-[15px] text-gray-500 text-sm text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] backdrop-blur-sm will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
						sideOffset={5}
					>
						<p>
							{props.locale === 'en'
								? 'Curious about the Prompt?'
								: 'Wie sieht der Prompt aus?'}
						</p>
						<p>
							Check{' '}
							<a
								className="pb-7 text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900"
								href="https://github.com/mdugue/manuel-dugue/blob/main/app/LandingPageQuote.tsx"
								rel="noreferrer"
								target="_blank"
							>
								source code
							</a>
						</p>
						<Tooltip.Arrow className="fill-white/75 " />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
