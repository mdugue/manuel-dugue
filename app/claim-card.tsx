"use client";

import {
	motion,
	type SpringOptions,
	useMotionValue,
	useSpring,
} from "motion/react";
import { useCallback, useRef } from "react";

import AnimatedHeadline from "./animated-headline";
import TypingAnimation from "./typing-animation";

const springValues: SpringOptions = {
	damping: 30,
	stiffness: 100,
	mass: 2,
};

const typingPhrases = [
	"consumers, experts, agents, bots, ...",
	"React, GraphQL, A11Y, ...",
	"teaching, analyzing, coding, ...",
	"arctic code vault contributer",
];

export default function ClaimCard() {
	const ref = useRef<HTMLElement>(null);
	const rotateX = useSpring(useMotionValue(0), springValues);
	const rotateY = useSpring(useMotionValue(0), springValues);
	const scale = useSpring(1, springValues);

	const handleMouse = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			if (!ref.current) {
				return;
			}
			const rect = ref.current.getBoundingClientRect();
			const offsetX = e.clientX - rect.left - rect.width / 2;
			const offsetY = e.clientY - rect.top - rect.height / 2;
			rotateX.set((offsetY / (rect.height / 2)) * -12);
			rotateY.set((offsetX / (rect.width / 2)) * 12);
		},
		[rotateX, rotateY]
	);

	const handleMouseEnter = useCallback(() => {
		scale.set(1.04);
	}, [scale]);

	const handleMouseLeave = useCallback(() => {
		scale.set(1);
		rotateX.set(0);
		rotateY.set(0);
	}, [scale, rotateX, rotateY]);

	return (
		<motion.hgroup
			className="relative z-10 mx-auto w-full max-w-2xl cursor-default rounded-2xl border border-teal-300/50 bg-linear-to-tr from-teal-500 to-teal-200 px-6 py-10 text-center text-white shadow-2xl md:rounded-3xl md:px-24 md:py-16 md:text-xl dark:from-teal-700 dark:to-teal-600 dark:text-gray-900"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouse}
			ref={ref}
			style={{
				rotateX,
				rotateY,
				scale,
				transformPerspective: 800,
			}}
		>
			<div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
				<div
					className="absolute top-1/4 left-1/4 h-1/2 w-1/2 bg-teal-100 opacity-75"
					style={{ filter: "blur(100px)", zIndex: -1 }}
				/>
			</div>
			<small className="block font-display text-teal-500/80 dark:text-teal-700">
				– since 2008 –
			</small>
			<AnimatedHeadline>
				handcrafting <br />
				web experiences <br />
				for everybody
			</AnimatedHeadline>
			<p className="bg-linear-to-bl from-amber-100 to-amber-200 font-inline text-gradient dark:from-teal-900 dark:to-teal-700">
				<TypingAnimation
					phrases={typingPhrases}
					startOnView={false}
					typeDuration={70}
				/>
			</p>
		</motion.hgroup>
	);
}
