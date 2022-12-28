import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="keywords"
						content="Manuel Dugue, web development, react, typescript"
					></meta>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png?v=wAM6anG0px"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png?v=wAM6anG0px"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png?v=wAM6anG0px"
					/>
					<link rel="manifest" href="/site.webmanifest?v=wAM6anG0px" />
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg?v=wAM6anG0px"
						color="#5bbad5"
					/>
					<link rel="shortcut icon" href="/favicon.ico?v=wAM6anG0px" />
					<meta name="msapplication-TileColor" content="#6b9aa2" />
					<meta name="theme-color" content="#6b9aa2" />
					<link
						rel="preload"
						href="/fonts/bungee.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preconnect"
						href="https://vitals.vercel-analytics.com/"
						crossOrigin=""
					/>
				</Head>
				<body className="bg-gray-50 dark:bg-gray-900">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
