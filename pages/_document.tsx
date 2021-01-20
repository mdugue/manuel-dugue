import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <meta
            name="Description"
            content="Manuel Dugué. Handcrafting web experiences since 2008. Teching, analyzing, coding. For consumers, experts & bots."
          />
          <meta
            name="keywords"
            content="Manuel Dugue, web development, react, typescript"
          ></meta>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#6b9aa2" />
          <meta name="theme-color" content="#6b9aa2" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Hairline&family=Bungee+Inline&family=Bungee+Shade&display=swap"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Hairline&family=Bungee+Inline&family=Bungee+Shade&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preconnect"
            href="https://vitals.vercel-analytics.com/"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
