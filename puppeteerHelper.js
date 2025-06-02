const puppeteer = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser in headless mode...");
    browser = await puppeteer.launch({
      headless: true,  // headless true kar diya
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        "--no-sandbox",
        "--use-gl=egl",
        "--disable-setuid-sandbox",
      ],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

async function openPageWithUserAgent(url) {
  const browser = await startBrowser();
  if (!browser) {
    console.log("Browser not started");
    return;
  }

  const page = await browser.newPage();

  // User agent set karo headless mein
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
  );

  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log("✅ Page opened with custom user agent");

  await browser.close();
}

module.exports = { startBrowser, openPageWithUserAgent };
