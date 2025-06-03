const puppeteer = require('puppeteer');

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.screenshot({ path: 'debug.png', fullPage: true });
    console.log("✅ Page opened and screenshot taken: " + url);
  } catch (error) {
    console.error("❌ Navigation failed:", error);
  }

  await browser.close();
}

module.exports = { openChessLink };
