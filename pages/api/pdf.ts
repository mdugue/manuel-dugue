import { NowRequest, NowResponse } from "@vercel/node";
import chrome from "chrome-aws-lambda";

async function getScreenshot(url: string) {
  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url);
  const file = await page.pdf({ format: "a4" });
  await browser.close();
  return file;
}

const pdfHandler = async (request: NowRequest, response: NowResponse) => {
  const url =
    request.headers.referer ||
    `http://${request.headers.host}/${request.query.url}`;
  if (
    !["http://localhost:3000/", "https://manuel.fyi/"].some((allowedDomain) =>
      url.startsWith(allowedDomain)
    )
  ) {
    response.statusCode = 403;
    response.setHeader("Content-Type", "text/html");
    response.end(
      `<h1>not allowed</h1><p>Sorry, this is for internal usage only</p>
      <a href="/">back</a>`
    );
    return;
  }
  try {
    const file = await getScreenshot(url);
    response.statusCode = 200;
    response.setHeader("Content-Type", `application/pdf`);
    response.end(file);
  } catch (e) {
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/html");
    response.end(
      `<h1>Server Error</h1><p>Sorry, there was a problem</p><code>${JSON.stringify(
        e.message
      )}</code>`
    );
    console.error(e.message);
  }
};

export default pdfHandler;
