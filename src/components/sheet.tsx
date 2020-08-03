import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, ReactNode } from "react";
import { XCircle } from "react-feather";
import { useKeyPressEvent } from "react-use";

export type SheetProps = {
  title: string;
  children: ReactNode;
};

export default function Sheet(props: SheetProps) {
  const { title, children } = props;
  useKeyPressEvent("Escape", () => {
    Router.push("/");
  });
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="sheetContainer">
        <main className="sheet">
          <nav>
            <Link href="/">
              <a>
                <XCircle />
              </a>
            </Link>
          </nav>
          <h1>{title}</h1>
          <address>
            Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
            <br />
            <a href="tel:0049 151 58791155">+49 151 58791155</a>{" "}
            <a href="mailto:post@manueldugue.de">post@manueldugue.de</a>
          </address>
          {children}
        </main>
      </div>
      <style jsx global>{`
        address {
          font-style: normal;
          color: #206c5f;
          font-family: "Bungee", cursive;
          font-size: 0.875rem;
        }

        .sheetContainer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 2rem;
          overflow: auto;
          pointer-events: none;
        }

        .sheet {
          background: white;
          box-shadow: 0 0 1rem #0000001c;
          font-family: "Montserrat", sans-serif;
          height: 100%;
          margin: auto;
          max-height: 29.6cm;
          max-width: 21cm;
          overflow-y: auto;
          padding: 6rem 4rem;
          color: #000;
          position: relative;
          pointer-events: all;
        }

        .sheet nav {
          visibility: hidden;
          position: absolute;
          color: #206c5f;
          top: 1rem;
          right: 1rem;
        }

        .sheet:hover nav {
          visibility: visible;
        }

        .sheet::-webkit-scrollbar-thumb {
          background: #00000000;
          transition: background 1s;
        }

        .sheet:hover::-webkit-scrollbar-thumb {
          background: #e9c237;
        }

        .sheet section {
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-gap: 1rem 2rem;
          margin: 3rem 0;
        }

        .sheet h2 {
          grid-column: 1 / -1;
          margin: 0 0 1rem;
        }

        .sheet h3 {
          font-size: 1em;
          margin: 0;
          text-align: right;
          hyphens: auto;
        }

        .sheet h4 {
          margin: 0;
        }
      `}</style>
    </>
  );
}

export type StructuredSheetProps = {
  title: string;
  document: {
    sections: {
      sectionTitle: string;
      entries: {
        title: string;
        subtitle?: string;
        description: string;
        links?: string[];
      }[];
    }[];
  };
};

export function StructuredSheet(props: StructuredSheetProps) {
  const { document, title } = props;
  return (
    <>
      <Sheet title={title}>
        {document.sections.map(section => (
          <section>
            <h2 className="sectionTitle">{section.sectionTitle}</h2>
            {section.entries.map((entry, index) => (
              <Fragment key={index}>
                <h3 className="sectionEntry">{entry.title}</h3>
                <div className="entryContent">
                  {entry.subtitle && <h4>{entry.subtitle}</h4>}
                  {entry.description.split("\n").map(item => (
                    <p key={item}>{item}</p>
                  ))}
                  {entry.links?.map(link => (
                    <a key={link} href={link} rel="noopener noreferer">
                      {link}
                    </a>
                  ))}
                </div>
              </Fragment>
            ))}
          </section>
        ))}
      </Sheet>
      <style jsx global>
        {`
          .sheet .entryContent p {
            margin: 0;
          }
        `}
      </style>
    </>
  );
}
