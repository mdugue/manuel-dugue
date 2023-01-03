import {
	Document,
	Font,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from '@react-pdf/renderer'
import { StructuredSheetProps } from 'components/StructuredSheet'
import path from 'path'
import fs from 'fs'

function logFiles(directoryPath: string) {
	console.log('directoryPath', directoryPath)
	try {
		const fileNames = fs.readdirSync(directoryPath, { withFileTypes: true })

		//listing all files using forEach
		fileNames.forEach(function (file) {
			// Do whatever you want to do with the file
			console.log(file)
		})
	} catch (err) {
		console.log('err', err)
	}
}

// TODO: Links
const PDFDocument = (props: StructuredSheetProps) => {
	console.log('cwd')
	logFiles(process.cwd())

	console.log('cwd/public')
	logFiles(path.resolve(process.cwd(), 'public'))

	console.log('cwd/fonts')
	logFiles(path.resolve(process.cwd(), 'fonts'))

	console.log('cwd/public/fonts')
	logFiles(path.resolve(process.cwd(), 'public', 'fonts'))

	Font.register({
		family: 'Bungee',
		src: path.resolve(process.cwd(), 'fonts/Bungee-Regular.ttf'),
	})
	Font.register({
		family: 'Bungee-Inline',
		src: path.resolve(process.cwd(), 'fonts/BungeeInline-Regular.ttf'),
	})
	Font.register({
		family: 'Montserrat-Semibold',
		src: path.resolve(process.cwd(), 'fonts/Montserrat-Semibold.ttf'),
	})
	Font.register({
		family: 'Montserrat-Regular',
		src: path.resolve(process.cwd(), 'fonts/Montserrat-Regular.ttf'),
	})

	console.log(
		'paths',
		path.resolve(process.cwd(), 'fonts/Bungee-Regular.ttf'),
		path.join(process.cwd(), 'fonts/Bungee-Regular.ttf'),
	)

	// Create styles
	const styles = StyleSheet.create({
		link: {
			fontFamily: 'Montserrat-Regular',
			fontSize: 10,
			color: 'black',
			textDecoration: 'none',
			alignSelf: 'flex-end',
			justifySelf: 'flex-end',
		},
		page: {
			flexDirection: 'column',
			paddingTop: '1.7cm',
			paddingBottom: '1.7cm',
			paddingLeft: '2.4cm',
			paddingRight: '2cm',
			fontFamily: 'Montserrat-Regular',
		},
		header: {
			paddingBottom: 25,
		},
		pageTitle: {
			/* fontFamily: 'Bungee-Inline', */
			fontSize: 35,
			color: '#0f766e',
		},
		pageSubTitle: {
			fontFamily: 'Bungee',
			fontSize: 10,
			color: '#0f766e',
		},
		section: {
			paddingBottom: '20pt',
		},
		row: {
			flexDirection: 'row',
			fontSize: 10,
			lineHeight: 1.5,
			paddingBottom: 6,
		},
		sectionTitle: {
			fontFamily: 'Bungee-Inline',
			color: '#eab308',
			paddingBottom: 6,
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

	const { document, title } = props
	return (
		<Document title={title} author="Manuel Dugué">
			<Page size="A4" style={styles.page} orientation="portrait">
				<View style={styles.header}>
					<Text style={styles.pageTitle}>{title}</Text>
					<Text style={styles.pageSubTitle}>
						Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
					</Text>
					<Text style={styles.pageSubTitle}>
						+49 151 58791155 mail@manuel.fyi
					</Text>
				</View>
				{document.sections.map((section) => (
					<View style={styles.section} key={section.sectionTitle}>
						<Text style={styles.sectionTitle} minPresenceAhead={40}>
							{section.sectionTitle}
						</Text>
						{section.entries.map((entry, index) => (
							<View key={index} style={styles.row} wrap={false}>
								<Text style={styles.title}>{entry.title}</Text>
								<View style={styles.entryColumn}>
									{entry.subtitle && (
										<Text style={styles.subTitle}>{entry.subtitle}</Text>
									)}
									{entry.description.split('\n').map((item) => (
										<Text key={item}>{item}</Text>
									))}
									<Text>
										{entry.links?.map((link) => (
											<Link
												key={link}
												src={'https://' + link}
												/* src="https://www.spiegel.de" */
												style={styles.link}
											>
												Link:
												{link.replace('https://', '').replace('www.', '')}
											</Link>
										))}
									</Text>
								</View>
							</View>
						))}
					</View>
				))}
			</Page>
		</Document>
	)
}

export default PDFDocument
