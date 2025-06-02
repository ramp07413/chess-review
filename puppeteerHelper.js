// puppeteerHelper.js
const chromium = require("chrome-aws-lambda");

async function openChessLink(url) {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  console.log("✅ Page opened in headless mode");

  // Optional: close after some time
  await new Promise(res => setTimeout(res, 5000));
  await browser.close();
}

module.exports = { openChessLink };
