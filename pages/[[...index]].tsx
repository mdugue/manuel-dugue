import { Github, Linkedin, Twitter } from "@icons-pack/react-simple-icons";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";

import ClaimCard from "../src/components/ClaimCard";
import DocumentsNavigation from "../src/components/DocumentsNavigation";
import { StructuredSheetProps } from "../src/components/StructuredSheet";
import useEvaluateServiceWorker from "../src/hooks/useEvaluateServiceWorker";

const StructuredSheet = dynamic(
  () => import("../src/components/StructuredSheet")
);

function ContactAside() {
  return (
    <aside className="lg:absolute ml-1 mt-16 lg:ml-20 lg:bottom-12 lg:left-0 flex flex-col">
      <div className="flex text-gray-300 dark:text-gray-500 mb-2">
        <a
          className="mr-2 hover:text-teal-400"
          href="https://www.linkedin.com/in/manuel-dugue/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="coarse:w-12 coarse:h-12 w-8 h-8" />
        </a>
        <a
          className="mr-2 hover:text-teal-400"
          href="https://twitter.com/mdugue"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="coarse:w-12 coarse:h-12 w-8 h-8" />
        </a>
        <a
          className="mr-2 hover:text-teal-400"
          href="https://github.com/mdugue"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="coarse:w-12 coarse:h-12 w-8 h-8" />
        </a>
      </div>
      <div className="text-gradient bg-gradient-to-tr from-indigo-500 to-green-500 font-display text-2xl">
        Manuel Dugué
      </div>
    </aside>
  );
}

function LegalSection() {
  return (
    <nav className="font-display absolute bottom-2 left-2 lg:bottom-auto lg:left-auto lg:top-4 lg:right-4 flex flex-col lg:text-right text-gray-200 dark:text-gray-500">
      <Link href="/legal" prefetch={false}>
        <a className="coarse:h-12 mb-2">legal note</a>
      </Link>
      <Link href="/privacy" prefetch={false}>
        <a className="coarse:h-12 mb-2">privacy</a>
      </Link>
    </nav>
  );
}

export default function Home(props: { document?: StructuredSheetProps }) {
  const { document } = props;
  const isShowingADocument = document != null;
  useEvaluateServiceWorker();
  return (
    <>
      <div
        className={`flex flex-col min-h-screen transform-gpu ${
          isShowingADocument ? "print:hidden" : ""
        } `}
      >
        <Head>
          <title>Manuel Dugué</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.webmanifest"></link>
        </Head>
        <ClaimCard />
        <ContactAside />
        <LegalSection />
        <DocumentsNavigation />
      </div>
      {document != null && (
        <StructuredSheet title={document.title} document={document.document} />
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
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
