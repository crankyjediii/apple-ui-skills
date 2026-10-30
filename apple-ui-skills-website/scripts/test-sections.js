import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:3333/", { waitUntil: "networkidle0" });

const footer = await page.$("footer");
if (footer) {
  await footer.screenshot({ path: "screenshots/footer.png" });
  console.log("Footer captured.");
}

const cta = await page.$("main > section:last-child");
if (cta) {
  await cta.screenshot({ path: "screenshots/cta.png" });
  console.log("CTA captured.");
}

await browser.close();
