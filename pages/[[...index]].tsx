import { Github, Linkedin, Twitter } from "@icons-pack/react-simple-icons";
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

function ContactAside() {
  return (
    <aside className="absolute bottom-12 left-20 flex flex-col">
      <div className="flex text-gray-300 mb-2">
        <a
          className="px-1 hover:text-teal-400"
          href="https://www.linkedin.com/in/manuel-dugue/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>
        <a
          className="px-1 hover:text-teal-400"
          href="https://twitter.com/mdugue"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </a>
        <a
          className="px-1 hover:text-teal-400"
          href="https://github.com/mdugue"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
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
    <nav className="font-display  absolute top-4 right-4 flex flex-col text-right text-gray-200 ">
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
  const isShowingADocument = document != null;
  useEvaluateServiceWorker();
  return (
    <>
      <div
        className={`flex flex-col ${isShowingADocument ? "print:hidden" : ""}`}
      >
        <Head>
          <title>Manuel Dugué</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.webmanifest"></link>
        </Head>
        <ClaimCard />
        <ContactAside />
        <LegalSection />
        <ContactFooter />
      </div>
      {document != null && (
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
