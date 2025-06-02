// puppeteerHelper.js
const puppeteer = require('puppeteer');

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './chess-profile', // ✅ Reuse saved login session
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  console.log('✅ Opened:', url);
}

module.exports = { openChessLink };
