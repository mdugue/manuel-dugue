import reactSpring from "@react-spring/web";
import type { ReactNode } from "react";

declare module "@react-spring/web" {
	const animated = {
		children: ReactNode,
		...reactSpring.animated,
	};
}
