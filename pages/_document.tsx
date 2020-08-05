import Document, { Html, Head, Main, NextScript } from "next/document";

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
          <meta name="theme-color" content="#000000" />
          <meta
            name="Description"
            content="Manuel Dugué. Handcrafting web experiences since 2008. Teching, analyzing, coding. For consumers, experts & bots."
          />
          <meta
            name="keywords"
            content="Manuel Dugue, web development, react, typescript"
          ></meta>
          <link
            href="favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link href="icon-192x192.png" rel="icon" sizes="192x192" />
          <link
            href="icon-192x192.png"
            rel="apple-touch-icon"
            sizes="192x192"
          />
          <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
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
