"use client";

import { motion, useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

type AnimatedOnViewProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
};

export default function AnimatedOnView({
	children,
	className = "",
	delay = 0,
}: AnimatedOnViewProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	return (
		<motion.div
			animate={
				isInView
					? { opacity: 1, scale: 1, y: 0 }
					: { opacity: 0, scale: 0.3, y: 20 }
			}
			className={className}
			initial={{ opacity: 0, scale: 0.3, y: 20 }}
			ref={ref}
			transition={{
				type: "spring",
				stiffness: 260,
				damping: 20,
				delay,
			}}
		>
			{children}
		</motion.div>
	);
}
