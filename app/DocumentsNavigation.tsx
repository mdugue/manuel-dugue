'use client'

import Link from 'next/link'
import { animated, to } from '@react-spring/web'

import useMaterial from '../hooks/useMaterial'
import { Locale } from '../app/i18n-config'

const transFooter = (x: number, y: number) => {
	return `translateZ(20px) perspective(60vmin) rotateX(${
		4 * (y - 1)
	}deg) rotateY(${15 * (x - 1)}deg)`
}

export default function DocumentsNavigation({ locale }: { locale: Locale }) {
	const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
		mass: 1,
		tension: 450,
		friction: 60,
	})

	return (
		<animated.nav
			className="flex flex-col bg-gradient-to-tl from-amber-500 to-yellow-300 hover:from-amber-400  hover:to-yellow-300 dark:from-amber-800 dark:to-yellow-500 contact shadow-lg rounded-full text-amber-50 font-inline text-xl px-6 fixed bottom-4 self-end transform-gpu right-6 z-50 belowMd:!transform-none"
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			style={{ transform: to(props.xy, transFooter) }}
		>
			<Link
				href={`/${locale}/cv`}
				prefetch={false}
				className="hover:text-teal-500 dark:hover:text-amber-900 pt-7"
			>
				CV
			</Link>
			<Link
				href={`/${locale}/skill-profile`}
				prefetch={false}
				className="hover:text-fuchsia-500 dark:hover:text-amber-900 pb-7"
			>
				skill
				<br />
				profile
			</Link>
		</animated.nav>
	)
}
