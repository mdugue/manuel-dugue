import { ImageResponse } from "next/og";
import { hasLocale, type Locale, localeParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "manuel.fyi — Manuel Dugué";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export function generateStaticParams() {
  return localeParams();
}

// Image conventions compile to Route Handlers, which cannot read
// `next/root-params` yet, so the locale still comes from the route params.
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const { hero, spine } = dict.portfolio;

  return new ImageResponse(
    <div
      style={{
        background: "#F5EFE4",
        color: "#1E160E",
        display: "flex",
        flexDirection: "column",
        fontFamily: "serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 96px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          color: "#6B5E4E",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 20,
          justifyContent: "space-between",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <span>manuel · fyi</span>
        <span>{locale.toUpperCase()}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            fontSize: 92,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            maxWidth: 940,
          }}
        >
          Manuel Dugué
        </div>
        <div
          style={{
            color: "#3A3025",
            fontSize: 36,
            fontStyle: "italic",
            lineHeight: 1.35,
            maxWidth: 940,
          }}
        >
          {hero.lede}
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid #C9B79C",
          color: "#6B5E4E",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 20,
          justifyContent: "space-between",
          letterSpacing: "0.14em",
          paddingTop: 16,
          textTransform: "uppercase",
        }}
      >
        <span>{spine}</span>
        <span style={{ color: "#B04A2A" }}>→ manuel.fyi</span>
      </div>
    </div>,
    { ...size }
  );
}
