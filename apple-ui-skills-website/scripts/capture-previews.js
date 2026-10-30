import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = "/Users/jimmy/.gemini/antigravity/scratch/apple-ui-skills-website/screenshots";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 1. Desktop Dark Fullpage
  const pageDark = await browser.newPage();
  await pageDark.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await pageDark.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  await pageDark.goto("http://localhost:3333/", { waitUntil: "networkidle0" });
  await pageDark.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-dark-full.png"),
    fullPage: true,
  });
  console.log("Captured desktop-dark-full.png");

  // 2. Desktop Light Fullpage
  const pageLight = await browser.newPage();
  await pageLight.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await pageLight.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
  await pageLight.goto("http://localhost:3333/", { waitUntil: "networkidle0" });
  // Ensure document data-theme is light
  await pageLight.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });
  await pageLight.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-light-full.png"),
    fullPage: true,
  });
  console.log("Captured desktop-light-full.png");

  // 3. Mobile Light (390 x 844 iPhone-like)
  const pageMobileLight = await browser.newPage();
  await pageMobileLight.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await pageMobileLight.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
  await pageMobileLight.goto("http://localhost:3333/", { waitUntil: "networkidle0" });
  await pageMobileLight.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });
  await pageMobileLight.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-light-full.png"),
    fullPage: true,
  });
  console.log("Captured mobile-light-full.png");

  // 4. Mobile Dark
  const pageMobileDark = await browser.newPage();
  await pageMobileDark.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await pageMobileDark.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  await pageMobileDark.goto("http://localhost:3333/", { waitUntil: "networkidle0" });
  await pageMobileDark.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await pageMobileDark.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-dark-full.png"),
    fullPage: true,
  });
  console.log("Captured mobile-dark-full.png");

  // 5. Test modal sheet open
  const pageSheet = await browser.newPage();
  await pageSheet.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await pageSheet.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  await pageSheet.goto("http://localhost:3333/#skills", { waitUntil: "networkidle0" });
  // Click on the first skill card
  const skillButton = await pageSheet.$("button.card-content");
  if (skillButton) {
    await skillButton.click();
    await new Promise((r) => setTimeout(r, 400));
    await pageSheet.screenshot({
      path: path.join(OUTPUT_DIR, "sheet-modal-open.png"),
    });
    console.log("Captured sheet-modal-open.png");
  }

  await browser.close();
  console.log("All screenshots captured successfully.");
}

run().catch((err) => {
  console.error("Error capturing previews:", err);
  process.exit(1);
});
