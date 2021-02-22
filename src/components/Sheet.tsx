import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { HTMLProps, ReactNode, useState } from "react";
import { useKeyPressEvent } from "react-use";

export type SheetProps = {
  title: string;
  children: ReactNode;
};

function PrintButton(props: { title: string } & HTMLProps<HTMLButtonElement>) {
  const { title, ...rest } = props;
  const [isWaiting, setIsWaiting] = useState(false);
  return (
    <button
      {...rest}
      type="button"
      tabIndex={1}
      title="download"
      className={`bg-gradient-to-tr hover:from-teal-50 hover:to-yellow-50 hover:text-teal-600 rounded-md py-4 px-4 cursor-pointer flex items-center ${
        isWaiting ? "animate-pulse" : ""
      }`}
      onClick={() => {
        setIsWaiting(true);
        fetch(`/api/pdf/${title}`)
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
                setIsWaiting(false);
              }, 250);
            }
          });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={`mr-2 h-5 w-5 ${isWaiting ? "animate-spin" : ""}`}
      >
        {isWaiting ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        )}
      </svg>
      {isWaiting ? "pdf …" : "pdf"}
    </button>
  );
}

export default function Sheet(props: SheetProps) {
  const { title, children } = props;
  useKeyPressEvent("Escape", () => {
    Router.push("/");
  });
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/montserrat-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="p-2 lg:p-8 print:p-0 absolute inset-0">
        <main
          className="shadow-2xl print:shadow-none print:text-xs font-body bg-white p-1 lg:py-20 lg:px-14 m-auto overflow-y-auto overflow-x-hidden print:overflow-visible relative rounded-sm max-h-full"
          style={{ aspectRatio: "2 / 3" }}
        >
          <nav className="absolute right-0 top-0 flex print:hidden text-gray-400 m-1">
            <PrintButton title={title} />

            <Link href="/">
              <a
                title="close"
                tabIndex={1}
                className="bg-gradient-to-tr hover:from-gray-50 hover:to-yellow-50 hover:text-gray-500 rounded-md py-4 px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </Link>
          </nav>
          <div
            className="text-gradient bg-gradient-to-r from-teal-700 to-green-400 mb-4"
            style={{
              WebkitPrintColorAdjust: "exact",
              WebkitTextFillColor: "transparent",
            }}
          >
            <h1 className="font-inline text-5xl mb-1">{title}</h1>
            <address className="font-display not-italic text-sm">
              Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
              <br />
              <a href="tel:0049 151 58791155">+49 151 58791155</a>{" "}
              <a href="mailto:mail@manuel.fyi">mail@manuel.fyi</a>
            </address>
          </div>
          {children}
        </main>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 400;
          font-display: optional;
          src: url(/fonts/montserrat-400.woff2) format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 600;
          font-display: optional;
          src: url(/fonts/montserrat-600.woff2) format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @page {
          size: A4 portrait;
          margin: 1.75cm;
        }
      `}</style>
    </>
  );
}
