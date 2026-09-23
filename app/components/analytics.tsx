import Script from "next/script";

/** Umami page views through the first-party `/stats` rewrite. Renders nothing
 *  unless a website ID is configured. */
export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) {
    return null;
  }
  return (
    <Script
      data-host-url="/stats"
      data-performance="true"
      data-website-id={websiteId}
      src="/stats/script.js"
      strategy="afterInteractive"
    />
  );
}
