import { animated } from '@react-spring/web';
import type { ComponentProps, ReactNode } from 'react';

export default function AnimatedHeadline(
	props: ComponentProps<typeof animated.h1> & { children: ReactNode }
) {
	const { children, style, ...rest } = props;
	return (
		<animated.h1
			{...rest}
			className="mb-8 text-3xl leading-tight lg:text-5xl lg:leading-tight"
			style={{ ...style }}
		>
			<div
				className="absolute bg-linear-to-tr from-teal-600 to-teal-500 font-shade text-gradient dark:from-teal-800 dark:to-teal-600"
				style={{ transform: 'translateX(-0.12em)' }}
			>
				{children}
			</div>
			<div
				className="transform font-inline"
				style={{ letterSpacing: '0.1em', textRendering: 'geometricPrecision' }}
			>
				{children}
			</div>
		</animated.h1>
	);
}
