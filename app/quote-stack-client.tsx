"use client";

import type { ReactNode } from "react";
import CardStack from "@/card-stack";

export default function QuoteStackClient({ cards }: { cards: ReactNode[] }) {
	return (
		<CardStack
			autoplay
			autoplayDelay={8000}
			cards={cards}
			pauseOnHover
			sendToBackOnClick
		/>
	);
}
