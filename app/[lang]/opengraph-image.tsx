import { ImageResponse } from "next/og";
import { hasLocale, type Locale, localeParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "manuel.fyi — Manuel Dugué";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return localeParams();
}

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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 96px",
        background: "#F5EFE4",
        color: "#1E160E",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#6B5E4E",
          fontFamily: "monospace",
        }}
      >
        <span>manuel · fyi</span>
        <span>{locale.toUpperCase()}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            maxWidth: 940,
          }}
        >
          Manuel Dugué
        </div>
        <div
          style={{
            fontSize: 36,
            lineHeight: 1.35,
            color: "#3A3025",
            maxWidth: 940,
            fontStyle: "italic",
          }}
        >
          {hero.lede}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#6B5E4E",
          fontFamily: "monospace",
          borderTop: "1px solid #C9B79C",
          paddingTop: 16,
        }}
      >
        <span>{spine}</span>
        <span style={{ color: "#B04A2A" }}>→ manuel.fyi</span>
      </div>
    </div>,
    { ...size }
  );
}
