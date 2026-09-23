import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const ebGaramond = EB_Garamond({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

/** Font variables for the `<html>` of both root documents: the locale layout
 *  and the global 404, which renders outside it. */
export const fontVariables = `${ebGaramond.variable} ${inter.variable} ${jetBrainsMono.variable}`;
