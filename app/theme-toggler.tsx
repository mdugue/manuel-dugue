"use client";

import { RiMoonFill, RiSunFill } from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type AnimatedThemeTogglerProps = React.ComponentPropsWithoutRef<"button"> & {
	duration?: number;
};

export function AnimatedThemeToggler({
	className = "",
	duration = 400,
	...props
}: AnimatedThemeTogglerProps) {
	const [isDark, setIsDark] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const updateTheme = () => {
			setIsDark(document.documentElement.classList.contains("dark"));
		};

		updateTheme();

		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const toggleTheme = useCallback(async () => {
		if (!buttonRef.current) {
			return;
		}

		// Fallback for browsers without View Transitions API
		if (!document.startViewTransition) {
			const newTheme = !isDark;
			setIsDark(newTheme);
			document.documentElement.classList.toggle("dark");
			localStorage.setItem("theme", newTheme ? "dark" : "light");
			return;
		}

		await document.startViewTransition(() => {
			flushSync(() => {
				const newTheme = !isDark;
				setIsDark(newTheme);
				document.documentElement.classList.toggle("dark");
				localStorage.setItem("theme", newTheme ? "dark" : "light");
			});
		}).ready;

		const { top, left, width, height } =
			buttonRef.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const maxRadius = Math.hypot(
			Math.max(left, window.innerWidth - left),
			Math.max(top, window.innerHeight - top)
		);

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${String(x)}px ${String(y)}px)`,
					`circle(${String(maxRadius)}px at ${String(x)}px ${String(y)}px)`,
				],
			},
			{
				duration,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			}
		);
	}, [isDark, duration]);

	return (
		<button
			{...props}
			className={`rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${className}`}
			onClick={toggleTheme}
			ref={buttonRef}
			type="button"
		>
			{isDark ? (
				<RiSunFill className="size-4" />
			) : (
				<RiMoonFill className="size-4" />
			)}
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
