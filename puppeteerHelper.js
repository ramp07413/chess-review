const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROFILE_PATH = path.join(__dirname, 'chess-profile');
if (!fs.existsSync(PROFILE_PATH)) fs.mkdirSync(PROFILE_PATH);

async function openChessLink(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: PROFILE_PATH,
  });

  const page = await browser.newPage();

  // Log browser console messages
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36'
  );

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // ✅ Try waiting for chess.com review board
  try {
    await page.waitForSelector('.board-layout-board', { timeout: 20000 });
  } catch {
    console.warn("⚠️ Selector not found. Delaying manually...");
    await page.waitForTimeout(5000); // Delay fallback
  }

  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();

  return screenshot;
}

module.exports = { openChessLink };
