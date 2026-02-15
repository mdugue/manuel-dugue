"use client";

import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useCallback, useRef, useState } from "react";
import { Drawer } from "vaul";

export default function DrawerSheet({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<Drawer.Root
			onOpenChange={(open) => {
				if (!open) {
					router.push(".");
				}
			}}
			open
			shouldScaleBackground
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs" />
				<Drawer.Content className="fixed inset-x-0 bottom-0 z-40 mt-24 flex max-h-[96vh] flex-col rounded-t-2xl bg-white shadow-2xl outline-none md:inset-x-auto md:right-0 md:left-auto md:m-4 md:max-h-[calc(100vh-2rem)] md:w-[min(680px,calc(100vw-2rem))] md:rounded-2xl dark:bg-gray-900">
					<div className="mx-auto mt-3 mb-2 h-1.5 w-12 shrink-0 rounded-full bg-gray-300 md:hidden dark:bg-gray-600" />
					<Drawer.Title className="sr-only">Document</Drawer.Title>
					<div className="overflow-y-auto px-6 pt-4 pb-10 md:px-12 md:py-10">
						{children}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

export function DrawerSheetContent({
	title = "loading …",
	children,
}: {
	title?: string;
	children?: ReactNode;
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [isGenerating, setIsGenerating] = useState(false);

	const handleDownload = useCallback(async () => {
		const el = contentRef.current;
		if (!el || isGenerating) {
			return;
		}

		setIsGenerating(true);
		try {
			const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
				import("html2canvas-pro"),
				import("jspdf"),
			]);

			const canvas = await html2canvas(el, {
				scale: 2,
				useCORS: true,
				backgroundColor: "#ffffff",
			});

			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const margin = 10;
			const contentWidth = pageWidth - margin * 2;
			const imgHeight = (canvas.height * contentWidth) / canvas.width;

			let heightLeft = imgHeight;
			let yOffset = margin;

			pdf.addImage(imgData, "PNG", margin, yOffset, contentWidth, imgHeight);
			heightLeft -= pageHeight - margin * 2;

			while (heightLeft > 0) {
				pdf.addPage();
				yOffset = margin - (imgHeight - heightLeft);
				pdf.addImage(imgData, "PNG", margin, yOffset, contentWidth, imgHeight);
				heightLeft -= pageHeight - margin * 2;
			}

			const safeName = title.replaceAll(/[^\w\s-]/g, "").trim() || "document";
			pdf.save(`${safeName}.pdf`);
		} finally {
			setIsGenerating(false);
		}
	}, [title, isGenerating]);

	return (
		<>
			<nav className="absolute top-3 right-3 z-10 flex gap-1 md:top-4 md:right-4 print:hidden">
				<button
					className="flex items-center rounded-full p-2 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
					disabled={isGenerating}
					onClick={handleDownload}
					title="Download as PDF"
					type="button"
				>
					<ArrowDownTrayIcon
						className={`h-5 w-5 ${isGenerating ? "animate-pulse" : ""}`}
					/>
				</button>
				<Link
					className="flex items-center rounded-full p-2 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
					href="."
					title="close"
				>
					<XMarkIcon className="h-5 w-5" />
				</Link>
			</nav>
			<div ref={contentRef}>
				<div className="mb-6 bg-linear-to-r from-teal-700 to-teal-400 text-gradient">
					{title && (
						<h2 className="mb-1 hyphens-auto break-words font-inline text-3xl md:text-5xl">
							{title}
						</h2>
					)}
					<address className="font-display text-sm not-italic">
						Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
						<br />
						<a href="tel:0049 151 58791155">+49 151 58791155</a>{" "}
						<a href="mailto:mail@manuel.fyi">mail@manuel.fyi</a>
					</address>
				</div>
				<div>{children}</div>
			</div>
		</>
	);
}
