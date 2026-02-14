import type { ReactNode } from "react";

type MarqueeProps = {
	children: ReactNode;
	className?: string;
	reverse?: boolean;
	pauseOnHover?: boolean;
	duration?: string;
};

export default function Marquee({
	children,
	className = "",
	reverse = false,
	pauseOnHover = true,
	duration = "30s",
}: MarqueeProps) {
	return (
		<div
			className={`group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
		>
			{Array.from({ length: 2 }, (_, i) => (
				<div
					aria-hidden={i > 0}
					className={`flex shrink-0 items-center gap-8 px-4 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
					key={`marquee-${String(i)}`}
					style={{
						animation: `marquee ${duration} linear infinite${reverse ? " reverse" : ""}`,
					}}
				>
					{children}
				</div>
			))}
		</div>
	);
}
