// puppeteerHelper.js
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath || '/usr/bin/chromium-browser',
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log("✅ Page opened");

  await browser.close();
}

module.exports = { openChessLink }; // ✅ export as object
