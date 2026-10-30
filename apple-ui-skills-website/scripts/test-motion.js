import puppeteer from "puppeteer-core";
import path from "path";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/#how-it-works", { waitUntil: "networkidle0" });

// Wait 400ms into the typing animation and capture
await new Promise((r) => setTimeout(r, 450));
const terminal = await page.$("#how-it-works");
if (terminal) {
  await terminal.screenshot({ path: "screenshots/terminal-streaming-mid.png" });
  console.log("Captured mid-stream terminal");
}

// Wait for full typing and lines reveal
await new Promise((r) => setTimeout(r, 1800));
if (terminal) {
  await terminal.screenshot({ path: "screenshots/terminal-streaming-done.png" });
  console.log("Captured full terminal");
}

await browser.close();
