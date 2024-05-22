'use client'
import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

export default function GPTTooltip(props: { children: ReactNode }) {
	return (
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger asChild>{props.children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-xl  px-[15px] py-[10px] text-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] text-gray-500 text-sm backdrop-blur bg-gray-50/80"
						sideOffset={5}
					>
						<p>Curious about the Prompt?</p>
						<p>
							Check the{' '}
							<a
								href="https://github.com/mdugue/manuel-dugue/blob/main/app/LandingPageQuote.tsx"
								target="_blank"
								rel="noreferrer"
								className="text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900 pb-7"
							>
								source code
							</a>
						</p>
						<Tooltip.Arrow className="fill-white/75 " />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}
