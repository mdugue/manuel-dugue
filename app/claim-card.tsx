"use client";
import { animated, to } from "@react-spring/web";
import { useState } from "react";

import useMaterial from "../hooks/use-material";
import AnimatedHeadline from "./animated-headline";
import TypingAnimation from "./typing-animation";

const translate = (x: number, y: number, multiplier: number) =>
	`translate3d(${String(multiplier * x)}vmin,${String(multiplier * y)}vmin,0)`;

const trans1 = (x: number, y: number) =>
	`perspective(60vmin) rotateX(${String(3 * y)}deg) rotateY(${String(-4 * x)}deg) rotateZ(-2deg)
  ${translate(x, y, 0.5)}`;
const trans2 = (x: number, y: number) => translate(x, y, -1);
const trans3 = (x: number, y: number) => translate(x, y, 0.6);
const trans4 = (x: number, y: number) => translate(x, y, -0.4);

const materialConfig = {
	mass: 5,
	tension: 350,
	friction: 40,
};

const materialDefaultPosition = [-0.9, -0.9] as [number, number];

const typingPhrases = [
	"consumers, experts, agents, bots, ...",
	"React, GraphQL, A11Y, ...",
	"teaching, analyzing, coding, ...",
	"arctic code vault contributer",
];

export default function ClaimCard() {
	const [_isHovered, setIsHovered] = useState(false);
	const {
		props: { xy },
		onMouseMove,
		onMouseLeave,
	} = useMaterial(materialDefaultPosition, materialConfig);

	return (
		<animated.hgroup
			className="belowMd:transform-none! relative z-10 mx-auto w-full max-w-2xl rounded-2xl border border-teal-300/50 bg-linear-to-tr from-teal-500 to-teal-200 px-6 py-10 text-center text-white shadow-2xl md:rounded-3xl md:px-24 md:py-16 md:text-xl dark:from-teal-700 dark:to-teal-600 dark:text-gray-900"
			onMouseLeave={() => {
				setIsHovered(false);
				onMouseLeave();
			}}
			onMouseMove={onMouseMove}
			onMouseOver={() => {
				setIsHovered(true);
			}}
			style={{
				transform: to(xy, trans1),
			}}
		>
			<div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
				<animated.div
					className="absolute top-1/4 left-1/4 h-1/2 w-1/2 bg-teal-100 opacity-75"
					style={{
						zIndex: -1,
						filter: "blur(100px)",
						transform: to(
							xy,
							(x, y) => `translate3d(${String(x * 75)}%, ${String(y * 75)}%, 0)`
						),
					}}
				/>
			</div>
			<animated.small
				className="block font-display text-teal-500/80 dark:text-teal-700"
				style={{ transform: to(xy, trans4) }}
			>
				– since 2008 –
			</animated.small>
			<AnimatedHeadline style={{ transform: to(xy, trans2) }}>
				handcrafting <br />
				web experiences <br />
				for everybody
			</AnimatedHeadline>
			<animated.p
				className="bg-linear-to-bl from-amber-100 to-amber-200 font-inline text-gradient dark:from-teal-900 dark:to-teal-700"
				style={{
					transform: to(xy, trans3),
				}}
			>
				<TypingAnimation
					phrases={typingPhrases}
					startOnView={false}
					typeDuration={70}
				/>
			</animated.p>
		</animated.hgroup>
	);
}
