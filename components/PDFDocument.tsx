import React from 'react'
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Font,
	Link,
} from '@react-pdf/renderer'
import { StructuredSheetProps } from 'components/StructuredSheet'

Font.register({ family: 'Bungee', src: '/fonts/Bungee-Regular.ttf' })
Font.register({
	family: 'Bungee-Inline',
	src: '/fonts/BungeeInline-Regular.ttf',
})
Font.register({
	family: 'Montserrat-Medium',
	src: '/fonts/Montserrat-Medium.ttf',
})
Font.register({
	family: 'Montserrat-Semibold',
	src: '/fonts/Montserrat-Semibold.ttf',
})
Font.register({
	family: 'Montserrat-Regular',
	src: '/fonts/Montserrat-Regular.ttf',
})

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		paddingTop: '1.7cm',
		paddingBottom: '1.7cm',
		paddingLeft: '2.4cm',
		paddingRight: '2cm',
		fontFamily: 'Montserrat-Regular',
	},
	section: {
		paddingBottom: '20pt',
	},
	row: {
		flexDirection: 'row',
		fontSize: '12pt',
		lineHeight: 1.5,
		paddingBottom: '8pt',
	},
	sectionTitle: {
		fontFamily: 'Bungee-Inline',
		color: '#eab308',
	},
	title: {
		fontFamily: 'Montserrat-Semibold',
		textAlign: 'right',
		paddingRight: '10pt',
		flexGrow: 0,
		flexBasis: '120pt',
		color: '#0f766e',
	},
	entryColumn: { flexGrow: 1 },

	subTitle: {
		fontFamily: 'Montserrat-Semibold',
		color: '#0f766e',
	},
})

// Create Document Component
// TODO: Orphans and widows
// TODO: Clasnames
const PDFDocument = (props: StructuredSheetProps) => {
	const { document, title } = props
	return (
		<Document>
			<Page size="A4" style={styles.page} orientation="portrait">
				{document.sections.map((section) => (
					<View style={styles.section} key={section.sectionTitle}>
						<Text style={styles.sectionTitle}>{section.sectionTitle}</Text>
						{section.entries.map((entry, index) => (
							<View key={index} style={styles.row}>
								<Text style={styles.title}>{entry.title}</Text>
								<View style={styles.entryColumn}>
									{entry.subtitle && (
										<Text style={styles.subTitle}>{entry.subtitle}</Text>
									)}
									{entry.description.split('\n').map((item) => (
										<Text key={item}>{item}</Text>
									))}
									{entry.links?.map((link) => (
										<Link key={link} src={link}>
											{link.replace('https://', '').replace('www.', '')}
										</Link>
									))}
								</View>
							</View>
						))}
					</View>
				))}

				<View style={styles.section}>
					<Text style={styles.title}>Manuel Dugué</Text>
					<Text>Section #1</Text>
				</View>
			</Page>
		</Document>
	)
}

export default PDFDocument
