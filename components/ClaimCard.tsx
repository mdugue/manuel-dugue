'use client'

import { useEffect, useRef, useState } from 'react'
import { animated, to } from 'react-spring'
import Typewriter from 'typewriter-effect'

import useMaterial from '../hooks/useMaterial'
import Headline from './Headline'

const translate = (x: number, y: number, multiplier: number) =>
	`translate3d(${multiplier * x}vmin,${multiplier * y}vmin,0)`

const trans1 = (x: number, y: number) =>
	`perspective(60vmin) rotateX(${3 * y}deg) rotateY(${-3 * x}deg) 
  ${translate(x, y, 0.5)}`
const trans2 = (x: number, y: number) => translate(x, y, -1)
// used for "since 2008" & typewriter
const trans3 = (x: number, y: number) => translate(x, y, 0.6)
const trans4 = (x: number, y: number) => translate(x, y, -0.4)

const materialConfig = {
	mass: 5,
	tension: 350,
	friction: 40,
}

const materialDefaultPosition = [-0.9, -0.9] as [number, number]

export default function ClaimCard() {
	const [isHovered, setIsHovered] = useState(false)
	const {
		props: { xy },
		onMouseMove,
		onMouseLeave,
	} = useMaterial(materialDefaultPosition, materialConfig)
	const typewriterRef = useRef<{ pause: () => void; start: () => void }>()
	useEffect(() => {
		if (isHovered) {
			typewriterRef.current?.pause()
		} else {
			typewriterRef.current?.start()
		}
	}, [isHovered])

	return (
		<animated.hgroup
			onMouseMove={onMouseMove}
			onMouseOver={() => {
				setIsHovered(true)
			}}
			onMouseLeave={() => {
				setIsHovered(false)
				onMouseLeave()
			}}
			style={{
				transform: to(xy, trans1),
			}}
			className="lg:text-xl bg-gradient-to-tr from-teal-500 to-teal-200 dark:from-teal-700 dark:to-teal-600 text-white dark:text-gray-900 px-4 py-8 m-1 lg:px-24 lg:py-12 rounded-lg lg:rounded-3xl shadow-xl self-start lg:m-auto text-center"
		>
			<div className="inset-0 absolute overflow-hidden rounded-lg lg:rounded-3xl">
				<animated.div
					className="bg-teal-100 opacity-75 absolute top-1/4 left-1/4 w-1/2 h-1/2"
					style={{
						zIndex: -1,
						filter: 'blur(100px)',
						transform: to(
							xy,
							(x, y) => `translate3d(${x * 75 + '%'}, ${y * 75 + '%'}, 0)`,
						),
					}}
				/>
			</div>
			<animated.small
				className="font-display text-teal-500 dark:text-teal-700 block"
				style={{ transform: to(xy, trans4) }}
			>
				– since 2008 –
			</animated.small>
			<Headline style={{ transform: to(xy, trans2) }}>
				handcrafting <br />
				web experiences <br />
				for everybody
			</Headline>
			<animated.h2
				className="font-inline text-gradient bg-gradient-to-bl from-amber-100 to-amber-200 dark:from-teal-900 dark:to-teal-700"
				style={{
					transform: to(xy, trans3),
				}}
			>
				<Typewriter
					options={{
						loop: true,
					}}
					onInit={(typewriter) => {
						;(typewriterRef.current = typewriter)
							.typeString('consumers, experts, bots, ...')
							// @ts-expect-error ts definition does not seem complete yet
							.changeCursor(' ')
							.pauseFor(2500)
							.changeCursor('|')
							.deleteAll()
							.typeString('React, GraphQL, A11Y, ...')
							.changeCursor(' ')
							.pauseFor(2500)
							.changeCursor('|')
							.deleteAll()
							.typeString('teaching, analyzing, coding, ...')
							.changeCursor(' ')
							.pauseFor(2500)
							.changeCursor('|')
							.deleteAll()
							.typeString('arctic code vault contributer')
							.changeCursor(' ')
							.pauseFor(2500)
							.changeCursor('|')
							.deleteAll()
							.start()
					}}
				/>
				<noscript>
					consumers, experts, bots <br />
					React, GraphQL, A11Y <br />
					teaching, analyzing, coding <br />
					arctic code vault contributer <br />
				</noscript>
			</animated.h2>
		</animated.hgroup>
	)
}
