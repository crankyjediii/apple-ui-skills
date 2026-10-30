import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:3333/#platforms", { waitUntil: "networkidle0" });

const platformLabels = await page.$$("section#platforms .seg label");

// Tab 0: iOS (default)
const platformSection = await page.$("section#platforms");
if (platformSection) {
  await platformSection.screenshot({ path: "screenshots/platform-ios.png" });
  console.log("Captured iOS mock");
}

// Tab 1: macOS
if (platformLabels[1]) {
  await platformLabels[1].click();
  await new Promise((r) => setTimeout(r, 200));
  await platformSection.screenshot({ path: "screenshots/platform-macos.png" });
  console.log("Captured macOS mock");
}

// Tab 2: visionOS
if (platformLabels[2]) {
  await platformLabels[2].click();
  await new Promise((r) => setTimeout(r, 200));
  await platformSection.screenshot({ path: "screenshots/platform-visionos.png" });
  console.log("Captured visionOS mock");
}

// Tab 3: watchOS
if (platformLabels[3]) {
  await platformLabels[3].click();
  await new Promise((r) => setTimeout(r, 200));
  await platformSection.screenshot({ path: "screenshots/platform-watchos.png" });
  console.log("Captured watchOS mock");
}

await browser.close();
