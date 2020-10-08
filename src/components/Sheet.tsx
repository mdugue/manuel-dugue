import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { ReactNode } from "react";
import { Download, XCircle } from "react-feather";
import { useKeyPressEvent } from "react-use";
import { largeBreakpoint } from "../../pages/[[...index]]";

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
            <div
              tabIndex={1}
              title="download"
              onClick={() =>
                fetch("/api/pdf")
                  .then(async (res) => ({
                    filename: `${title} dugue.pdf`,
                    blob: await res.blob(),
                  }))
                  .then((resObj) => {
                    const newBlob = new Blob([resObj.blob], {
                      type: "application/pdf",
                    });

                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                      window.navigator.msSaveOrOpenBlob(newBlob);
                    } else {
                      const objUrl = window.URL.createObjectURL(newBlob);

                      const link = document.createElement("a");
                      link.href = objUrl;
                      link.download = resObj.filename;
                      link.click();

                      // For Firefox it is necessary to delay revoking the ObjectURL.
                      setTimeout(() => {
                        window.URL.revokeObjectURL(objUrl);
                      }, 250);
                    }
                  })
              }
            >
              <Download />
            </div>
            <Link href="/">
              <a title="close" tabIndex={1}>
                <XCircle />
              </a>
            </Link>
          </nav>
          <h1 className="sheetTitle">{title}</h1>
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
        @page {
          size: A4 portrait;
          margin: 1.75cm;
        }

        .sheet {
          font-family: "Montserrat", sans-serif;
          background: white;
        }

        @media print {
          .sheet {
            font-size: 14px;
          }
        }

        .sheetTitle {
          padding-right: 7.5rem;
          word-break: break-word;
          hyphens: auto;
        }

        .sheet h1 {
          font-family: "Bungee Inline", "SF Mono", "Ubuntu Mono", Consolas,
            Menlo, monospace, cursive;
          font-weight: normal;
          font-size: 2.75em;
          margin: 0;
        }

        address {
          font-style: normal;
          color: #206c5f;
          font-family: "Bungee", "SF Mono", "Ubuntu Mono", Consolas, Menlo,
            monospace, cursive;
          font-size: 0.875em;
          padding-bottom: 1em;
        }

        @media screen {
          .sheetContainer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.5rem;
            overflow: auto;
            pointer-events: none;
          }

          .sheet {
            box-shadow: 0 0 1rem #0000001c;
            height: 100%;
            margin: auto;
            max-height: 29.6cm;
            max-width: 21cm;
            overflow-y: auto;
            padding: 1rem;
            color: #000;
            position: relative;
            pointer-events: all;
          }
        }

        @media (min-width: ${largeBreakpoint}) {
          .sheetContainer {
            padding: 2rem;
          }

          .sheet {
            padding: 6rem 4rem;
          }
        }

        .sheet nav {
          position: absolute;
          color: #206c5f;
          top: 0;
          right: 0;
          display: flex;
        }

        @media (min-width: ${largeBreakpoint}) {
          .sheet nav {
            visibility: hidden;
          }
        }

        @media print {
          .sheet nav {
            visibility: hidden;
          }
        }

        .sheet:hover nav {
          visibility: visible;
        }

        .sheet nav > * {
          padding: 1rem;
          display: inline-block;
        }

        .sheet nav > *:hover,
        .sheet nav > *:focus {
          background: var(--colorBodyBackground);
        }

        .sheet::-webkit-scrollbar-thumb {
          background: #00000000;
          transition: background 1s;
        }

        .sheet:hover::-webkit-scrollbar-thumb {
          background: #e9c237;
        }

        .sheet section {
          padding: 1em 0;
        }

        .sheet section h1 {
          font-size: 1.375em;
          grid-column: 1 / -1;
          margin: 0 0 1em;
          color: hsl(47 80% 75% / 1);
        }

        .sheet h4 {
          margin: 0;
        }
      `}</style>
    </>
  );
}