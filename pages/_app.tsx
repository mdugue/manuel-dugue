import "styles/global.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="Manuel Dugué – %s"
        title="freelance web developer"
        description="Handcrafting web experiences since 2008. Teaching, analyzing, coding. For consumers, experts & bots."
        openGraph={{
          locale: "en_EN",
          url: "https://manuel.fyi/",
          site_name: "Manuel Dugué – freelance web developer",
          images: [
            {
              url:
                "https://og-image.vercel.app/**Manuel%20Dugu%C3%A9**%20%E2%80%93%20handcrafting%20web%20experiences.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg",
            },
          ],
        }}
        twitter={{
          handle: "@mdugue",
          site: "@mdugue",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
