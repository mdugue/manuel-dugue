import Link from 'next/link'
import { animated, interpolate } from 'react-spring'

import useMaterial from '../hooks/useMaterial'

const transFooter = (x: number, y: number) => {
	return `perspective(60vmin) rotateX(${4 * (y - 1)}deg) rotateY(${
		15 * (x - 1)
	}deg)`
}

export default function DocumentsNavigation() {
	const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
		mass: 1,
		tension: 450,
		friction: 60,
	})

	return (
		<animated.nav
			className="fixed bottom-4 right-4 flex flex-col bg-gradient-to-tl from-yellow-500 to-yellow-300 dark:from-yellow-800 dark:to-yellow-500 contact shadow-lg rounded-full text-yellow-50 font-inline text-xl px-6"
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			style={{ transform: interpolate(props.xy, transFooter) }}
		>
			<Link
				href="/cv"
				prefetch={false}
				className="hover:text-yellow-700 dark:hover:text-yellow-900 pt-7"
			>
				CV
			</Link>
			<Link
				href="/skill-profile"
				prefetch={false}
				className="hover:text-yellow-700 dark:hover:text-yellow-900 pb-7"
			>
				skill
				<br />
				profile
			</Link>
		</animated.nav>
	)
}
