import { ImageResponse } from "next/og";

export const size = { height: 180, width: 180 };
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

export default async function AppleIcon() {
  const fontData = await loadGaramondBold();
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: PAPER,
        color: INK,
        display: "flex",
        fontFamily: "EB Garamond",
        fontSize: 84,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        width: "100%",
      }}
    >
      MD
    </div>,
    {
      ...size,
      fonts: [
        {
          data: fontData,
          name: "EB Garamond",
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
