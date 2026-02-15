"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useRef } from "react";

type AnimatedIconProps = HTMLAttributes<HTMLDivElement> & {
	size?: number;
	triggerOnView?: boolean;
};

/** Triggers controls.start("animate") once when the element enters the viewport. */
function useAnimateOnView(
	wrapperRef: React.RefObject<HTMLDivElement | null>,
	controls: ReturnType<typeof useAnimation>,
	triggerOnView: boolean
) {
	useEffect(() => {
		const el = wrapperRef.current;
		if (!(triggerOnView && el)) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					controls.start("animate");
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [wrapperRef, controls, triggerOnView]);
}

/* ------------------------------------------------------------------ */
/*  HeartIcon                                                          */
/* ------------------------------------------------------------------ */

function HeartIcon({
	onMouseEnter,
	onMouseLeave,
	className,
	size = 28,
	triggerOnView = false,
	...props
}: AnimatedIconProps) {
	const controls = useAnimation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	useAnimateOnView(wrapperRef, controls, triggerOnView);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("animate");
			onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("normal");
			onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: lucide-animated hover trigger
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: lucide-animated hover trigger
		<div
			className={className}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={wrapperRef}
			{...props}
		>
			<motion.svg
				animate={controls}
				fill="none"
				height={size}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				transition={{ duration: 0.45, repeat: 2 }}
				variants={{
					normal: { scale: 1 },
					animate: { scale: [1, 1.08, 1] },
				}}
				viewBox="0 0 24 24"
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Heart</title>
				<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
			</motion.svg>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  TimerIcon                                                          */
/* ------------------------------------------------------------------ */

function TimerIcon({
	onMouseEnter,
	onMouseLeave,
	className,
	size = 28,
	triggerOnView = false,
	...props
}: AnimatedIconProps) {
	const controls = useAnimation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	useAnimateOnView(wrapperRef, controls, triggerOnView);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("animate");
			onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("normal");
			onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: lucide-animated hover trigger
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: lucide-animated hover trigger
		<div
			className={className}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={wrapperRef}
			{...props}
		>
			<svg
				fill="none"
				height={size}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Timer</title>
				<motion.line
					animate={controls}
					variants={{
						normal: { scale: 1, y: 0 },
						animate: {
							scale: [0.9, 1],
							y: [0, 1, 0],
							transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
						},
					}}
					x1="10"
					x2="14"
					y1="2"
					y2="2"
				/>
				<motion.line
					animate={controls}
					initial="normal"
					variants={{
						normal: {
							rotate: 0,
							originX: "0%",
							originY: "100%",
							transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
						},
						animate: {
							rotate: 300,
							originX: "0%",
							originY: "100%",
							transition: {
								delay: 0.1,
								duration: 0.6,
								ease: [0.4, 0, 0.2, 1],
							},
						},
					}}
					x1="12"
					x2="15"
					y1="14"
					y2="11"
				/>
				<circle cx="12" cy="14" r="8" />
			</svg>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  EarthIcon                                                          */
/* ------------------------------------------------------------------ */

function EarthIcon({
	onMouseEnter,
	onMouseLeave,
	className,
	size = 28,
	triggerOnView = false,
	...props
}: AnimatedIconProps) {
	const controls = useAnimation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	useAnimateOnView(wrapperRef, controls, triggerOnView);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("animate");
			onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("normal");
			onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: lucide-animated hover trigger
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: lucide-animated hover trigger
		<div
			className={className}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={wrapperRef}
			{...props}
		>
			<svg
				fill="none"
				height={size}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Earth</title>
				<motion.path
					animate={controls}
					d="M21.54 15H17a2 2 0 0 0-2 2v4.54"
					transition={{
						duration: 0.7,
						delay: 0.5,
						opacity: { delay: 0.5 },
					}}
					variants={{
						normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
							pathOffset: [1, 0],
						},
					}}
				/>
				<motion.path
					animate={controls}
					d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"
					transition={{
						duration: 0.7,
						delay: 0.5,
						opacity: { delay: 0.5 },
					}}
					variants={{
						normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
							pathOffset: [1, 0],
						},
					}}
				/>
				<motion.path
					animate={controls}
					d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"
					transition={{
						duration: 0.7,
						delay: 0.5,
						opacity: { delay: 0.5 },
					}}
					variants={{
						normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
							pathOffset: [1, 0],
						},
					}}
				/>
				<motion.circle
					animate={controls}
					cx="12"
					cy="12"
					r="10"
					transition={{
						duration: 0.3,
						delay: 0.1,
						opacity: { delay: 0.15 },
					}}
					variants={{
						normal: { pathLength: 1, opacity: 1 },
						animate: { pathLength: [0, 1], opacity: [0, 1] },
					}}
				/>
			</svg>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  UsersIcon                                                          */
/* ------------------------------------------------------------------ */

function UsersIcon({
	onMouseEnter,
	onMouseLeave,
	className,
	size = 28,
	triggerOnView = false,
	...props
}: AnimatedIconProps) {
	const controls = useAnimation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	useAnimateOnView(wrapperRef, controls, triggerOnView);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("animate");
			onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			controls.start("normal");
			onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: lucide-animated hover trigger
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: lucide-animated hover trigger
		<div
			className={className}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={wrapperRef}
			{...props}
		>
			<svg
				fill="none"
				height={size}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Users</title>
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<motion.path
					animate={controls}
					d="M22 21v-2a4 4 0 0 0-3-3.87"
					variants={{
						normal: {
							translateX: 0,
							transition: {
								type: "spring",
								stiffness: 200,
								damping: 13,
							},
						},
						animate: {
							translateX: [-6, 0],
							transition: {
								delay: 0.1,
								type: "spring",
								stiffness: 200,
								damping: 13,
							},
						},
					}}
				/>
				<motion.path
					animate={controls}
					d="M16 3.13a4 4 0 0 1 0 7.75"
					variants={{
						normal: {
							translateX: 0,
							transition: {
								type: "spring",
								stiffness: 200,
								damping: 13,
							},
						},
						animate: {
							translateX: [-6, 0],
							transition: {
								delay: 0.1,
								type: "spring",
								stiffness: 200,
								damping: 13,
							},
						},
					}}
				/>
			</svg>
		</div>
	);
}

export { HeartIcon, TimerIcon, EarthIcon, UsersIcon };
