import puppeteer from "puppeteer-core";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = "/Users/jimmy/.gemini/antigravity/scratch/apple-ui-skills-website/screenshots";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto("http://localhost:3333/", { waitUntil: "networkidle0" });

  // Disable smooth scrolling for accurate fullpage screenshot
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
  });

  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-light-fixed.png"),
    fullPage: true,
  });
  console.log("Captured desktop-light-fixed.png");

  // Also capture dark mode
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-dark-fixed.png"),
    fullPage: true,
  });
  console.log("Captured desktop-dark-fixed.png");

  // Capture mobile light
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-light-fixed.png"),
    fullPage: true,
  });
  console.log("Captured mobile-light-fixed.png");

  // Capture mobile dark
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-dark-fixed.png"),
    fullPage: true,
  });
  console.log("Captured mobile-dark-fixed.png");

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
