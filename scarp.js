// const puppeteer = require('puppeteer');
// const path = require('path');

// async function openChessLink(url) {
//   const userDataDir = path.join(__dirname, 'chess-profile'); // Session & cookies saved here

//   const browser = await puppeteer.launch({
//     headless: false, // 🔍 head mode
//     userDataDir,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     // ✅ Change this path as per your OS
//     executablePath: getChromePath()
//   });

//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

//   console.log("✅ Page opened: " + url);
//   await page.waitForTimeout(60000); // Wait 60 seconds to login manually (or view)
//   await browser.close();
// }

// function getChromePath() {
//   const os = require('os').platform();
//   if (os === 'darwin') return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
//   if (os === 'win32') return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
//   return '/usr/bin/google-chrome'; // Linux
// }

// module.exports = { openChessLink };
