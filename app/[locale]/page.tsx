import { cacheLife } from "next/cache";

export default async function Page(): Promise<void> {
	"use cache";
	cacheLife("minutes");
	return;
}
