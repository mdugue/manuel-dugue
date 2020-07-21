import React, { Fragment } from "react";
import Home from ".";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { GetStaticProps } from "next";
import Head from "next/head";
import Sheet, { SheetProps } from "../src/components/sheet";
var creds = require("../client_secret.json");

export default function Cv(props: { document: SheetProps["document"] }) {
  const { document } = props;
  return (
    <>
      <Home />
      <Head>
        <title>cv – Manuel Dugué</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Sheet title="CV" document={props.document} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new GoogleSpreadsheet(
    "1ckWg92JEoXpwYK5US9DU5IfrhMPjzSoJUHrE7iHhJEw"
  );

  // Authenticate with the Google Spreadsheets API.
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  const sections = await Promise.all(
    doc.sheetsByIndex.map(async sheet => {
      const rows = await sheet.getRows();
      return {
        sectionTitle: sheet.title,
        entries: rows.map(row => ({
          title: row.title,
          subtitle: row.subtitle || null,
          description: row.description,
          links: row.links?.split(",") || null
        }))
      };
    })
  );
  const document: SheetProps["document"] = { sections };

  return { props: { document } };
};
