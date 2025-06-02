const puppeteer = require('puppeteer');

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    userDataDir: './chess-profile'
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // 3 seconds wait before closing, so page loads
  await new Promise(resolve => setTimeout(resolve, 3000));

  await browser.close();
}

module.exports = { openChessLink };
