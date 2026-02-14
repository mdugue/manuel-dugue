"use client";

import { useEffect, useRef, useState } from "react";

type TypingAnimationProps = {
	phrases: string[];
	typeDuration?: number;
	deleteDuration?: number;
	pauseDuration?: number;
	className?: string;
	startOnView?: boolean;
};

/**
 * A cycling typing animation component based on MagicUI's TypingAnimation.
 * Types each phrase, pauses, deletes, then moves to the next phrase in a loop.
 */
export default function TypingAnimation({
	phrases,
	typeDuration = 80,
	deleteDuration = 40,
	pauseDuration = 2500,
	className = "",
	startOnView = true,
}: TypingAnimationProps) {
	const [displayedText, setDisplayedText] = useState("");
	const [started, setStarted] = useState(!startOnView);
	const elementRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!startOnView) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setStarted(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => observer.disconnect();
	}, [startOnView]);

	useEffect(() => {
		if (!started || phrases.length === 0) {
			return;
		}

		let phraseIndex = 0;
		let charIndex = 0;
		let isDeleting = false;
		let isPaused = false;
		let timer: ReturnType<typeof setTimeout>;

		const tick = () => {
			const currentPhrase = phrases[phraseIndex % phrases.length] ?? "";

			if (isPaused) {
				isPaused = false;
				isDeleting = true;
				timer = setTimeout(tick, deleteDuration);
				return;
			}

			if (isDeleting) {
				charIndex -= 1;
				setDisplayedText(currentPhrase.substring(0, charIndex));

				if (charIndex <= 0) {
					isDeleting = false;
					phraseIndex += 1;
					timer = setTimeout(tick, typeDuration);
				} else {
					timer = setTimeout(tick, deleteDuration);
				}
				return;
			}

			charIndex += 1;
			setDisplayedText(currentPhrase.substring(0, charIndex));

			if (charIndex >= currentPhrase.length) {
				isPaused = true;
				timer = setTimeout(tick, pauseDuration);
			} else {
				timer = setTimeout(tick, typeDuration);
			}
		};

		timer = setTimeout(tick, 500);

		return () => clearTimeout(timer);
	}, [started, phrases, typeDuration, deleteDuration, pauseDuration]);

	return (
		<span className={className} ref={elementRef}>
			{displayedText}
			<span className="animate-pulse">|</span>
			<noscript>
				{phrases.map((phrase) => (
					<span key={phrase}>
						{phrase}
						<br />
					</span>
				))}
			</noscript>
		</span>
	);
}
