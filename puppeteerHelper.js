const puppeteer = require('puppeteer');

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    headless: false, // Browser dikhega
    userDataDir: './chess-profile',
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  console.log('✅ Opened:', url);

  // ⏳ Wait 5 seconds (5000 ms)
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log('❎ Browser closed after 5 sec');
}

module.exports = { openChessLink };
