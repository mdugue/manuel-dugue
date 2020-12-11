import { GoogleSpreadsheet } from "google-spreadsheet";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";

import ClaimCard from "../src/components/ClaimCard";
import ContactFooter from "../src/components/ContactFooter";
import { StructuredSheetProps } from "../src/components/StructuredSheet";
import useEvaluateServiceWorker from "../src/hooks/useEvaluateServiceWorker";

const StructuredSheet = dynamic(
  () => import("../src/components/StructuredSheet")
);
export const largeBreakpoint = "768px";

function ContactAside() {
  return (
    <aside>
      <div>Manuel Dugué – 🎄 merry xmas</div>
      <a
        href="https://www.linkedin.com/in/manuel-dugue/"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin
      </a>
      <a
        href="https://twitter.com/mdugue"
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter
      </a>
      <a
        href="https://github.com/mdugue"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
    </aside>
  );
}

function LegalSection() {
  return (
    <nav className="legal">
      <Link href="/legal" prefetch={false}>
        <a>legal note</a>
      </Link>
      <Link href="/privacy" prefetch={false}>
        <a>privacy</a>
      </Link>
    </nav>
  );
}

export default function Home(props: { document?: StructuredSheetProps }) {
  const { document } = props;
  const isContainerHiddenInPrint = document != null;
  useEvaluateServiceWorker();
  return (
    <>
      <div className="container">
        <Head>
          <title>Manuel Dugué – 🎄 merry xmas</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.webmanifest"></link>
        </Head>
        <ClaimCard />
        <ContactAside />
        <LegalSection />
        <ContactFooter />

        <style jsx global>{`
          :root {
            color-scheme: light dark;
            --colorBodyBackground: #f9fafb;
            --colorBodyText: #fff;
            --secondaryLink: #206c5f;
            --legalLink: #bdbdbd;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --colorBodyBackground: #080808;
              --colorBodyText: #000;
              --secondaryLink: #fff;
              --legalLink: #545454;
            }
          }

          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          @media print {
            .container {
              display: ${isContainerHiddenInPrint ? "none" : "flex"};
            }
          }

          @media screen and (min-width: ${largeBreakpoint}) {
            .container {
              justify-content: space-between;
            }
          }

          hgroup {
            background: #b91c1c;
            color: var(--colorBodyText);
            padding: 10vmax 2vmax;
            min-height: 55vh;
            will-change: transform;
          }

          @media screen and (min-width: ${largeBreakpoint}) {
            hgroup {
              margin: 10vh 0 0 10vw;
              min-height: initial;
              padding: 9vh 10vw 10vh;
              width: 66vw;
            }
          }

          small {
            font-size: max(1.5vmin, 1rem);
            font-family: "Bungee Hairline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            font-weight: 700;
          }

          .tagline {
            font-family: "Bungee Inline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            font-size: max(1.5vw, 1.25rem);
            font-weight: normal;
            margin-right: 2vw;
            margin-top: 2vh;
            will-change: transform;
          }

          @media screen and (min-width: ${largeBreakpoint}) {
            .tagline {
              color: #fde68a;
              font-size: 1.5vw;
            }
          }

          .dot {
            background: var(--colorBodyBackground);
            border-radius: 100%;
            height: 4vmax;
            position: absolute;
            width: 4vmax;
          }
          .dotBR {
            bottom: -2vmax;
            right: -2vmax;
          }
          .dotBL {
            bottom: -2vmax;
            left: -2vmax;
          }
          .dotTR,
          .dotTL {
            visibility: hidden;
          }
          .dotTR {
            right: -2vmax;
            top: -2vmax;
          }
          .dotTL {
            left: -2vmax;
            top: -2vmax;
          }

          @media screen and (min-width: ${largeBreakpoint}) {
            .dotTR,
            .dotTL {
              visibility: initial;
            }
          }

          aside {
            color: #fbbf24;
            font-family: "Bungee Inline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            font-size: 1.125rem;
            line-height: 1;
            padding: 6vh 2vh 2vh;
            text-align: center;
          }

          aside a {
            color: var(--secondaryLink);
            display: inline-block;
            font-family: "Bungee Hairline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            font-weight: 700;
            padding: 1ch;
          }
          aside a:hover {
            font-family: "Bungee Inline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            font-weight: normal;
          }

          .legal {
            font-family: "Bungee Hairline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            position: absolute;
            right: 1rem;
            display: flex;
            align-items: flex-end;
            justify-content: initial;
          }

          @media screen and (min-width: ${largeBreakpoint}) {
            .legal {
              flex-direction: column;
            }
          }

          .legal a {
            padding: 1ch 1ch 0;
            font-weight: bold;
            color: var(--legalLink);
          }

          .highlight-container {
            bottom: 0;
            left: 0;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 0;
            zindex: -1;
          }

          .highlight {
            width: 30vmin;
            height: 30vmin;
            background: white;
            position: absolute;
            margin: -15vmin;
            filter: blur(40vmin);
            willchange: left, top;
            transform: translate3d(0, 0, 0);
          }

          html,
          body {
            background: var(--colorBodyBackground);
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            line-height: 1.25;
            overflow: hidden;
          }

          svg {
            stroke-width: 1.5px;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          * {
            box-sizing: border-box;
          }

          ::-webkit-scrollbar {
            width: 0.75rem;
          }

          ::-webkit-scrollbar-track {
            background: #ffffff00;
          }
          ::-webkit-scrollbar-track:hover {
            background: var(--colorBodyBackground);
          }

          ::-webkit-scrollbar-thumb {
            border-radius: 2px;
          }
        `}</style>
      </div>
      {document != null && (
        /* TODO: Lazy load */
        <StructuredSheet title={document.title} document={document.document} />
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("static paths…");
  return {
    fallback: false,
    paths: [
      { params: { index: [""] } },
      { params: { index: ["cv"] } },
      { params: { index: ["skill-profile"] } },
    ],
  };
};

export const getStaticProps: GetStaticProps<
  { document?: StructuredSheetProps },
  {
    index?: ("cv" | "skill-profile")[];
  }
> = async (context) => {
  const index = context.params.index?.[0];
  if (index === "cv") {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_CV_ID);
    const creds = JSON.parse(
      process.env.GOOGLE_SHEETS_AUTH.replace(/(\r\n|\n|\r)/gm, "\\n")
    );
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sections = await Promise.all(
      doc.sheetsByIndex.map(async (sheet) => {
        const rows = await sheet.getRows();
        return {
          sectionTitle: sheet.title,
          entries: rows.map((row) => ({
            title: row.title,
            subtitle: row.subtitle || null,
            description: row.description,
            links: row.links?.split(",") || null,
          })),
        };
      })
    );
    const document: StructuredSheetProps = {
      document: { sections },
      title: "cv",
    };
    return { props: { document }, revalidate: 1 };
  }
  if (index === "skill-profile") {
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_SKILL_PROFILE_ID
    );
    const creds = JSON.parse(
      process.env.GOOGLE_SHEETS_AUTH.replace(/(\r\n|\n|\r)/gm, "\\n")
    );
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sections = await Promise.all(
      doc.sheetsByIndex.map(async (sheet) => {
        const rows = await sheet.getRows();
        return {
          sectionTitle: sheet.title,
          entries: rows.map((row) => ({
            title: row.title,
            subtitle: row.subtitle || null,
            description: row.description,
            links: row.links?.split(",") || null,
          })),
        };
      })
    );
    const document: StructuredSheetProps = {
      document: { sections },
      title: "skill profile",
    };

    return { props: { document } };
  }

  return { props: {} };
};
