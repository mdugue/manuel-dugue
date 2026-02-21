import {
	Document,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import type { SheetContent } from "@/types/content";

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#1f2937",
	},
	header: {
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontFamily: "Helvetica-Bold",
		color: "#0d9488",
		marginBottom: 4,
	},
	address: {
		fontSize: 9,
		color: "#6b7280",
	},
	section: {
		marginBottom: 12,
		flexDirection: "row",
	},
	sectionTitle: {
		width: 110,
		fontSize: 10,
		fontFamily: "Helvetica-Bold",
		color: "#0d9488",
		textAlign: "right",
		paddingRight: 12,
		textTransform: "capitalize",
	},
	sectionContent: {
		flex: 1,
	},
	entry: {
		marginBottom: 6,
	},
	entryDate: {
		fontSize: 8,
		color: "#9ca3af",
		marginBottom: 1,
	},
	entryTitle: {
		fontSize: 10,
		fontFamily: "Helvetica-Bold",
		color: "#374151",
		marginBottom: 1,
	},
	paragraph: {
		fontSize: 9,
		lineHeight: 1.5,
		marginBottom: 2,
	},
	link: {
		fontSize: 8,
		color: "#d946ef",
		textDecoration: "none",
	},
	linksRow: {
		flexDirection: "row",
		gap: 8,
		marginTop: 2,
	},
});

export default function SheetPDF({
	content,
	title,
}: {
	content: SheetContent;
	title: string;
}) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.address}>
						Manuel Dugué, Görlitzer Str. 23, 01099 Dresden | +49 151
						58791155 | mail@manuel.fyi
					</Text>
				</View>
				{content.map((section) => (
					<View
						key={section.sectionTitle}
						style={styles.section}
						wrap={false}
					>
						<Text style={styles.sectionTitle}>
							{section.sectionTitle}
						</Text>
						<View style={styles.sectionContent}>
							{section.entries.map((entry, entryIndex) => (
								<View
									key={`${section.sectionTitle}-${String(entryIndex)}`}
									style={styles.entry}
								>
									{entry.date ? (
										<Text style={styles.entryDate}>
											{entry.date}
										</Text>
									) : null}
									{entry.title ? (
										<Text style={styles.entryTitle}>
											{entry.title}
										</Text>
									) : null}
									{entry.content
										? entry.content
												.split("\n")
												.map((paragraph, paragraphIndex) => (
													<Text
														key={`p-${String(paragraphIndex)}`}
														style={styles.paragraph}
													>
														{paragraph}
													</Text>
												))
										: null}
									{entry.links && entry.links.length > 0 ? (
										<View style={styles.linksRow}>
											{entry.links.map((link) => (
												<Link
													key={link}
													src={link}
													style={styles.link}
												>
													{new URL(link).hostname.replace(
														"www.",
														"",
													)}
												</Link>
											))}
										</View>
									) : null}
								</View>
							))}
						</View>
					</View>
				))}
			</Page>
		</Document>
	);
}
