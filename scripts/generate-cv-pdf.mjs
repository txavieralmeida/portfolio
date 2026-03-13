import puppeteer from "puppeteer";
import { spawn } from "child_process";
import { writeFileSync } from "fs";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const LOCALES = ["en", "pt", "fr", "it", "sv"];
const DEFAULT_LOCALE = "en";

async function waitForServer(timeout = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`${BASE_URL}/cv-print`);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not become ready within ${timeout}ms`);
}

async function generatePDF(browser, locale) {
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123 });

  const cvPrintPath =
    locale === DEFAULT_LOCALE ? "/cv-print" : `/${locale}/cv-print`;
  await page.goto(`${BASE_URL}${cvPrintPath}`, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
    pageRanges: "1",
  });
  await page.close();

  const filename =
    locale === DEFAULT_LOCALE ? "public/cv.pdf" : `public/cv-${locale}.pdf`;
  writeFileSync(filename, pdf);
  console.log(`PDF saved to ${filename}`);
}

async function main() {
  console.log("Starting Next.js server on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    shell: true,
  });

  // Make sure we kill the server on unexpected exit
  process.on("exit", () => server.kill());
  process.on("SIGINT", () => { server.kill(); process.exit(1); });

  try {
    await waitForServer();
    console.log("Server ready — launching Puppeteer");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const locale of LOCALES) {
      console.log(`Generating PDF for locale: ${locale}`);
      await generatePDF(browser, locale);
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
