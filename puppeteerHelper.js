const puppeteer = require('puppeteer');

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: './chess-profile'
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  console.log("✅ Page opened in headless mode");

  // Wait for 5 seconds using setTimeout
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log("❎ Headless browser closed");
}

module.exports = { openChessLink };
