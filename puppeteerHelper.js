// puppeteerHelper.js
const chromium = require("chrome-aws-lambda");

async function openChessLink(url) {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath || '/usr/bin/chromium-browser',
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  console.log("✅ Page opened in headless mode");

  await new Promise(res => setTimeout(res, 5000));
  await browser.close();
}

module.exports = { openChessLink };
