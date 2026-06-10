import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderName = path.basename(__dirname);
const suggestedUrl = `https://ex2-axon.github.io/${folderName}/`;

const url = process.argv[2] || process.env.SCREENSHOT_URL;
const output = process.argv[3] || process.env.SCREENSHOT_OUTPUT || "screenshot.png";
const fullPage = process.env.SCREENSHOT_FULL_PAGE !== "false";
// Delay before taking screenshot (ms). Can be set via env var SCREENSHOT_DELAY_MS or 4th arg.
const delayMs = parseInt(process.env.SCREENSHOT_DELAY_MS || process.argv[4] || "3000", 10);

if (!url) {
  console.error("No URL provided. Set the URL via the second argument or SCREENSHOT_URL.");
  console.error(`Folder name: ${folderName}`);
  console.error(`Suggested URL: ${suggestedUrl}`);
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
  });

  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });
  if (delayMs > 0) {
    console.log(`Waiting ${delayMs}ms for animations/load before screenshot`);
    await page.waitForTimeout(delayMs);
  }
  const outputPath = path.resolve(process.cwd(), output);
  await page.screenshot({
    path: outputPath,
    fullPage,
  });

  await browser.close();
  console.log(`Screenshot saved to ${outputPath}`);
})();
