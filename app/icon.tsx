import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const INK = "#2a241d";
const PAPER = "#fbf8f1";

const GOOGLE_FONTS_TRUETYPE_URL_RE =
  /src:\s*url\((https:\/\/[^)]+)\)\s*format\(['"]?truetype['"]?\)/;

async function loadGaramondBold() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&text=MD",
    {
      headers: {
        "User-Agent": "Wget/1.14 (linux-gnu)",
      },
    }
  ).then((r) => r.text());
  const match = css.match(GOOGLE_FONTS_TRUETYPE_URL_RE);
  if (!match) {
    throw new Error("EB Garamond font URL not found");
  }
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Icon() {
  const fontData = await loadGaramondBold();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: PAPER,
          color: INK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "EB Garamond",
          fontWeight: 700,
          fontSize: 19,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        MD
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "EB Garamond",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
