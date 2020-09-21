import { GoogleSpreadsheet } from "google-spreadsheet";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import Home from ".";
import { StructuredSheet, StructuredSheetProps } from "../src/components/sheet";

export default function Cv(props: {
  document: StructuredSheetProps["document"];
}) {
  const { document } = props;
  return (
    <>
      <Home isHiddenInPrint />
      <Head>
        <title>cv – Manuel Dugué</title>
      </Head>
      <StructuredSheet title="CV" document={props.document} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new GoogleSpreadsheet(
    "1ckWg92JEoXpwYK5US9DU5IfrhMPjzSoJUHrE7iHhJEw"
  );

  const creds = JSON.parse(
    process.env.GOOGLE_SHEETS_AUTH.replace(/(\r\n|\n|\r)/gm, "\\n")
  );

  // Authenticate with the Google Spreadsheets API.
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
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
  const document: StructuredSheetProps["document"] = { sections };
  return { props: { document }, revalidate: 1 };
};
