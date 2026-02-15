"use client";

import {
	motion,
	type PanInfo,
	useMotionValue,
	useTransform,
} from "motion/react";
import { type ReactNode, useCallback, useEffect, useState } from "react";

type CardStackProps = {
	cards: ReactNode[];
	sendToBackOnClick?: boolean;
	autoplay?: boolean;
	autoplayDelay?: number;
	pauseOnHover?: boolean;
	sensitivity?: number;
	animationConfig?: { stiffness: number; damping: number };
};

function CardRotate({
	children,
	onSendToBack,
	sensitivity,
}: {
	children: ReactNode;
	onSendToBack: () => void;
	sensitivity: number;
}) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useTransform(y, [-100, 100], [60, -60]);
	const rotateY = useTransform(x, [-100, 100], [-60, 60]);

	function handleDragEnd(
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) {
		if (
			Math.abs(info.offset.x) > sensitivity ||
			Math.abs(info.offset.y) > sensitivity
		) {
			onSendToBack();
		} else {
			x.set(0);
			y.set(0);
		}
	}

	return (
		<motion.div
			className="absolute h-full w-full cursor-grab"
			drag
			dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
			dragElastic={0.6}
			onDragEnd={handleDragEnd}
			style={{ x, y, rotateX, rotateY }}
			whileTap={{ cursor: "grabbing" }}
		>
			{children}
		</motion.div>
	);
}

export default function CardStack({
	cards,
	sendToBackOnClick = true,
	autoplay = true,
	autoplayDelay = 5000,
	pauseOnHover = true,
	sensitivity = 200,
	animationConfig = { stiffness: 260, damping: 20 },
}: CardStackProps) {
	const [isPaused, setIsPaused] = useState(false);
	const [stack, setStack] = useState(() =>
		cards.map((content, index) => ({ id: index, content }))
	);

	useEffect(() => {
		setStack(cards.map((content, index) => ({ id: index, content })));
	}, [cards]);

	const sendToBack = useCallback((id: number) => {
		setStack((prev) => {
			const next = [...prev];
			const idx = next.findIndex((item) => item.id === id);
			const [removed] = next.splice(idx, 1);
			next.unshift(removed);
			return next;
		});
	}, []);

	useEffect(() => {
		if (autoplay && stack.length > 1 && !isPaused) {
			const interval = setInterval(() => {
				const topCard = stack.at(-1);
				if (topCard) {
					sendToBack(topCard.id);
				}
			}, autoplayDelay);

			return () => clearInterval(interval);
		}
	}, [autoplay, autoplayDelay, stack, isPaused, sendToBack]);

	const handleMouseEnter = useCallback(() => {
		if (pauseOnHover) {
			setIsPaused(true);
		}
	}, [pauseOnHover]);

	const handleMouseLeave = useCallback(() => {
		if (pauseOnHover) {
			setIsPaused(false);
		}
	}, [pauseOnHover]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover pause for autoplay
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: hover pause for autoplay
		<div
			className="relative h-full w-full"
			onBlur={handleMouseLeave}
			onFocus={handleMouseEnter}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ perspective: "600px" }}
		>
			{stack.map((card, index) => (
				<CardRotate
					key={card.id}
					onSendToBack={() => sendToBack(card.id)}
					sensitivity={sensitivity}
				>
					<motion.div
						animate={{
							rotateZ: (stack.length - index - 1) * 4,
							scale: 1 + index * 0.06 - stack.length * 0.06,
							transformOrigin: "90% 90%",
						}}
						className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl"
						initial={false}
						onClick={() => sendToBackOnClick && sendToBack(card.id)}
						transition={{
							type: "spring",
							stiffness: animationConfig.stiffness,
							damping: animationConfig.damping,
						}}
					>
						{card.content}
					</motion.div>
				</CardRotate>
			))}
		</div>
	);
}
